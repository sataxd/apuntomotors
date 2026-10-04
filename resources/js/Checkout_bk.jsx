import { ChevronDown, CreditCard, HeadphonesIcon, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Local } from "sode-extend-react";
import CulqiRest from "./Actions/CulqiRest";
import Global from "./Utils/Global";
import Number2Currency from "./Utils/Number2Currency";
import CouponsRest from "./Actions/CouponsRest";
import Tippy from "@tippyjs/react";
import { CarritoProvider } from "./context/CarritoContext";
import Base from "./components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import AlertComponent from "./context/AlertComponent";

const places = {
    metropolitana: {
        name: "Lima Metropolitana",
        delivery: "Gratis",
        items: [
            "Ate",
            "Barranco",
            "Breña",
            "Cercado de Lima",
            "Chorrillos",
            "Comas",
            "El Agustino",
            "Independencia",
            "Jesús María",
            "La Molina",
            "La Victoria",
            "Lince",
            "Los Olivos",
            "Magdalena del Mar",
            "Miraflores",
            "Pueblo Libre",
            "Rímac",
            "San Borja",
            "San Isidro",
            "San Juan de Lurigancho",
            "San Juan de Miraflores",
            "San Luis",
            "San Martin de Porres",
            "San Miguel",
            "Santa Anita",
            "Santiago de Surco",
            "Surquillo",
            "Villa el Salvador",
            "Villa Maria del Triunfo",
        ],
    },
    alrededores: {
        name: "Lima Alrededores",
        delivery: "Por Shalom - Pago en destino",
        items: [
            "Ancón",
            "Carabayllo",
            "Chaclacayo",
            "Cieneguilla",
            "Lurín",
            "Pachacámac",
            "Pucusana",
            "Puente Piedra",
            "Punta Hermosa",
            "Punta Negra",
            "San Bartolo",
            "Lurigancho (Chosica)",
            "Santa María del Mar",
            "Santa Rosa",
        ],
    },
    provincias: {
        name: "Provincias",
        delivery: "Por Shalom - Pago en destino",
        items: "",
    },
};

const couponRest = new CouponsRest();

