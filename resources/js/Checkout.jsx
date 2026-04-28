import { ChevronDown, CreditCard, HeadphonesIcon, ShieldCheck, ArrowRight, Lock, Store, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Local } from "sode-extend-react";
import CulqiRest from "./Actions/CulqiRest";
import Global from "./Utils/Global";
import Number2Currency from "./Utils/Number2Currency";
import CouponsRest from "./Actions/CouponsRest";
import ShippingCostRest from "./Actions/ShippingCostRest";
import Tippy from "@tippyjs/react";
import { CarritoProvider } from "./context/CarritoContext";
import Base from "./components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import AlertComponent from "./context/AlertComponent";

const couponRest = new CouponsRest();
const shippingCostRest = new ShippingCostRest();

const PhoneInput = ({ onPhoneChange, error }) => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const loadCountries = async () => {
            try {
                const response = await fetch("/assets/data/countries_phone.json");
                const data = await response.json();
                setCountries(data);
                const peru = data.find((c) => c.iso2 === "PE");
                setSelectedCountry(peru || data[0]);
            } catch (error) {
                console.error("Error loading countries:", error);
            }
        };
        loadCountries();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, ""); 
        setPhoneNumber(value);
        if (selectedCountry) {
            const fullNumber = `+${selectedCountry.phoneCode.replace(/\D/g, "")}${value}`;
            onPhoneChange(fullNumber);
        }
    };

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setShowDropdown(false);
        if (phoneNumber) {
            const fullNumber = `+${country.phoneCode.replace(/\D/g, "")}${phoneNumber}`;
            onPhoneChange(fullNumber);
        }
    };

    return (
        <div className="relative w-full font-dmsans">
            <label className="mb-2 block text-sm 4xl:text-lg font-medium text-gray-700">
                Teléfono/Celular <b className="text-red-500">*</b>
            </label>

            <div className={`flex border ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'} rounded-xl focus-within:border-[#FF9900] focus-within:ring-1 focus-within:ring-[#FF9900] transition-all overflow-hidden h-[46px]`}>
                
                <div className="relative flex-shrink-0 border-r border-gray-300" ref={dropdownRef}>
                    <button
                        type="button"
                        className="flex items-center justify-between px-3 h-full bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <div className="flex items-center gap-1">
                            <span className={`fi fi-${selectedCountry?.iso2.toLowerCase()} mr-1`}></span>
                            <span className="text-sm font-medium text-gray-700">+{selectedCountry?.phoneCode}</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 ml-1 text-gray-500 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
                    </button>

                    {showDropdown && (
                        <div className="absolute z-10 mt-1 w-full min-w-[280px] bg-white shadow-xl rounded-xl py-1 max-h-60 overflow-y-auto border border-gray-100 custom-scrollbar">
                            {countries.map((country) => (
                                <div
                                    key={country.iso2}
                                    className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center text-sm transition-colors"
                                    onClick={() => handleCountrySelect(country)}
                                >
                                    <span className={`fi fi-${country.iso2.toLowerCase()} mr-3 text-lg`}></span>
                                    <span className="flex-1 truncate font-medium text-gray-700">{country.nameES}</span>
                                    <span className="text-gray-400 ml-2">+{country.phoneCode}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Ej: 987654321"
                    className="flex-1 w-full min-w-0 px-4 text-sm border-0 focus:ring-0 bg-transparent text-gray-800 placeholder-gray-400"
                    pattern="[0-9]*"
                    style={{ WebkitAppearance: 'none' }}
                />
            </div>
            {phoneNumber && selectedCountry && (
                <p className="mt-1 text-sm text-gray-500">
                    Número completo: +{selectedCountry.phoneCode} {phoneNumber}
                </p>
            )}
        </div>
    );
};

const CheckoutContent = ({ publicKey, session, generals = [] }) => {
    const couponRef = useRef(null);

    // --- NUEVO: Extraer configuraciones de generales ---
    const isCulqiEnabled = generals.find(x => x.correlative === 'checkout_culqi')?.description === 'true';
    const isTransferEnabled = generals.find(x => x.correlative === 'checkout_transfer')?.description === 'true';
    const transferAccounts = (() => {
        const data = generals.find((x) => x.correlative === "transfer_accounts")?.description;
        try { return data ? JSON.parse(data) : []; } catch (e) { return []; }
    })();

    // --- NUEVO: Estado del método de pago ---
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        if (isCulqiEnabled) setPaymentMethod('culqi');
        else if (isTransferEnabled) setPaymentMethod('transfer');
    }, [isCulqiEnabled, isTransferEnabled]);

    useEffect(() => {
        if (window.Culqi) {
            window.Culqi.publicKey = publicKey;
            window.Culqi.options({
                paymentMethods: {
                    tarjeta: true,
                    yape: true,
                    billetera: false,
                    bancaMovil: false,
                    agente: false,
                    cuotealo: false,
                },
                installments: true,
                style: {
                    logo: `${window.location.origin}/assets/img/icon.png`,
                    bannerColor: "#5339B1",
                },
            });
        }
    }, [publicKey]);

    const cart = JSON.parse(localStorage.getItem("carrito")) || [];
    
    const [deliveryMethod, setDeliveryMethod] = useState(''); 
    const [shippingData, setShippingData] = useState({
        cost: 0,
        description: 'Selecciona ubicación para calcular el envío'
    });

    const [departments, setDepartments] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);

    const [sale, setSale] = useState({
        name: session?.name || "",
        lastname: session?.lastname || "",
        dni: session?.dni || "",
        email: session?.email || "",
        phone: session?.phone || "",
        country: "Perú",
        zone: "", 
        department_id: "",
        province_id: "",
        district_id: "",
        address: session?.address || "",
        number: session?.address_number || "",
        reference: session?.address_reference || "",
        comment: "",
    });
    
    const [loading, isLoading] = useState(false);
    const [coupon, setCoupon] = useState(null);
    const [alert, setAlert] = useState(null);

    const totalPrice = cart.reduce((acc, item) => acc + (item.final_price || 0) * item.quantity, 0);
    const planDiscount = totalPrice * 0;
    const couponDiscount = ((totalPrice - planDiscount) * (coupon?.amount || 0)) / 100;
    const finalAmount = totalPrice - planDiscount - couponDiscount + shippingData.cost; 

    useEffect(() => {
        fetch('/api/ubigeo/departments').then(res => res.json()).then(data => setDepartments(data));
    }, []);

    useEffect(() => {
        if (sale.zone === 'Lima Metropolitana') {
            setSale(s => ({ ...s, department_id: '15', province_id: '1501', district_id: '' }));
        } else if (sale.zone === 'Callao') {
            setSale(s => ({ ...s, department_id: '07', province_id: '0701', district_id: '' }));
        } else if (sale.zone === 'Lima Provincia') {
            setSale(s => ({ ...s, department_id: '15', province_id: '', district_id: '' }));
        } else {
            setSale(s => ({ ...s, department_id: '', province_id: '', district_id: '' }));
        }
    }, [sale.zone]);

    useEffect(() => {
        if (sale.department_id) {
            fetch(`/api/ubigeo/provinces/${sale.department_id}`).then(res => res.json()).then(data => setProvinces(data));
        } else {
            setProvinces([]);
        }
    }, [sale.department_id]);

    useEffect(() => {
        if (sale.province_id) {
            fetch(`/api/ubigeo/districts/${sale.province_id}`).then(res => res.json()).then(data => setDistricts(data));
        } else {
            setDistricts([]);
        }
    }, [sale.province_id]);

    useEffect(() => {
        if (deliveryMethod === 'pickup') {
            setShippingData({ cost: 0, description: 'Recojo en tienda física' });
            return;
        }

        if (deliveryMethod === 'delivery' && sale.zone && sale.district_id) {
            
            // Lógica para Lima Metropolitana y Callao (Calcula Costo en BD)
            if (sale.zone === 'Lima Metropolitana' || sale.zone === 'Callao') {
                // Seteamos un estado de "Cargando" para evitar compras fantasmas antes de que responda la API
                setShippingData({ cost: 0, description: 'Calculando costo de envío...' });

                const fetchShipping = async () => {
                    const data = await shippingCostRest.calculate(sale.zone, sale.district_id);
                    if (data) {
                        setShippingData({
                            cost: parseFloat(data.cost),
                            description: data.description || 'Envío a domicilio'
                        });
                    } else {
                        setShippingData({ cost: 0, description: '⚠️ Zona sin cobertura, intente otra' });
                    }
                };

                const timeoutId = setTimeout(() => { fetchShipping(); }, 500);
                return () => clearTimeout(timeoutId);

            } else {
                // Lógica para Lima Provincia y Regiones (Siempre permite compra)
                setShippingData({ 
                    cost: 0, 
                    description: 'Envío por Agencia (Pago en destino)' 
                });
            }

        } else if (deliveryMethod === 'delivery') {
             setShippingData({ cost: 0, description: 'Selecciona tu distrito para cotizar' });
        }
    }, [sale.zone, sale.district_id, deliveryMethod]);

    const validateForm = () => {
        const requiredPersonal = [
            { field: 'name', label: 'Nombre' },
            { field: 'lastname', label: 'Apellidos' },
            { field: 'email', label: 'Correo electrónico' },
            { field: 'phone', label: 'Teléfono' },
            { field: 'dni', label: 'DNI' },
        ];

        for (const { field, label } of requiredPersonal) {
            if (!sale[field] || sale[field].toString().trim() === '') {
                setAlert({ message: `Por favor, completa tu ${label}`, type: 'error' });
                return false;
            }
        }

        if (!deliveryMethod) {
            setAlert({ message: 'Por favor selecciona el método de entrega (Delivery o Recojo)', type: 'error' });
            return false;
        }

        if (deliveryMethod === 'delivery') {
            const requiredDelivery = [
                { field: 'zone', label: 'Zona de Cobertura' },
                { field: 'department_id', label: 'Departamento' },
                { field: 'province_id', label: 'Provincia' },
                { field: 'district_id', label: 'Distrito' },
                { field: 'address', label: 'Dirección' },
                { field: 'number', label: 'Número' }
            ];

            for (const { field, label } of requiredDelivery) {
                if (!sale[field] || sale[field].toString().trim() === '') {
                    setAlert({ message: `Para el Delivery, completa el campo: ${label}`, type: 'error' });
                    return false;
                }
            }

            // Validaciones estrictas de Cobertura SOLO para Lima y Callao
            if (sale.zone === 'Lima Metropolitana' || sale.zone === 'Callao') {
                if (shippingData.description.includes('sin cobertura')) {
                     setAlert({ message: 'Lamentablemente no contamos con métodos de envío para el distrito seleccionado.', type: 'error' });
                     return false;
                }
                // Prevenir click en Pagar si la API aún no responde tras cambiar de provincia a Lima
                if (shippingData.description.includes('Calculando')) {
                     setAlert({ message: 'Estamos calculando el costo de envío, por favor espera un momento.', type: 'error' });
                     return false;
                }
                if (shippingData.description.includes('Selecciona tu distrito')) {
                     setAlert({ message: 'Por favor selecciona un distrito válido para calcular el envío.', type: 'error' });
                     return false;
                }
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(sale.email)) {
            setAlert({ message: 'Ingresa un correo electrónico válido', type: 'error' });
            return false;
        }

        const phoneDigits = sale.phone?.replace(/\D/g, '') || '';
        if (phoneDigits.length < 9) {
            setAlert({ message: 'Ingresa un número de teléfono válido', type: 'error' });
            return false;
        }

        return true;
    };

    const getInputClassName = (fieldName) => {
        const hasError = alert && alert.type === 'error' && (!sale[fieldName] || sale[fieldName].toString().trim() === '');
        return `w-full rounded-xl border p-3 text-sm 4xl:text-lg font-dmsans outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed ${
            hasError ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white focus:border-[#FF9900] focus:ring-1 focus:ring-[#FF9900]'
        }`;
    };

    const handleInputChange = (field, value) => {
        setSale((old) => ({ ...old, [field]: value }));
        if (alert && alert.type === 'error') setAlert(null);
    };

    // --- NUEVO: Procesador Maestro de Órdenes ---
    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (loading) return;
        if (!validateForm()) return;

        if (!cart || cart.length === 0) {
            setAlert({ message: 'Tu carrito está vacío. Agrega productos antes de continuar.', type: 'error' });
            return;
        }

        if (totalPrice <= 0) {
            setAlert({ message: 'El total de la compra debe ser mayor a 0.', type: 'error' });
            return;
        }

        if (!paymentMethod) {
            setAlert({ message: 'Por favor, selecciona un método de pago.', type: 'error' });
            return;
        }

        if (paymentMethod === 'culqi') {
            await processCulqi();
        } else if (paymentMethod === 'transfer') {
            await processTransfer();
        }
    };

    const processCulqi = async () => {
        isLoading(true);
        const resCQ = await CulqiRest.order(
            {
                ...sale,
                method_shipping: deliveryMethod,
                shipping_cost: shippingData.cost,
                order_number: window.Culqi?.order_number || null,
                renewal_id: "000001",
                coupon: coupon?.name ?? null,
            },
            cart
        );

        const responseData = resCQ?.data || resCQ;

        if (responseData && responseData.id) {
            window.Culqi.order_number = responseData.order_number;

            if (typeof window !== 'undefined' && window.TrackingPixels) {
                window.TrackingPixels.trackInitiateCheckout(finalAmount, 'PEN');
            }
            
            window.Culqi.settings({
                title: "WeFem",
                currency: "PEN",
                amount: Math.round(finalAmount * 100),
                order: responseData.id,
            });
            window.Culqi.open();
        } else {
            setAlert({
                message: 'Error al conectar con la pasarela de pago. Por favor revisa tus datos.',
                type: 'error'
            });
        }
        isLoading(false);
    };

    const processTransfer = async () => {
        isLoading(true);
        try {
            const res = await fetch('/api/sales/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    sale: {
                        ...sale,
                        method_shipping: deliveryMethod,
                        shipping_cost: shippingData.cost,
                        coupon: coupon?.name ?? null,
                    },
                    details: cart
                })
            });

            const data = await res.json();

            if (data.status === 200) {
                localStorage.removeItem("carrito");
                
                if (typeof window !== 'undefined' && window.TrackingPixels) {
                    const cartContents = cart.map(producto => ({
                        item_id: producto.id,
                        item_name: producto.alias || producto.name,
                        quantity: producto.quantity,
                        price: producto.final_price || 0
                    }));
                    window.TrackingPixels.trackPurchase(finalAmount, 'PEN', cartContents);
                }
                
                // Redirige a thanks (la orden se ha creado en estado Pendiente en BD)
                window.location.href = "/thanks";
            } else {
                setAlert({ message: data.message || 'Error al procesar el pedido.', type: 'error' });
            }
        } catch (error) {
            setAlert({ message: 'Error de conexión al procesar la transferencia.', type: 'error' });
        }
        isLoading(false);
    };

    window.culqi = async () => {
        if (window.Culqi.token) {
            const resCQ = await CulqiRest.token({
                order: window.Culqi.order_number,
                token: window.Culqi.token,
            });
            if (resCQ) {
                if (typeof window !== 'undefined' && window.TrackingPixels) {
                    const cartContents = cart.map(producto => ({
                        item_id: producto.id,
                        item_name: producto.alias || producto.name,
                        quantity: producto.quantity,
                        price: producto.final_price || 0
                    }));
                    window.TrackingPixels.trackPurchase(finalAmount, 'PEN', cartContents);
                }
                window.location.href = "/thanks";
            }
        } else if (window.Culqi.order) {
            setInterval(() => {
                if (window.Culqi.isOpen) return;
                const order_number = window.Culqi.order_number.replace(`#${Global.APP_CORRELATIVE}-`, "");
                fetch(`/api/sales/notify/${order_number}`).then(() => {
                    window.location.href = `/`;
                });
            }, 500);
        }
    };

    const onCouponApply = (e) => {
        e.preventDefault();
        const couponCode = (couponRef.current.value || "").trim().toUpperCase();
        if (!couponCode) return;
        
        couponRest.save({
            coupon: couponCode,
            amount: totalPrice,
            email: sale?.email,
        }).then((result) => {
            if (result) setCoupon(result.data);
            else setCoupon(null);
        });
    };

    return (
        <>
            <Header showSlogan={true} backgroundHeight="h-0" />

            <section className="mt-[90px] px-[5%] md:px-[7.5%] lg:px-[10%] text-[#404040] pb-16 font-dmsans bg-[#fafafa]">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="py-6 flex flex-wrap justify-center gap-6 md:gap-10 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                            <ShieldCheck className="h-5 w-5 text-green-600" />
                            <span className="font-medium">Pago Seguro SSL</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                            <HeadphonesIcon className="h-5 w-5 text-blue-600" />
                            <span className="font-medium">Soporte 24/7</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                            <CreditCard className="h-5 w-5 text-purple-600" />
                            <span className="font-medium">Múltiples Métodos</span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold font-sora mb-8 text-black text-center lg:text-left">
                        Finalizar Compra
                    </h1>

                    {/* ACTUALIZADO: Cambiado onCulqiOpen por handlePlaceOrder */}
                    <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8 xl:gap-12 relative items-start">
                        
                        <div className="w-full lg:w-3/5 xl:w-2/3 flex flex-col gap-8">
                            
                            {/* --- 1. INFO PERSONAL --- */}
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                                <h2 className="text-2xl font-bold font-sora mb-6 text-black flex items-center gap-3 border-b pb-4">
                                    <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                    Información Personal
                                </h2>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm 4xl:text-lg font-medium text-gray-700" htmlFor="firstName">Nombre <b className="text-red-500">*</b></label>
                                        <input type="text" id="firstName" className={getInputClassName('name')} value={sale.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm 4xl:text-lg font-medium text-gray-700" htmlFor="lastName">Apellidos <b className="text-red-500">*</b></label>
                                        <input type="text" id="lastName" className={getInputClassName('lastname')} value={sale.lastname} onChange={(e) => handleInputChange('lastname', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm 4xl:text-lg font-medium text-gray-700" htmlFor="dni">DNI <b className="text-red-500">*</b></label>
                                        <input type="text" id="dni" className={getInputClassName('dni')} value={sale.dni} onChange={(e) => handleInputChange('dni', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm 4xl:text-lg font-medium text-gray-700" htmlFor="email">Correo Electrónico <b className="text-red-500">*</b></label>
                                        <input type="email" id="email" className={getInputClassName('email')} value={sale.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                                    </div>
                                    <div className="md:col-span-2">
                                        <PhoneInput 
                                            onPhoneChange={(fullNumber) => handleInputChange('phone', fullNumber)} 
                                            error={alert && alert.type === 'error' && (!sale.phone || sale.phone.trim() === '')}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* --- 2. MÉTODO DE ENTREGA --- */}
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                                <h2 className="text-2xl font-bold font-sora mb-6 text-black flex items-center gap-3 border-b pb-4">
                                    <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                    Método de Entrega
                                </h2>

                                <div className="flex gap-4 mb-6">
                                    <button 
                                        type="button"
                                        onClick={() => setDeliveryMethod('delivery')} 
                                        className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${deliveryMethod === 'delivery' ? 'border-[#FF9900] bg-[#FFF8EB] text-[#FF9900] shadow-sm' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                    >
                                        <Truck className="mb-2 h-8 w-8" />
                                        <span className="font-semibold text-base">Delivery</span>
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setDeliveryMethod('pickup')} 
                                        className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${deliveryMethod === 'pickup' ? 'border-[#FF9900] bg-[#FFF8EB] text-[#FF9900] shadow-sm' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                                    >
                                        <Store className="mb-2 h-8 w-8" />
                                        <span className="font-semibold text-base">Recojo en Tienda</span>
                                    </button>
                                </div>

                                {deliveryMethod === 'delivery' && (
                                    <div className="grid gap-5 md:grid-cols-2 mt-4 transition-all duration-500">
                                        
                                        <div className="md:col-span-2">
                                            <label className="mb-2 block text-sm 4xl:text-lg font-medium text-gray-700">Zona de Cobertura <b className="text-red-500">*</b></label>
                                            <select className={getInputClassName('zone')} value={sale.zone} onChange={(e) => handleInputChange('zone', e.target.value)}>
                                                <option value="">Seleccione su zona...</option>
                                                <option value="Lima Metropolitana">Lima Metropolitana</option>
                                                <option value="Callao">Callao</option>
                                                <option value="Lima Provincia">Lima Provincia</option>
                                                <option value="Region">Provincias a Nivel Nacional</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm 4xl:text-lg font-medium text-gray-700">Departamento <b className="text-red-500">*</b></label>
                                            <select 
                                                className={getInputClassName('department_id')} 
                                                value={sale.department_id} 
                                                onChange={(e) => handleInputChange('department_id', e.target.value)}
                                                disabled={sale.zone === 'Lima Metropolitana' || sale.zone === 'Callao' || sale.zone === 'Lima Provincia'}
                                            >
                                                <option value="">Seleccione</option>
                                                {departments
                                                    .filter(d => sale.zone === 'Region' ? d.id !== '15' : true)
                                                    .map(d => <option key={d.id} value={d.id}>{d.description}</option>)
                                                }
                                            </select>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm 4xl:text-lg font-medium text-gray-700">Provincia <b className="text-red-500">*</b></label>
                                            <select 
                                                className={getInputClassName('province_id')} 
                                                value={sale.province_id} 
                                                onChange={(e) => handleInputChange('province_id', e.target.value)}
                                                disabled={sale.zone === 'Lima Metropolitana' || sale.zone === 'Callao' || !sale.department_id}
                                            >
                                                <option value="">Seleccione</option>
                                                {provinces
                                                    .filter(p => sale.zone === 'Lima Provincia' ? p.id !== '1501' : true)
                                                    .map(p => <option key={p.id} value={p.id}>{p.description}</option>)
                                                }
                                            </select>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="mb-2 block text-sm 4xl:text-lg font-medium text-gray-700">Distrito <b className="text-red-500">*</b></label>
                                            <select 
                                                className={getInputClassName('district_id')} 
                                                value={sale.district_id} 
                                                onChange={(e) => handleInputChange('district_id', e.target.value)}
                                                disabled={!sale.province_id}
                                            >
                                                <option value="">Seleccione su distrito para cotizar envío</option>
                                                {districts.map(d => <option key={d.id} value={d.id}>{d.description}</option>)}
                                            </select>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="mb-2 block text-sm 4xl:text-lg font-medium text-gray-700">Dirección Exacta de Calle <b className="text-red-500">*</b></label>
                                            <input type="text" placeholder="Ej: Av. Los Pinos" className={getInputClassName('address')} value={sale.address} onChange={(e) => handleInputChange('address', e.target.value)} />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm 4xl:text-lg font-medium text-gray-700">Número/Lote <b className="text-red-500">*</b></label>
                                            <input type="text" placeholder="Ej: 123" className={getInputClassName('number')} value={sale.number} onChange={(e) => handleInputChange('number', e.target.value)} />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm 4xl:text-lg font-medium text-gray-700">Código Postal</label>
                                            <input type="text" placeholder="Ej: Lima 01" className="w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-[#FF9900] focus:ring-1 focus:ring-[#FF9900] bg-white" value={sale.zip_code} onChange={(e) => handleInputChange('zip_code', e.target.value)} />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="mb-2 block text-sm 4xl:text-lg font-medium text-gray-700">Referencia</label>
                                            <input type="text" placeholder="Ej: Cerca al parque principal, puerta verde..." className={getInputClassName('reference')} value={sale.reference} onChange={(e) => handleInputChange('reference', e.target.value)} />
                                        </div>
                                    </div>
                                )}

                                {deliveryMethod === 'pickup' && (
                                    <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl text-orange-800 text-sm mt-4 flex gap-3">
                                        <Store className="flex-shrink-0 w-6 h-6 mt-1 text-[#FF9900]" />
                                        <div>
                                            <strong className="block mb-1 text-base">Recogerás en nuestra tienda</strong>
                                            <p>Preparamos tu pedido sin costo adicional. Te enviaremos un correo de confirmación cuando tu paquete esté listo para ser recogido.</p>
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* --- 3. NUEVO: SELECCIÓN DE MÉTODO DE PAGO --- */}
                            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                                <h2 className="text-2xl font-bold font-sora mb-6 text-black flex items-center gap-3 border-b pb-4">
                                    <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                                    Método de Pago
                                </h2>
                                
                                <div className="flex flex-col gap-4">
                                    {isCulqiEnabled && (
                                        <label className={`border-2 p-4 rounded-xl cursor-pointer transition-all flex items-center gap-3 ${paymentMethod === 'culqi' ? 'border-[#FF9900] bg-[#FFF8EB]' : 'border-gray-200'}`}>
                                            <input type="radio" name="paymentMethod" value="culqi" checked={paymentMethod === 'culqi'} onChange={() => setPaymentMethod('culqi')} className="w-5 h-5 text-[#FF9900] focus:ring-[#FF9900]" />
                                            <div>
                                                <span className="font-bold block">Pago Seguro con Tarjeta o Yape</span>
                                                <span className="text-sm text-gray-500">Paga al instante de forma segura vía Culqi</span>
                                            </div>
                                        </label>
                                    )}
                                    
                                    {isTransferEnabled && (
                                        <label className={`border-2 p-4 rounded-xl cursor-pointer transition-all flex items-center gap-3 ${paymentMethod === 'transfer' ? 'border-[#FF9900] bg-[#FFF8EB]' : 'border-gray-200'}`}>
                                            <input type="radio" name="paymentMethod" value="transfer" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} className="w-5 h-5 text-[#FF9900] focus:ring-[#FF9900]" />
                                            <div>
                                                <span className="font-bold block">Transferencia Bancaria</span>
                                                <span className="text-sm text-gray-500">Transfiere a nuestras cuentas y envíanos el voucher por WhatsApp</span>
                                            </div>
                                        </label>
                                    )}
                                </div>

                                {/* Mostrar cuentas bancarias si selecciona Transferencia */}
                                {paymentMethod === 'transfer' && transferAccounts.length > 0 && (
                                    <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <h4 className="font-semibold mb-3">Cuentas Bancarias Disponibles:</h4>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {transferAccounts.map((acc, i) => (
                                                <div key={i} className="bg-white p-3 rounded-lg border shadow-sm flex gap-3 items-center">
                                                    {acc.image && <img src={`/api/generals/media/${acc.image}`} alt={acc.name} className="w-12 h-12 object-contain rounded" onError={(e) => (e.target.src = "/assets/img/icon.png")} />}
                                                    <div className="text-sm">
                                                        <strong className="block text-gray-800">{acc.name}</strong>
                                                        <span className="block text-gray-600">Cuenta: {acc.cc}</span>
                                                        {acc.cci && <span className="block text-gray-600">CCI: {acc.cci}</span>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* --- LADO DERECHO: RESUMEN Y PAGO --- */}
                        <div className="w-full lg:w-2/5 xl:w-1/3">
                            <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-2xl sticky top-24 shadow-sm">
                                
                                <h3 className="font-sora text-xl font-bold text-black mb-6 border-b pb-4">
                                    Resumen del Pedido
                                </h3>

                                <div className="flex flex-col gap-4 mb-6 max-h-[300px] pr-2 custom-scrollbar">
                                    {cart.map((item, index) => (
                                        <div key={item.cartItemId || index} className="flex items-center gap-4">
                                            <div className="w-16 h-16 4xl:w-20 4xl:h-20 flex-shrink-0 bg-gray-50 border border-gray-200 rounded-lg p-1 relative">
                                                <img src={`/api/items/media/${item.image}`} alt={item.name} className="w-full h-full object-contain" onError={(e) => (e.target.src = "/api/cover/thumbnail/null")} />
                                                <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <span className="font-sora font-semibold text-sm 4xl:text-base text-black line-clamp-2 leading-tight">{item.name}</span>
                                            </div>
                                            <div className="font-sora font-bold text-sm text-black whitespace-nowrap">
                                                S/ {Number2Currency((item.final_price || 0) * item.quantity)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {!coupon ? (
                                    <div className="mb-6 flex">
                                        <input
                                            ref={couponRef}
                                            type="text"
                                            placeholder="Código de cupón"
                                            className="w-full rounded-l-xl border border-gray-300 p-3 text-sm outline-none uppercase focus:border-[#FF9900] bg-gray-50"
                                            disabled={loading}
                                            onKeyDown={(e) => e.key === 'Enter' && onCouponApply(e)}
                                        />
                                        <button
                                            type="button"
                                            onClick={onCouponApply}
                                            disabled={loading}
                                            className="rounded-r-xl bg-gray-800 px-4 text-sm font-semibold text-white hover:bg-black transition-colors"
                                        >
                                            Aplicar
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mb-6 flex justify-between items-center bg-green-50 border border-green-200 p-3 rounded-xl text-sm font-medium text-green-700">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4" />
                                            <span>Cupón: <span className="font-bold uppercase">{coupon.name}</span></span>
                                        </div>
                                        <button type="button" onClick={() => setCoupon(null)} className="text-red-500 hover:text-red-700 font-bold p-1">
                                            ✕
                                        </button>
                                    </div>
                                )}

                                <div className="flex flex-col gap-3 text-sm text-gray-600 mb-6 border-t pt-4">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-black">S/ {Number2Currency(totalPrice)}</span>
                                    </div>
                                    
                                    {coupon && (
                                        <div className="flex justify-between text-green-600 font-medium">
                                            <span>Descuento ({coupon.amount}%)</span>
                                            <span>- S/ {Number2Currency(couponDiscount)}</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between">
                                        <span>Costo de Envío</span>
                                        <div className="text-right">
                                            <span className="font-semibold text-black">
                                                {shippingData.cost === 0 && deliveryMethod === 'delivery' && sale.district_id 
                                                    ? 'Pago en destino' 
                                                    : (shippingData.cost === 0 && deliveryMethod === 'pickup' 
                                                        ? 'Gratis' 
                                                        : `S/ ${Number2Currency(shippingData.cost)}`
                                                )}
                                            </span>
                                            <small className="block text-xs text-gray-500 mt-1 max-w-[160px] leading-tight">{shippingData.description}</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-4 mb-8 flex justify-between items-center">
                                    <span className="font-sora text-xl font-bold text-black">Total a Pagar</span>
                                    <span className="font-sora text-2xl font-bold text-[#FF9900]">
                                        S/ {Number2Currency(finalAmount)}
                                    </span>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="flex items-center gap-3 mb-4 w-full justify-center bg-gray-50 py-2 rounded-lg border border-gray-100">
                                        <img src="/assets/img/checkout/culqi-logo.svg" alt="Culqi" className="h-4" />
                                        <div className="h-4 w-px bg-gray-300"></div>
                                        <img src="/assets/img/checkout/cards.svg" alt="Cards" className="h-4" />
                                        <img src="/assets/img/checkout/yape.svg" alt="Yape" className="h-4" />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-2 bg-[#FF9900] text-white font-sora font-semibold text-lg py-4 rounded-xl hover:bg-opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-md shadow-orange-500/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {loading ? (
                                            <span className="animate-pulse">Procesando...</span>
                                        ) : (
                                            <>
                                                <Lock className="w-5 h-5" /> CONFIRMAR PEDIDO
                                            </>
                                        )}
                                    </button>
                                </div>
                                
                                <p className="text-center text-xs text-gray-400 mt-6 px-4">
                                    Tus datos están protegidos. Al hacer clic, aceptas nuestros <a href="#" className="underline hover:text-gray-600">Términos y Condiciones</a>.
                                </p>

                            </div>
                        </div>

                    </form>
                </div>
            </section>

            <Footer />
            
            {alert && (
                <AlertComponent
                    message={alert.message}
                    onClose={() => setAlert(null)}
                    duration={alert.type === 'error' ? 8000 : 5000}
                />
            )}
        </>
    );
};

const Checkout = (properties) => {
    return (
        <CarritoProvider>
            <Base {...properties}>
                <CheckoutContent {...properties} />
            </Base>
        </CarritoProvider>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(<Checkout {...properties} />);
});