import Tippy from "@tippyjs/react";
import React, { useState, useEffect, useRef, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import GeneralRest from "../../actions/GeneralRest";
import { TbBrush } from "react-icons/tb";
import { Icon, Trash2 } from "lucide-react";
import Logout from "../../Actions/Logout";

const generalRest = new GeneralRest();
const Header = ({
    showShadow = true,
    gradientStart,
    menuGradientEnd,
    backgroundType = "none",
    backgroundSrc = "",
    backgroundHeight = "h-full",
    backgroundPosition = "object-top",
    children,
}) => {

    const [session, setSession] = useState(null);
    const [isLoadingSession, setIsLoadingSession] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const btnToggleRef = useRef(null);
    const { incrementarCantidad, decrementarCantidad } =
        useContext(CarritoContext);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const toggleMenu = (event) => {
        if (event.target.closest(".menu-toggle")) {
            setIsOpen(!isOpen);
        } else {
            setIsOpen(false);
        }
    };
    
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                btnToggleRef.current == event.target ||
                btnToggleRef.current.contains(event.target)
            )
                return;
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        const fetchUserSession = async () => {
            try {
                const data = await generalRest.getSession();
                // Si Laravel devuelve null, GeneralRest podría devolver un arreglo vacío [] por el catch
                if (data && !Array.isArray(data)) {
                    setSession(data);
                } else {
                    setSession(null);
                }
            } catch (error) {
                console.error("Error fetching session:", error);
            } finally {
                setIsLoadingSession(false);
            }
        };

        fetchUserSession();
    }, []);

    const [isScrolled, setIsScrolled] = useState(false);
    const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
    const [showMobileSubMenu, setShowMobileSubMenu] = useState(false);    

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 1);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const { carrito, eliminarProducto, agregarAlCarrito, mostrarCarrito, setMostrarCarrito } = useContext(CarritoContext);

    // Estados para manejo de variantes de ofertas en Header
    const [headerOfferStates, setHeaderOfferStates] = useState({});

    // Función para inicializar estados de ofertas
    const initializeOfferState = (adId, offerItem) => {
        if (!headerOfferStates[adId]) {
            setHeaderOfferStates(prev => ({
                ...prev,
                [adId]: {
                    selectedColor: offerItem?.colors?.length > 0 ? offerItem.colors[0].name : "",
                    selectedSize: offerItem?.sizes?.length > 0 ? offerItem.sizes[0].name : ""
                }
            }));
        }
    };

    // Función para actualizar estado de color de oferta
    const updateOfferColor = (adId, color) => {
        setHeaderOfferStates(prev => ({
            ...prev,
            [adId]: {
                ...prev[adId],
                selectedColor: color
            }
        }));
    };

    // Función para actualizar estado de talla de oferta
    const updateOfferSize = (adId, size) => {
        setHeaderOfferStates(prev => ({
            ...prev,
            [adId]: {
                ...prev[adId],
                selectedSize: size
            }
        }));
    };

    // --- Múltiples banners de Ads en el modal del carrito ---
    // Buscar todos los Ads activos con banner_image y producto de oferta no presente en el carrito ni aceptado
    let bannerAds = [];
    for (const prod of carrito) {
        if (prod.ad && prod.ad.banner_image && prod.ad.offer_item) {
            // Solo mostrar si la oferta no está en el carrito
            const offerItemId = prod.ad.offer_item.id;
            
            // Verificar si la oferta ya está en el carrito
            // Considerar tanto productos simples como con variantes
            const ofertaEnCarrito = carrito.some((item) => {
                if (item.id === offerItemId) {
                    return true;
                }
                return false;
            });
            
            // También verificar si ya fue aceptada anteriormente
            const ofertaYaAceptada = localStorage.getItem(`ad_shown_${prod.id}`) === 'true';
            
            if (!ofertaEnCarrito && !ofertaYaAceptada) {
                // Verificar que el producto de oferta tenga stock disponible
                let tieneStock = false;
                if (prod.ad.offer_item.variants && prod.ad.offer_item.variants.length > 0) {
                    // Producto con variantes - verificar si alguna variante tiene stock
                    tieneStock = prod.ad.offer_item.variants.some(variant => variant.stock > 0);
                } else {
                    // Producto simple - verificar stock directo
                    tieneStock = (prod.ad.offer_item.stock || 0) > 0;
                }
                
                if (tieneStock) {
                    bannerAds.push({
                        ...prod.ad,
                        originalProductId: prod.id // Para marcar como mostrado después
                    });
                }
            }
        }
    }
    const [animar, setAnimar] = useState(false);
    const totalProductos = carrito.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        if (totalProductos > 0) {
            setAnimar(true);
            setTimeout(() => setAnimar(false), 500); // Duración de la animación
        }
    }, [totalProductos]);
    // const [mostrarCarrito, setMostrarCarrito] = useState(false);
    const totalPrecio = carrito.reduce((acc, item) => acc + (item.final_price || 0) * item.quantity, 0);

    const [socials, setSocials] = useState([]);

    useEffect(() => {
        const fetchSocials = async () => {
            try {
                const data = await generalRest.getSocials();
                setSocials(data);
            } catch (error) {
                console.error("Error fetching socials:", error);
            }
        };

        fetchSocials();
    }, []); // Asegúrate de que este array de dependencias está vacío si solo se ejecuta una vez

    const TikTok = socials.find((social) => social.description === "TikTok");
    const WhatsApp = socials.find(
        (social) => social.description === "WhatsApp"
    );
    const Instagram = socials.find(
        (social) => social.description === "Instagram"
    );
    const Facebook = socials.find(
        (social) => social.description === "Facebook"
    );

    const subMenuProductos = [
        { name: "Sistemas de Intercomunicadores", link: "/intercomunicadores" },
        { name: "Sistemas de Videoporteros", link: "/videoporteros" },
        { name: "Sistemas de alarmas contra incendio", link: "/alarma-contra-incendios" },
        { name: "Sistema de alarma contra robo", link: "/sistema-de-alarma-contra-robo" },
    ];

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const isCartOrCheckout = currentPath === '/cart' || currentPath === '/checkout' || currentPath === '/carrito';

    return (
        <>
            <div
                className={`w-full max-w-full relative ${backgroundHeight} overflow-clip `}
            >
                
                <header
                    className={`font-sora fixed top-0 lg:w-full z-40 transition-colors duration-300 ${showShadow && 'shadow-md shadow-gray-300 transition-all duration-150'} ${backgroundType === "none" || isScrolled || isOpen
                            ? "bg-[#ffffff]"
                            : isScrolled
                                ? "bg-[#ffffff] shadow-md shadow-gray-300 transition-all duration-150"
                                : "bg-transparent"
                        } ${isScrolled &&
                        "bg-[#ffffff] shadow-md shadow-gray-300 transition-all duration-150"
                        }`}
                >
                    <div
                        className={`px-[5%] w-screen flex justify-between items-center text-[#5e5e60]`}
                    >
                        <div className="flex flex-row gap-6 justify-between items-center w-full lg:hidden">
                            
                            <button
                                ref={btnToggleRef}
                                onClick={toggleMenu}
                                className="text-[#ff9003] menu-toggle"
                                aria-label="Toggle menu"
                            >
                                <i
                                    className={`fas ${isOpen ? "fa-times" : "fa-bars"
                                        } text-lg md:text-2xl`}
                                ></i>
                            </button>

                            <a href="/">
                                <img
                                    src="/assets/img/logoapuntomotor.png"
                                    alt="Apunto Motor"
                                    className="h-20 4xl:h-24 object-contain"
                                />
                            </a>

                            <div className="flex flex-row space-x-4 text-2xl items-end justify-end">
                                {Instagram && (
                                    <a
                                        href={Instagram.link}
                                        aria-label="Instagram"
                                        target="_blank"
                                    >
                                        <div className="w-9 4xl:w-10 h-full aspect-square p-2 bg-[#7c231c] rounded-full flex justify-center items-center">
                                            <icon className="fa-brands fa-instagram text-white text-xl"></icon>                                        
                                        </div>
                                    </a>
                                )}

                                {Facebook && (
                                    <a
                                        href={Facebook.link}
                                        aria-label="Facebook"
                                        target="_blank"
                                    >
                                        <div className="w-9 4xl:w-10 h-full aspect-square p-2 bg-[#7c231c] rounded-full flex justify-center items-center">
                                            <icon className="fa-brands fa-facebook text-white text-xl 4xl:text-2xl"></icon>                                        
                                        </div>
                                    </a>
                                )}
                                
                                {TikTok && (
                                   <a href={TikTok.link}
                                       target="_blank"
                                       aria-label="Tik Tok"
                                       >
                                        <div className="w-9 4xl:w-10 h-full aspect-square p-2 bg-[#7c231c] rounded-full flex justify-center items-center">
                                            <icon className="fa-brands fa-tiktok text-white text-xl 4xl:text-2xl"></icon>                                        
                                        </div>
                                    </a>
                                )}

                                {/* <button
                                    onClick={() => {
                                        if (isCartOrCheckout) {
                                            if (currentPath === '/checkout') window.location.href = '/cart';
                                        } else {
                                            setMostrarCarrito(!mostrarCarrito);
                                        }
                                    }}
                                    className="relative"
                                >
                                    <img src="/assets/img/carrito_n.png" className="w-[26px] -mt-1" />
                                    <span
                                        className={`absolute -top-1 -right-1 bg-gray-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-medium transition-transform ${animar ? "scale-150" : "scale-100"
                                            }`}
                                        style={{
                                            transition:
                                                "transform 0.3s ease-in-out",
                                        }}
                                    >
                                        {totalProductos}
                                    </span>
                                </button> */}

                            </div>
                        </div>
                        
                        <div className="hidden lg:flex lg:flex-row w-full justify-between items-center font-normal text-base">
                            
                            <div className="flex justify-start xl:w-3/12">
                                <a href="/">
                                    <img
                                        src="/assets/img/logoapuntomotor.png"
                                        alt="Apunto Motor"
                                        className="h-20 4xl:h-24 object-contain"
                                    />
                                </a>
                            </div>
                            
                            <nav className="flex flex-row justify-center items-center gap-5 xl:gap-8 4xl:gap-10 xl:w-7/12 font-dmsans font-semibold lg:text-lg 2xl:text-xl 4xl:text-[23px] text-center tracking-tight h-full">
                                <a href="/">Inicio</a>
                                {/* <div className="relative group h-full flex items-center cursor-pointer"> */}
                                    {/* <a href="/catalogo" className="flex items-center gap-2 ">
                                        Productos
                                        <i className="fa-solid fa-chevron-down text-[0.6em] transition-transform duration-300 group-hover:rotate-180"></i>
                                    </a> */}
                                    {/* <div className="absolute top-[80%] left-0 w-[340px] 4xl:w-[400px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-50 text-left">
                                        <div className="bg-white rounded-[12px] shadow-xl overflow-hidden">
                                            <ul className="flex flex-col">
                                                {subMenuProductos.map((item, index) => (
                                                    <li key={index}>
                                                        <a
                                                            href={item.link}
                                                            className="tracking-tight block px-5 py-3 4xl:py-4 font-dmsans text-lg 4xl:text-xl text-black bg-gradient-to-r from-transparent to-transparent hover:from-[#00000017] hover:to-transparent transition-colors font-medium"
                                                        >
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div> */}
                                {/* </div> */}
                                <a href="/nosotros">Nosotros</a>
                                <a href="/servicios">Servicios</a>
                                <a href="/contacto">Contacto</a>
                            </nav>
                            
                            <div className="flex flex-row space-x-4 4xl:space-x-6 text-2xl 4xl:text-4xl items-end justify-end xl:w-3/12">
                                
                                {Instagram && (
                                    <a
                                        href={Instagram.link}
                                        aria-label="Instagram"
                                        target="_blank"
                                    >
                                        <div className="w-9 4xl:w-10 h-full aspect-square p-2 bg-[#7c231c] rounded-full flex justify-center items-center">
                                            <icon className="fa-brands fa-instagram text-white text-xl"></icon>                                        
                                        </div>
                                    </a>
                                )}

                                {Facebook && (
                                    <a
                                        href={Facebook.link}
                                        aria-label="Facebook"
                                        target="_blank"
                                    >
                                        <div className="w-9 4xl:w-10 h-full aspect-square p-2 bg-[#7c231c] rounded-full flex justify-center items-center">
                                            <icon className="fa-brands fa-facebook text-white text-xl 4xl:text-2xl"></icon>                                        
                                        </div>
                                    </a>
                                )}


                                {WhatsApp && (
                                    <a
                                        href={WhatsApp.link}
                                        aria-label="WhatsApp"
                                        target="_blank"
                                    >
                                        <div className="w-9 4xl:w-10 h-full aspect-square p-2 bg-[#7c231c] rounded-full flex justify-center items-center">
                                            <icon className="fa-brands fa-whatsapp text-white text-xl 4xl:text-2xl"></icon>                                        
                                        </div>
                                    </a>
                                )}

                                {TikTok && (
                                    <a href={TikTok.link}
                                       target="_blank"
                                       aria-label="Tik Tok"
                                       >
                                        <div className="w-9 4xl:w-10 h-full aspect-square p-2 bg-[#7c231c] rounded-full flex justify-center items-center">
                                            <icon className="fa-brands fa-tiktok text-white text-xl 4xl:text-2xl"></icon>                                        
                                        </div>
                                    </a>
                                )}

                                {/* {session && session.name ? (
                                    <div className="relative group h-full flex items-center cursor-pointer">
                                        <a className="relative cursor-pointer transition-transform hover:scale-110">
                                            <icon className="fa-solid fa-user text-[#7c231c] text-2xl 4xl:text-3xl"></icon>
                                        </a>
                                        
                                        <div className="absolute right-0 top-[80%] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-50 text-left w-56">
                                            
                                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 text-base font-dmsans relative">
                                               
                                                <div className="absolute -top-1 right-2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100 z-0"></div>
                                                
                                                <div className="px-5 py-2 border-b border-gray-100 bg-white relative z-10">
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Hola,</p>
                                                    <p className="text-gray-800 font-bold font-sora truncate text-lg leading-tight">{session.name.split(' ')[0]}</p>
                                                </div>
                                                
                                                <div className=" bg-white relative z-10">
                                                    <a href="/my-account" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-[#FF9900] transition-colors font-medium">
                                                        <i className="far fa-id-card w-4 text-center"></i> Mis datos
                                                    </a>
                                                    <a href="/my-account" className="flex items-center gap-3 px-5 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-[#FF9900] transition-colors font-medium">
                                                        <i className="fas fa-shopping-bag w-4 text-center"></i> Mis compras
                                                    </a>
                                                    <div className="h-px bg-gray-100 mx-4"></div>
                                                    <a onClick={Logout} className="flex items-center gap-3 px-5 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium">
                                                        <i className="fas fa-sign-out-alt w-4 text-center"></i> Cerrar sesión
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <a href="/login" className="relative cursor-pointer transition-transform hover:scale-110" title="Iniciar Sesión">
                                        <icon className="fa-solid fa-user text-[#7c231c] text-2xl 4xl:text-3xl"></icon>
                                    </a>
                                )} */}

                                {/* <button
                                    onClick={() => {
                                        if (isCartOrCheckout) {
                                            if (currentPath === '/checkout') window.location.href = '/cart';
                                        } else {
                                            setMostrarCarrito(!mostrarCarrito);
                                        }
                                    }}
                                    className="relative"
                                >
                                    <icon className="fa-solid fa-shopping-cart text-[#7c231c] text-2xl 4xl:text-3xl"></icon>
                                    <span
                                        className={`absolute -top-1 -right-1 bg-gray-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-medium transition-transform ${animar ? "scale-150" : "scale-100"
                                            }`}
                                        style={{
                                            transition:
                                                "transform 0.3s ease-in-out",
                                        }}
                                    >
                                        {totalProductos}
                                    </span>
                                </button> */}

                            </div>

                        </div>

                    </div>

                    {WhatsApp && (
                        <div className="flex justify-end w-full mx-auto z-[100] relative  ">
                            <div className="fixed bottom-3 right-2 md:bottom-[1rem] lg:bottom-[2rem] lg:right-3 z-20 cursor-pointer">
                                <a
                                    target="_blank"
                                    id="whatsapp-toggle"
                                    href={WhatsApp.link}
                                >
                                    <img
                                        src="/assets/img/whatsapp.svg"
                                        alt="whatsapp"
                                        className="mr-3 w-16 h-16 md:w-[80px] md:h-[80px]  animate-bounce duration-300"
                                    />
                                </a>
                            </div>
                        </div>
                    )}
                </header>
                
                {/* Menú Móvil */}
                <div
                    ref={menuRef}
                    className={`fixed inset-0 z-[999] transition-all duration-500 ease-in-out ${
                        isOpen 
                            ? "translate-x-0 opacity-100" 
                            : "-translate-x-full opacity-0 pointer-events-none"
                    } top-[70px]`}
                >
                    {/* Overlay */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Contenido del Menú (Ajustado a bg-[#0b0b0b]) */}
                    <nav className="absolute left-0 top-0 h-full w-full max-w-md bg-[#0b0b0b] shadow-2xl flex flex-col overflow-y-auto border-r border-white/5">
                        <ul className="flex flex-col text-white font-dmsans font-medium text-lg tracking-normal">
                            
                            {/* Inicio */}
                            <li className="border-b border-white/10">
                                <a className="block px-8 py-5 hover:bg-white/5 transition-colors" href="/">
                                    Inicio
                                </a>
                            </li>

                            {/* Productos con Desplegable */}
                            <li className="border-b border-white/10">
                                <button 
                                    onClick={() => setShowMobileSubMenu(!showMobileSubMenu)}
                                    className="w-full flex justify-between items-center px-8 py-5 hover:bg-white/5 transition-colors"
                                >
                                    <span className="font-dmsans">Productos</span>
                                    <i className={`fa-solid fa-chevron-down text-base transition-transform duration-300 ${showMobileSubMenu ? 'rotate-180' : ''}`}></i>
                                </button>
                                
                                {/* Contenedor del Submenú Animado */}
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-[#141414] ${showMobileSubMenu ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <ul className="flex flex-col border-l-2 border-red-600 ml-4">
                                        {subMenuProductos.map((item, index) => (
                                            <li key={index}>
                                                <a 
                                                    href={item.link} 
                                                    className="block px-8 py-4 text-base text-gray-300 hover:text-white hover:bg-white/5"
                                                >
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>

                            {/* Servicio Técnico */}
                            <li className="border-b border-white/10">
                                <a className="block px-8 py-5 hover:bg-white/5 transition-colors" href="/nosotros">
                                    Nosotros
                                </a>
                            </li>

                            <li className="border-b border-white/10">
                                <a className="block px-8 py-5 hover:bg-white/5 transition-colors" href="/servicios">
                                    Servicios
                                </a>
                            </li>

                            {/* Contacto */}
                            <li className="border-b border-white/10">
                                <a className="block px-8 py-5 hover:bg-white/5 transition-colors" href="/contacto">
                                    Contacto
                                </a>
                            </li>

                            {session && session.name ? (
                                <li className="border-b border-white/10">
                                    <button 
                                        onClick={() => setShowMobileUserMenu(!showMobileUserMenu)}
                                        className="w-full flex justify-between items-center px-8 py-4 hover:bg-white/5 transition-colors text-left"
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Hola,</span>
                                            <span className="font-dmsans text-[#FF9900] font-bold">{session.name.split(' ')[0]}</span>
                                        </div>
                                        <i className={`fa-solid fa-chevron-down text-base transition-transform duration-300 ${showMobileUserMenu ? 'rotate-180' : ''}`}></i>
                                    </button>
                                    
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-[#141414] ${showMobileUserMenu ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <ul className="flex flex-col border-l-2 border-[#FF9900] ml-4">
                                            <li>
                                                <a href="/mi-cuenta" className="flex items-center gap-3 px-8 py-4 text-base text-gray-300 hover:text-[#FF9900] hover:bg-white/5">
                                                    <i className="far fa-id-card w-4"></i> Mis datos
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/mi-cuenta" className="flex items-center gap-3 px-8 py-4 text-base text-gray-300 hover:text-[#FF9900] hover:bg-white/5">
                                                    <i className="fas fa-shopping-bag w-4"></i> Mis compras
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/logout" className="flex items-center gap-3 px-8 py-4 text-base text-red-500 hover:bg-white/5">
                                                    <i className="fas fa-sign-out-alt w-4"></i> Cerrar sesión
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            ) : (
                                <li className="border-b border-white/10 mt-4">
                                    <a className="flex items-center gap-3 px-8 py-5 text-[#FF9900] hover:bg-white/5 transition-colors font-bold" href="/login">
                                        <img src="/assets/img/acceso_n.png" className="w-7 -mt-1" /> Iniciar Sesión
                                    </a>
                                </li>
                            )}

                        </ul>

                    </nav>
                </div>

                {/*Modal Carrito*/}
                {mostrarCarrito && (
                    <>
                        <div className="fixed inset-0 bg-black/50 flex items-start justify-end px-[2%] lg:px-0 py-6  overflow-y-auto z-50 scrollbar-hide">
                            <div className="flex flex-col gap-4 bg-[#ffffff] shadow-lg w-full max-w-[380px] lg:max-w-[500px] 3xlm:max-w-[550px] 4xl:max-w-[600px] h-full max-h-screen p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl">
                                
                                {/* Encabezado */}
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl 4xl:text-3xl font-bold font-sora">
                                        Tu Carrito
                                    </h2>
                                    <button
                                        onClick={() => setMostrarCarrito(false)}
                                        className="text-lg font-bold text-[#000]"
                                    >
                                        ✖
                                    </button>
                                </div>

                                {/* Lista de productos con Scroll */}
                                <div className="flex-1 gap-4 overflow-y-auto custom-scrollbar">
                                    {carrito.length === 0 ? (
                                        <div className="w-full h-80 flex flex-col items-center justify-center gap-5 text-xl 3xlm:text-2xl  my-5">
                                            <img
                                                src="/assets/img/logo.webp"
                                                alt="Wefem"
                                                className="h-auto w-[330.55px] object-contain object-center"
                                            />
                                            <p className="text-center text-black font-sora font-medium tracking-tight">
                                                Tu carrito está vacío
                                            </p>
                                        </div>
                                    ) : (
                                        carrito.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-4 mb-4 w-full border p-2 border-gray-300 rounded-md"
                                            >
                                                <img
                                                    src={`/api/items/media/${item.image}`}
                                                    alt={item.name}
                                                    onError={(e) =>
                                                    (e.target.src =
                                                        "/api/cover/thumbnail/null")
                                                    }
                                                    className="w-20 h-20 md:w-28 md:h-28  object-cover"
                                                />

                                                <div className="flex flex-col w-[calc(100%-5rem)] md:w-[calc(100%-7rem)] ">
                                                    
                                                    <div className="w-full flex">
                                                        <div className="w-5/6 lg:w-8/12 flex flex-col gap-1">
                                                            <h2 className="font-sora text-sm md:text-[15px] 3xlm:text-lg 4xl:text-xl font-medium leading-normal line-clamp-2  lg:line-clamp-2">
                                                                {item.name}
                                                            </h2>

                                                            {(item.selectedColor || item.selectedSize) && (
                                                                <p className="text-xs md:text-[13px] text-gray-500 font-dmsans">
                                                                    {item.selectedColor} {item.selectedColor && item.selectedSize && ' - '} {item.selectedSize}
                                                                </p>
                                                            )}

                                                            {/* {item.discount && item.discount > 0 && (
                                                                <div className="flex flex-row">
                                                                    <div className="w-auto flex flex-row items-center justify-center gap-1 bg-[#212529] z-50 text-white px-2 pb-1 rounded-md">
                                                                        <span className="font-dmsans text-xs  4xl:text-base text-center pt-1 tracking-tight">
                                                                            Ahorras
                                                                        </span>
                                                                        <div className="flex items-center gap-1 mt-1">
                                                                            <img
                                                                                src="https://i.ibb.co/S7R3V0tf/image.png"
                                                                                className="w-3"
                                                                                alt="Descuento"
                                                                            />
                                                                            <p className="font-dmsans text-xs  4xl:text-base font-semibold">
                                                                                S/
                                                                                {parseFloat(
                                                                                    item.price -
                                                                                        item.discount
                                                                                ).toFixed(0)}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )} */}
                                                        </div>

                                                        {/* 🗑️ Botón para eliminar */}
                                                        <div className="w-1/6 lg:w-4/12 flex items-start justify-end">
                                                            <button
                                                                className="group text-white px-2 rounded-md hover:fill-red-500 transition-all duration-300"
                                                                onClick={() => eliminarProducto(item.cartItemId)}
                                                            >
                                                                <div className="h-8 3xlm:h-6 4xl:h-7 scale-x-[-1] ">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 448 512"
                                                                        className="h-full w-3 lg:w-4 relative"
                                                                        fill="current"
                                                                    >
                                                                        <path
                                                                            className="group-hover:-rotate-12 group-hover:absolute group-hover:inset-0 "
                                                                            fill="current"
                                                                            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3z"
                                                                        />

                                                                        <path
                                                                            fill="current"
                                                                            d="M32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="w-full flex">
                                                        
                                                        <div className="w-3/5  md:w-1/2 lg:w-2/3  flex">
                                                            <div className="flex flex-row items-end">
                                                                <span className="font-sora text-black text-base 2xl:text-lg 4xl:text-xl font-bold tracking-tight !leading-none">
                                                                    S/{Number(item.final_price || 0 ).toFixed(2)}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="w-2/5  md:w-1/2 lg:w-1/3 h-7 3xlm:h-9 4xl:h-10 font-dmsans">
                                                            <div className="flex h-full text-[#000000] bg-transparent border border-black items-center justify-around  rounded-[6px]  md:rounded-[10px] ">
                                                                <button
                                                                    className="w-6 h-6 text-xs md:text-base  "
                                                                    onClick={() => decrementarCantidad(item.cartItemId)}
                                                                >
                                                                    -
                                                                </button>
                                                                <span className="h-full flex items-center text-xs md:text-base  font-medium">
                                                                    {item.quantity}
                                                                </span>
                                                                <button
                                                                    className="w-6 h-6 text-xs md:text-base"
                                                                    onClick={() => incrementarCantidad(item.cartItemId)}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                  
                                {/* Total y botón de Checkout */}
                                {totalPrecio > 0 && (
                                    <div className="w-full mt-8 font-dmsans">
                                        <div className="w-full flex items-center justify-between my-6">
                                            <p className="text-2xl font-bold text-black ">
                                                Subtotal
                                            </p>
                                            <p className="text-2xl font-bold text-black ">
                                                S/ {totalPrecio.toFixed(2)}
                                            </p>
                                        </div>

                                        <a
                                            href="/cart"
                                            className="font-sora block text-center text-base 4xl:text-lg w-full  font-semibold rounded-[12.11px] lg:rounded-[15.11px] bg-[#FF9900] text-white py-3 hover:bg-opacity-90 hover:scale-105 transition-all duration-300"
                                        >
                                            IR A COMPRAR
                                        </a>

                                        <div className="mt-6 relative w-full">
                                            <img
                                                src="/assets/img/checkout/cards_digital.png"
                                                className="w-full object-cover h-auto rounded-lg shadow-lg shadow-gray-500/20      "
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
                
            </div>
        </>
    );
};

export default Header;