const PhoneInput = ({ onPhoneChange }) => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    // Cargar países y establecer Perú como predeterminado
    useEffect(() => {
        const loadCountries = async () => {
            try {
                // Si está en public/data
                const response = await fetch(
                    "/assets/data/countries_phone.json"
                );
                // Si está en src/data (importar directamente)
                // import countriesData from '../data/countries_phone.json';

                const data = await response.json();
                setCountries(data);

                // Establecer Perú como predeterminado (código PE)
                const peru = data.find((c) => c.iso2 === "PE");
                setSelectedCountry(peru || data[0]);
            } catch (error) {
                console.error("Error loading countries:", error);
            }
        };

        loadCountries();
    }, []);

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, ""); // Solo números
        setPhoneNumber(value);

        // Enviar el número completo con prefijo al formulario padre
        if (selectedCountry) {
            const fullNumber = `+${selectedCountry.phoneCode.replace(
                /\D/g,
                ""
            )}${value}`;
            onPhoneChange(fullNumber);
        }
    };

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setShowDropdown(false);
    };

    return (
        <div className="relative w-full">
            <label className="block text-sm font-medium mb-1">Teléfono/Celular <b className="text-red-500">*</b></label>

            <div className="flex border border-gray-300 rounded-md focus-within:ring-0 focus-within:border-[#C5B8D4]">
                {/* Selector de país - Modificado */}
                <div className="relative flex-shrink-0" ref={dropdownRef}>
                    <button
                        type="button"
                        className="flex items-center justify-between px-3 py-2
                         h-full border-r border-gray-300 bg-gray-50 rounded-l-md 
                         focus:outline-none focus:ring-0"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <div className="flex items-center gap-1">
                            <span
                                className={`fi fi-${selectedCountry?.iso2.toLowerCase()} mr-1`}
                            ></span>
                            <span className="text-sm">+{selectedCountry?.phoneCode}</span>
                        </div>
                        <ChevronDown
                            className={`h-4 w-4 transition-transform ${showDropdown ? "rotate-180" : ""
                                }`}
                        />
                    </button>

                    {showDropdown && (
                        <div className="absolute z-10 mt-1 w-full min-w-[280px] bg-white shadow-lg rounded-md py-1 max-h-60 overflow-auto border border-gray-200">
                            {countries.map((country) => (
                                <div
                                    key={country.iso2}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-sm"
                                    onClick={() => handleCountrySelect(country)}
                                >
                                    <span
                                        className={`fi fi-${country.iso2.toLowerCase()} mr-2`}
                                    ></span>
                                    <span className="flex-1 truncate">
                                        {country.nameES}
                                    </span>
                                    <span className="text-gray-500 ml-2">
                                        +{country.phoneCode}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Input de teléfono - Modificado */}
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder="Ej: 987654321"
                    className="flex-1 w-full min-w-0 px-3 py-2 text-sm 
                    border-0 focus:ring-0 rounded-r-md bg-transparent"
                    pattern="[0-9]*"
                    style={{ WebkitAppearance: 'none' }}
                />
            </div>

            {/* Mostrar número completo */}
            {phoneNumber && selectedCountry && (
                <p className="mt-1 text-sm text-gray-500">
                    Número completo: +{selectedCountry.phoneCode} {phoneNumber}
                </p>
            )}
        </div>
    );
};

const Checkout = ({ publicKey, session }) => {

    const couponRef = useRef(null);

    Culqi.publicKey = publicKey;
    
    Culqi.options({
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
            logo: `${location.origin}/assets/img/icon.png`,
            bannerColor: "#5339B1",
        },
    });

    const cart = JSON.parse(localStorage.getItem("carrito")) || [];
    const [sale, setSale] = useState({
        name: session?.name || null,
        lastname: session?.lastname || null,
        dni: session?.dni || null,
        email: session?.email,
        phone: session?.phone || null,
        country: "Perú",
        department:
            Object.keys(places).find(
                (x) => places[x].name == session?.department
            ) || null,
        province: session?.province || null,
        district: session?.district || null,
        zip_code: session?.zip_code || null,
        address: session?.address || null,
        number: session?.address_number || null,
        reference: session?.address_reference || null,
        comment: null,
    });
    const [loading, isLoading] = useState(false);
    const [coupon, setCoupon] = useState(null);
    const [alert, setAlert] = useState(null);

    const totalPrice = cart.reduce((acc, item) => {
        if (item.variations && item.variations.length > 0) {
            return (
                acc +
                item.variations.reduce(
                    (sum, v) => sum + (v.final_price || item.final_price || 0) * v.quantity,
                    0
                )
            );
        }
        return acc + (item.final_price || 0) * item.quantity;
    }, 0);

    const planDiscount = totalPrice * 0;

    const couponDiscount =
        ((totalPrice - planDiscount) * (coupon?.amount || 0)) / 100;

    const validateForm = () => {
        const requiredFields = [
            { field: 'name', label: 'Nombre' },
            { field: 'lastname', label: 'Apellidos' },
            { field: 'email', label: 'Correo electrónico' },
            { field: 'phone', label: 'Teléfono' },
            { field: 'department', label: 'Departamento' },
          
            { field: 'province', label: 'Provincia' },
            { field: 'address', label: 'Dirección' },
            { field: 'number', label: 'Número' },
            { field: 'dni', label: 'DNI' },
            { field: 'reference', label: 'Referencia' },
        ];

        // Validar campos obligatorios básicos
        for (const { field, label } of requiredFields) {
            if (!sale[field] || sale[field].toString().trim() === '') {
                setAlert({
                    message: `Por favor, completa el campo: ${label}`,
                    type: 'error'
                });
                return false;
            }
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(sale.email)) {
            setAlert({
                message: 'Por favor, ingresa un correo electrónico válido',
                type: 'error'
            });
            return false;
        }

        // Validar teléfono (mínimo 9 dígitos)
        const phoneDigits = sale.phone?.replace(/\D/g, '') || '';
        if (phoneDigits.length < 9) {
            setAlert({
                message: 'Por favor, ingresa un número de teléfono válido (mínimo 9 dígitos)',
                type: 'error'
            });
            return false;
        }

        // Validaciones específicas según el departamento
        if (sale.department === 'metropolitana' || sale.department === 'alrededores') {
            if (!sale.province || sale.province.trim() === '') {
                setAlert({
                    message: 'Por favor, selecciona un distrito',
                    type: 'error'
                });
                return false;
            }
        } else if (sale.department === 'provincias') {
            if (!sale.province || sale.province.trim() === '') {
                setAlert({
                    message: 'Por favor, ingresa la provincia',
                    type: 'error'
                });
                return false;
            }
            if (!sale.district || sale.district.trim() === '') {
                setAlert({
                    message: 'Por favor, ingresa el distrito',
                    type: 'error'
                });
                return false;
            }
        }

        return true;
    };

    const getInputClassName = (fieldName, baseClass = "w-full rounded-md border p-2 text-sm outline-none") => {
        const hasError = alert && alert.type === 'error' && (!sale[fieldName] || sale[fieldName].toString().trim() === '');
        return hasError 
            ? `${baseClass} border-red-500 bg-red-50` 
            : `${baseClass} border-gray-300`;
    };

    const handleInputChange = (field, value) => {
        setSale((old) => ({
            ...old,
            [field]: value,
        }));
        
        // Limpiar alert si el usuario está corrigiendo el campo
        if (alert && alert.type === 'error') {
            setAlert(null);
        }
    };

    const getSale = () => {
        let department = "Lima";
        let province = "Lima";
        let district = null;

        if (Array.isArray(places[sale.department].items)) {
            department = places[sale.department].name;
            province = sale.province;
            district = null;
        } else {
            department = sale.province;
            province = null;
            district = sale.district;
        }

        return {
            ...sale,
            department,
            province,
            district,
        };
    };

    const onCulqiOpen = async (e) => {
        e.preventDefault();
        if (loading) return;

        // Validar formulario primero
        if (!validateForm()) {
            return;
        }

        isLoading(true);
        let order_number = null;

        // Validar que el carrito no esté vacío
        if (!cart || cart.length === 0) {
            setAlert({
                message: 'Tu carrito está vacío. Agrega productos antes de continuar.',
                type: 'error'
            });
            isLoading(false);
            return;
        }

        // Validar que el total sea mayor a 0
        if (totalPrice <= 0) {
            setAlert({
                message: 'El total de la compra debe ser mayor a 0. Por favor, verifica los productos en tu carrito y actualiza la página si es necesario.',
                type: 'error'
            });
            isLoading(false);
            return;
        }

        // Validar que todos los productos tengan precios válidos
        const hasInvalidPrices = cart.some(item => {
            if (item.variations && item.variations.length > 0) {
                return item.variations.some(v => !v.final_price && !item.final_price);
            }
            return !item.final_price;
        });

        if (hasInvalidPrices) {
            setAlert({
                message: 'Algunos productos no tienen precios válidos. Por favor, actualiza la página e intenta nuevamente.',
                type: 'error'
            });
            isLoading(false);
            return;
        }

        if (totalPrice > 0) {
            console.log('🚀 Creando orden Culqi:', {
                totalPrice,
                cart,
                saleData: getSale()
            });

            const resCQ = await CulqiRest.order(
                {
                    ...getSale(),
                    order_number: Culqi.order_number,
                    renewal_id: "000001",
                    coupon: coupon?.name ?? null,
                },
                cart
            );

            console.log('📋 Respuesta de Culqi:', resCQ);

            if (resCQ && resCQ.data && resCQ.data.id) {
                order_number = resCQ.data.id;
                Culqi.order_number = resCQ.data.order_number;
                console.log('✅ Orden creada exitosamente:', order_number);
            } else {
                console.error('❌ Error en respuesta de Culqi:', resCQ);
                setAlert({
                    message: 'Error al generar la orden. Por favor, intenta nuevamente.',
                    type: 'error'
                });
                isLoading(false);
                return;
            }
        }

        // Validar que se haya generado la orden correctamente
        if (!order_number) {
            setAlert({
                message: 'No se pudo generar el número de orden. Por favor, intenta nuevamente.',
                type: 'error'
            });
            isLoading(false);
            return;
        }

        isLoading(false);
        
        // Tracking de evento Initiate Checkout
        if (typeof window !== 'undefined' && window.TrackingPixels) {
            const finalAmount = totalPrice - planDiscount - couponDiscount;
            window.TrackingPixels.trackInitiateCheckout(finalAmount, 'PEN');
        }
        
        Culqi.settings({
            title: "WeFem",
            currency: "PEN",
            amount: Math.ceil(
                (totalPrice - planDiscount - couponDiscount) * 100
            ),
            order: order_number,
        });
        Culqi.open();
    };

    window.culqi = async () => {
        if (Culqi.token) {
            const resCQ = await CulqiRest.token({
                order: Culqi.order_number,
                token: Culqi.token,
            });
            if (resCQ) {
                const order_number = Culqi.order_number.replace(
                    `#${Global.APP_CORRELATIVE}-`,
                    ""
                );
                
                // Tracking de evento Purchase
                if (typeof window !== 'undefined' && window.TrackingPixels) {
                    const finalAmount = totalPrice - planDiscount - couponDiscount;
                    const currentCart = JSON.parse(localStorage.getItem("carrito")) || [];
                    const cartContents = currentCart.flatMap(producto => {
                        if (producto.variations && producto.variations.length > 0) {
                            return producto.variations.map(variation => ({
                                item_id: producto.id,
                                item_name: producto.alias || producto.name,
                                quantity: variation.quantity,
                                price: variation.price || 0
                            }));
                        } else {
                            return [{
                                item_id: producto.id,
                                item_name: producto.alias || producto.name,
                                quantity: producto.quantity,
                                price: producto.price || 0
                            }];
                        }
                    });
                    
                    window.TrackingPixels.trackPurchase(finalAmount, 'PEN', cartContents);
                }
                
                //await fetch(`/api/sales/notify/${order_number}`);
                location.href = "/thanks";
            }
        } else if (Culqi.order) {
            redirectOnClose();
        }
    };

    const redirectOnClose = () => {
        setInterval(() => {
            if (Culqi.isOpen) return;
            const order_number = Culqi.order_number.replace(
                `#${Global.APP_CORRELATIVE}-`,
                ""
            );
            fetch(`/api/sales/notify/${order_number}`).then((res) => {
                location.href = `/`;
            });
        }, 500);
    };

    const onCouponApply = (e) => {
        e.preventDefault();
        const coupon = (couponRef.current.value || "").trim().toUpperCase();
        if (!coupon) return;
        couponRest
            .save({
                coupon,
                amount: totalPrice,
                email: sale?.email,
            })
            .then((result) => {
                if (result) setCoupon(result.data);
                else setCoupon(null);
            });
    };

    const onCouponKeyDown = (e) => {
        if (e.key == "Enter") onCouponApply(e);
    };

    return (
        <>
            <Header showSlogan={true} backgroundHeight="h-0" />

            <section className="mt-[70px] px-[5%] md:px-[7.5%] lg:px-[10%] text-[#404040]  pb-10">
                <div className="max-w-4xl mx-auto">
                    <div className="py-6 flex justify-center space-x-8 text-sm text-gray-600">
                        <div className="flex items-center">
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            <span>SSL Pago Seguro</span>
                        </div>
                        <div className="flex items-center">
                            <HeadphonesIcon className="mr-2 h-4 w-4" />
                            <span>24/7 Atención al cliente</span>
                        </div>
                        <div className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Pago online</span>
                        </div>
                    </div>
                    <form
                        className="w-full rounded-lg bg-white p-8 shadow-lg"
                        onSubmit={onCulqiOpen}
                        disabled={loading}
                    >
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 relative">
                            <div className="lg:col-span-3">
                                <h2 className="mb-4 text-xl font-semibold">
                                    Información personal
                                </h2>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label
                                            className="mb-1 block text-sm font-medium "
                                            htmlFor="firstName"
                                        >
                                            Nombre{" "}
                                            <b className="text-red-500">*</b>
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            className={getInputClassName('name')}
                                            value={sale.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="mb-1 block text-sm font-medium "
                                            htmlFor="lastName"
                                        >
                                            Apellidos{" "}
                                            <b className="text-red-500">*</b>
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            className={getInputClassName('lastname')}
                                            value={sale.lastname}
                                            onChange={(e) => handleInputChange('lastname', e.target.value)}
                                            
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label
                                        className="mb-1 block text-sm font-medium "
                                        htmlFor="dni"
                                    >
                                        DNI{" "}
                                        <b className="text-red-500">*</b>
                                    </label>
                                    <input
                                        type="text"
                                        id="dni"
                                        className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                                        value={sale.dni}
                                        onChange={(e) =>
                                            setSale((old) => ({
                                                ...old,
                                                dni: e.target.value,
                                            }))
                                        }
                                        
                                    />
                                </div>


                                <div className="mt-4">
                                    <label
                                        className="mb-1 block text-sm font-medium "
                                        htmlFor="country"
                                    >
                                        País / Región{" "}
                                        <b className="text-red-500">*</b>
                                    </label>
                                    <input
                                        type="text"
                                        id="country"
                                        className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                                        value={sale.country}
                                        disabled
                                        
                                    />
                                </div>
                                <div className="mt-4 grid gap-4 md:grid-cols-5">
                                    <div className="md:col-span-3">
                                        <label
                                            className="mb-1 block text-sm font-medium "
                                            htmlFor="department"
                                        >
                                            Región / Provincia{" "}
                                            <b className="text-red-500">*</b>
                                        </label>
                                        <select
                                            id="department"
                                            className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                                            value={sale.department}
                                            onChange={(e) =>
                                                setSale((old) => ({
                                                    ...old,
                                                    department: e.target.value,
                                                }))
                                            }
                                            
                                        >
                                            <option value="">
                                                Elige una opción
                                            </option>
                                            {Object.keys(places).map(
                                                (key, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={key}
                                                        >
                                                            {places[key].name}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                    </div>
                                </div>
                                {places[sale.department] && (
                                    <div className="mt-4 grid gap-4 md:grid-cols-5">
                                        {Array.isArray(
                                            places[sale.department].items
                                        ) ? (
                                            <>
                                                <div className="md:col-span-3">
                                                    <label
                                                        className="mb-1 block text-sm font-medium "
                                                        htmlFor="district"
                                                    >
                                                        Distrito{" "}
                                                        <b className="text-red-500">
                                                            *
                                                        </b>
                                                    </label>
                                                    <select
                                                        id="province"
                                                        className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                                                        value={sale.province}
                                                        onChange={(e) =>
                                                            setSale((old) => ({
                                                                ...old,
                                                                province:
                                                                    e.target
                                                                        .value,
                                                            }))
                                                        }
                                                        
                                                    >
                                                        <option value="">
                                                            Elige una opción
                                                        </option>
                                                        {places[
                                                            sale.department
                                                        ].items.map(
                                                            (
                                                                province,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <option
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            province
                                                                        }
                                                                    >
                                                                        {
                                                                            province
                                                                        }
                                                                    </option>
                                                                );
                                                            }
                                                        )}
                                                    </select>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label
                                                        className="mb-1 block text-sm font-medium  truncate text-ellipsis"
                                                        htmlFor="postalCode"
                                                        title="Código postal"
                                                    >
                                                        Código postal
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="postalCode"
                                                        className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                                                        value={sale.zip_code}
                                                        onChange={(e) =>
                                                            setSale((old) => ({
                                                                ...old,
                                                                zip_code:
                                                                    e.target
                                                                        .value,
                                                            }))
                                                        }
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="md:col-span-2">
                                                    <label
                                                        className="mb-1 block text-sm font-medium  truncate text-ellipsis"
                                                        htmlFor="postalCode"
                                                        title="Código postal"
                                                    >
                                                        Departamento{" "}
                                                        <b className="text-red-500">
                                                            *
                                                        </b>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="postalCode"
                                                        className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                                                        value={sale.province}
                                                        onChange={(e) =>
                                                            setSale((old) => ({
                                                                ...old,
                                                                province:
                                                                    e.target
                                                                        .value,
                                                            }))
                                                        }
                                                        
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label
                                                        className="mb-1 block text-sm font-medium  truncate text-ellipsis"
                                                        htmlFor="postalCode"
                                                        title="Código postal"
                                                    >
                                                        Distrito{" "}
                                                        <b className="text-red-500">
                                                            *
                                                        </b>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="postalCode"
                                                        className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                                                        value={sale.district}
                                                        onChange={(e) =>
                                                            setSale((old) => ({
                                                                ...old,
                                                                district:
                                                                    e.target
                                                                        .value,
                                                            }))
                                                        }
                                                        
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        className="mb-1 block text-sm font-medium  truncate text-ellipsis"
                                                        htmlFor="postalCode"
                                                        title="Código postal"
                                                    >
                                                        Código postal
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="postalCode"
                                                        className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                                                        value={sale.zip_code}
                                                        onChange={(e) =>
                                                            setSale((old) => ({
                                                                ...old,
                                                                zip_code:
                                                                    e.target
                                                                        .value,
                                                            }))
                                                        }
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                                <div className="mt-4">
                                    <div className="">
                                        <label
                                            className="mb-1 block text-sm font-medium "
                                            htmlFor="address"
                                        >
                                            Dirección completa{" "}
                                            <b className="text-red-500">*</b>
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            className={getInputClassName('address')}
                                            value={sale.address}
                                            placeholder="Nombre de la calle y número de la calle"
                                            onChange={(e) => handleInputChange('address', e.target.value)}
                                            
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="md:col-span-2 lg:col-span-1">
                                        <label
                                            className="mb-1 block text-sm font-medium "
                                            htmlFor="number"
                                        >
                                            Número{" "}
                                            <b className="text-red-500">*</b>
                                        </label>
                                        <input
                                            type="text"
                                            id="number"
                                            className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                                            value={sale.number}
                                            placeholder="Nombre de la calle y número de la calle"
                                            onChange={(e) =>
                                                setSale((old) => ({
                                                    ...old,
                                                    number: e.target.value,
                                                }))
                                            }
                                            
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label
                                        className="mb-1 block text-sm font-medium "
                                        htmlFor="apartment"
                                    >
                                        Apartamento, habitación, piso, etc.
                                        (referencia)
                                         <b className="text-red-500">*</b>
                                    </label>
                                    <input
                                        type="text"
                                        id="apartment"
                                        className="w-full rounded-md border border-gray-300 p-2 text-sm outline-none"
                                        value={sale.reference}
                                        onChange={(e) =>
                                            setSale((old) => ({
                                                ...old,
                                                reference: e.target.value,
                                            }))
                                        }
                                        
                                    />
                                </div>
                                <div className="mb-4 mt-4">
                                    <label
                                        className="mb-1 block text-sm font-medium "
                                        htmlFor="email"
                                    >
                                        Dirección de correo electrónico{" "}
                                        <b className="text-red-500">*</b>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={getInputClassName('email')}
                                        value={sale.email}
                                        placeholder="Dirección de correo electrónico"
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        
                                    // disabled={Boolean(session?.email)}
                                    />
                                </div>
                                <div>
                                    <PhoneInput
                                        onPhoneChange={(fullNumber) => {
                                            handleInputChange('phone', fullNumber);
                                            console.log('Phone actualizado:', fullNumber);
                                        }}
                                    />
                                    <div className="text-xs text-gray-500 mt-1">
                                        Teléfono actual: {sale.phone}
                                    </div>
                                </div>
                                {/*  <div className="mt-4">
                                    <label
                                        className="mb-1 block text-sm font-medium "
                                        htmlFor="phone"
                                    >
                                        Teléfono/Celular{" "}
                                        <b className="text-red-500">*</b>
                                    </label>
                                    <div className="flex border rounded-md border-gray-300">
                                        <span className="py-2 px-3 border-e">
                                            +51
                                        </span>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="w-full p-2 text-sm outline-none"
                                            value={sale.phone}
                                            onChange={(e) =>
                                                setSale((old) => ({
                                                    ...old,
                                                    phone: e.target.value,
                                                }))
                                            }
                                            placeholder="900000000"
                                            
                                        />
                                    </div>
                                </div>
*/}
                                <div className="mt-6">
                                    <h3 className="mb-4 text-xl font-semibold">
                                        Pago
                                    </h3>
                                    <div className="rounded-md border border-gray-300">
                                        <div className="p-4 py-3 flex justify-between">
                                            <img
                                                className="h-4"
                                                src="/assets/img/checkout/culqi-logo.svg"
                                                alt="Culqi"
                                            />
                                            <div className="flex gap-2">
                                                <img
                                                    className="h-4"
                                                    src="/assets/img/checkout/cards.svg"
                                                    alt="Cards"
                                                />
                                                <img
                                                    className="h-4"
                                                    src="/assets/img/checkout/pagoefectivo.svg"
                                                    alt="Pago efectivo"
                                                />
                                                <img
                                                    className="h-4"
                                                    src="/assets/img/checkout/yape.svg"
                                                    alt="Yape"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-xs bg-[#f9f9f9] p-4 px-6 rounded-b">
                                            Acepta pagos con{" "}
                                            <b>
                                                tarjetas de débito y crédito,
                                                Yape, Cuotealo BCP y
                                                PagoEfectivo
                                            </b>
                                            (billeteras móviles, agentes y
                                            bodegas).
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-6 text-xs">
                                    <p className="text-justify">
                                        Sus datos personales se utilizarán para
                                        procesar su pedido, respaldar su
                                        experiencia en este sitio web y para
                                        otros fines descritos en nuestra{" "}
                                        <a
                                            href="#"
                                            className="text-purple-600 hover:underline"
                                        >
                                            política de privacidad
                                        </a>
                                        .
                                    </p>
                                </div>
                                {/* <button className="mt-6 w-full rounded-md bg-pink-400 py-3 text-white hover:bg-pink-500" onClick={onCulqiOpen}>
                  <i className='mdi mdi-lock me-1'></i>
                  Realizar el pedido S/ {Number2Currency(totalPrice)}
                </button> */}
                            </div>
                            <div className="lg:col-span-2 relative">
                                <div className="block sticky top-4">
                                    <h2 className="mb-4 text-xl font-semibold">
                                        Tu pedido
                                    </h2>
                                    <div className="rounded-lg border bg-gray-200 border-gray-200 p-4">
                                        <div className="mb-4 flex justify-between border-b pb-2 font-bold">
                                            <span className="">Producto</span>
                                            <span className="">Subtotal</span>
                                        </div>
                                        <div className="mb-2">
                                            {cart.map((item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="mb-1 flex items-center justify-between text-sm"
                                                    >
                                                        <div className="flex gap-2">
                                                            <div className="h-10 aspect-[3/4] relative">
                                                                <img
                                                                    className="h-10 aspect-[3/4] object-contain object-center rounded-md border"
                                                                    src={`/api/items/media/${item.image}`}
                                                                    alt={
                                                                        item.name
                                                                    }
                                                                    onError={(
                                                                        e
                                                                    ) =>
                                                                    (e.target.src =
                                                                        "/api/cover/thumbnail/null")
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <p>
                                                                    {item.name}
                                                                </p>
                                                                <small className="text-xs text-gray-500">
                                                                    <span className="w-6 inline-block text-nowrap">
                                                                        ×{" "}
                                                                        {item.variations &&
                                                                            item
                                                                                .variations
                                                                                .length >
                                                                            0
                                                                            ? item.variations.reduce(
                                                                                (
                                                                                    sum,
                                                                                    v
                                                                                ) =>
                                                                                    sum +
                                                                                    v.quantity,
                                                                                0
                                                                            )
                                                                            : item.quantity}
                                                                    </span>
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <span className="">
                                                            S/{" "}
                                                            {Number2Currency(
                                                                item.variations &&
                                                                    item
                                                                        .variations
                                                                        .length >
                                                                    0
                                                                    ? item.variations.reduce(
                                                                        (
                                                                            sum,
                                                                            v
                                                                        ) =>
                                                                            sum +
                                                                            (v.final_price || item.final_price || 0) *
                                                                            v.quantity,
                                                                        0
                                                                    )
                                                                    : (item.final_price || 0) *
                                                                    item.quantity
                                                            )}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="mb-2 mt-4 flex justify-between border-b pb-2 text-sm font-bold">
                                            <span>Subtotal</span>
                                            <span>
                                                S/ {Number2Currency(totalPrice)}
                                            </span>
                                        </div>

                                        {coupon && (
                                            <div className="mb-2 mt-2 flex justify-between items-center border-b pb-2 text-sm font-bold">
                                                <span>
                                                    Cupón aplicado{" "}
                                                    <Tippy content="Eliminar">
                                                        <i
                                                            className="mdi mdi-close text-red-500 cursor-pointer"
                                                            onClick={() =>
                                                                setCoupon(null)
                                                            }
                                                        ></i>
                                                    </Tippy>
                                                    <small className="block text-xs font-light">
                                                        {coupon.name}{" "}
                                                        <Tippy
                                                            content={
                                                                coupon.description
                                                            }
                                                        >
                                                            <i className="mdi mdi-information-outline ms-1"></i>
                                                        </Tippy>{" "}
                                                        (-
                                                        {Math.round(
                                                            coupon.amount * 100
                                                        ) / 100}
                                                        %)
                                                    </small>
                                                </span>
                                                <span>
                                                    S/ -
                                                    {Number2Currency(
                                                        couponDiscount
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                        {sale.department && (
                                            <div className="mb-4 flex justify-between text-sm border-b pb-2">
                                                <span className="font-bold">
                                                    Envío
                                                </span>
                                                <span>
                                                    {
                                                        places?.[
                                                            sale.department
                                                        ]?.delivery
                                                    }
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-lg font-semibold">
                                            <span>Total</span>
                                            <span>
                                                S/{" "}
                                                {Number2Currency(
                                                    totalPrice -
                                                    planDiscount -
                                                    couponDiscount
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    {!coupon && (
                                        <div className="mt-6 flex">
                                            <input
                                                ref={couponRef}
                                                type="text"
                                                placeholder="Código de cupón"
                                                className="w-full rounded-l-md border border-gray-300 p-2 px-4 text-sm outline-none uppercase focus:border-[#C5B8D4]"
                                                value={coupon?.name}
                                                onKeyDown={onCouponKeyDown}
                                                disabled={loading}
                                            />
                                            <button
                                                className="rounded-r-md bg-[#FF9900] px-4 py-2 text-sm text-white"
                                                type="button"
                                                onClick={onCouponApply}
                                                disabled={loading}
                                            >
                                                Aplicar
                                            </button>
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        className="mt-6 w-full rounded-md bg-[#FF9900] py-3 text-white disabled:cursor-not-allowed"
                                        disabled={loading}
                                    >

                                        PAGAR AHORA
                                        {/*  <i className="mdi mdi-lock me-1"></i>       <small className="ms-1">
                                            (S/{" "}
                                            {Number2Currency(
                                                totalPrice -
                                                planDiscount -
                                                couponDiscount
                                            )}
                                            )
                                        </small>*/}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            <Footer />
            
            {/* Alert Component */}
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

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <Checkout {...properties} />
            </Base>
        </CarritoProvider>
    );
});
