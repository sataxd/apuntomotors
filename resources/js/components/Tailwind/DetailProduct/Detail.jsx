import React, { useContext, useEffect, useState } from "react";
import { CarritoContext } from "../../../context/CarritoContext";
import HtmlContent from "../../../Utils/HtmlContent";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

const Detail = ({ item }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    
    // 1. ESTADOS INICIALES:
    // - Toma el color del item. Si no hay, toma el primero de la lista. Si no hay lista, pone "Estándar".
    const [selectedColor, setSelectedColor] = useState(
        item?.color || "Estándar"
    );

    const [selectedSize, setSelectedSize] = useState(
        item?.size || "Unidad"
    );

    // 2. NUEVO: Este useEffect resetea los valores automáticamente si el usuario cambia de producto
    useEffect(() => {
        if (item) {
            setSelectedColor(item?.color || "Estándar");
            setSelectedSize(item?.size || "Unidad");
            
            // Imagen principal correspondiente al color o por defecto
            setMainImage(item?.color && item?.colors?.find(c => c.name === item?.color)?.image 
                ? item.colors.find(c => c.name === item?.color).image 
                : (item?.colors?.[0]?.image ?? item?.image)
            );
            
            setQuantity(1);
        }
    }, [item?.id]);

    // Buscar la variante activa según la combinación seleccionada
    const activeVariant = item?.variants?.find(
        v =>
            (!item.colors?.length || v.color?.name === selectedColor) &&
            (!item.sizes?.length || v.zise?.name === selectedSize) // En tu JSON la relación se llama "zise"
    );

    // Calcular Stock, Precios y Descuentos dinámicos
    const stockDisponible = activeVariant ? activeVariant.stock : (item?.stock ?? 0);
    const displayPrice = activeVariant ? activeVariant.price : item?.price;
    const displayFinalPrice = activeVariant ? activeVariant.final_price : item?.final_price;
    const displayDiscount = activeVariant ? activeVariant.discount : item?.discount;

    // Tracking de View Content cuando se carga el producto
   useEffect(() => {
        if (typeof window !== 'undefined' && window.TrackingPixels && item) {
            const productName = item.alias || item.name || 'Producto';
            const productId = item.id;
            const productPrice = displayFinalPrice || 0; // Usamos el precio final actual
            
            window.TrackingPixels.trackViewContent(productName, productId, productPrice, 'PEN');
        }
    }, [item, displayFinalPrice]);
    
    const [quantity, setQuantity] = useState(1);

    const changeQuantity = (amount) => {
        setQuantity((prev) => Math.max(1, prev + amount));
    };

    const { agregarAlCarrito } = useContext(CarritoContext);

    const addProduct = async (item) => {
        
        if (stockDisponible <= 0) {
            alert('Sin stock disponible para este producto.');
            return;
        }
        
        try {
            
            const result = await agregarAlCarrito({
                ...item,
                price: displayPrice,
                final_price: displayFinalPrice,
                discount: displayDiscount,
                quantity,
                selectedColor: item.colors?.length > 0 ? selectedColor : null,
                selectedSize: item.sizes?.length > 0 ? selectedSize : null,
                variant_id: activeVariant?.id || null
            });
            
            if (result && result.success === false) {
                alert(result.message || 'No se pudo agregar al carrito.');
                return;
            }
            
            // Solo mostrar el modal si no se ha mostrado antes para este producto
            if (item.ad && !localStorage.getItem(`ad_shown_${item.id}`)) {
                // Verificar si el producto de oferta tiene variantes
                const offerItem = item.ad.offer_item;
                if (offerItem && ((offerItem.colors && offerItem.colors.length > 0) || (offerItem.sizes && offerItem.sizes.length > 0))) {
                    // El producto de oferta tiene variantes, inicializar selección
                    // setSelectedOfferColor(offerItem.colors && offerItem.colors.length > 0 ? offerItem.colors[0].name : "");
                    // setSelectedOfferSize(offerItem.sizes && offerItem.sizes.length > 0 ? offerItem.sizes[0].name : "");
                    setShowOfferVariants(true);
                } else {
                    setShowOfferVariants(false);
                }
                setIsModalOpen(true);
            } else {
                console.log('🔧 DEBUG - Not showing ad modal - either no ad or already shown');
            }

        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            alert('Error al agregar el producto. Inténtalo de nuevo.');
        }
    };

    const [mainImage, setMainImage] = useState(item?.image ?? item?.colors?.[0]?.image);
    const hasGalleryImages = 
        (item?.images && item.images.length > 0) || 
        (item?.colors && item.colors.some(color => color !== null && color.image !== null));
    const mainImageWidthClass = hasGalleryImages ? "w-full xl:w-1/2" : "w-full xl:w-1/2";
    const productDetailsWidthClass = hasGalleryImages ? "w-full xl:w-1/2" : "w-full xl:w-1/2";

    // Obtener las medidas disponibles para el color seleccionado actualmente
    const getAvailableSizesForColor = (colorName) => {
        if (!item?.variants) return [];
        return item.variants
            .filter(v => v.color?.name === colorName && v.stock > 0) // Opcional: puedes quitar "&& v.stock > 0" si quieres que se pueda seleccionar aunque no haya stock (para mostrar el botón de "Sin stock")
            .map(v => v.zise?.name)
            .filter(Boolean);
    };

    const availableSizesForCurrentColor = getAvailableSizesForColor(selectedColor);

    // Función mejorada para cambiar de color
    const handleColorChange = (newColorName) => {
        setSelectedColor(newColorName);
        
        // Revisamos qué tallas/medidas existen para este nuevo color
        const availableSizes = item.variants
            .filter(v => v.color?.name === newColorName)
            .map(v => v.zise?.name);

        // Si la medida que estaba seleccionada NO existe para este nuevo color, 
        // cambiamos automáticamente a la primera medida que sí exista.
        if (availableSizes.length > 0 && !availableSizes.includes(selectedSize)) {
            setSelectedSize(availableSizes[0]);
            // setMainImage()
        }
    };

    const hasRealText = (htmlString) => {
        if (!htmlString) return false;
        const textOnly = htmlString.replace(/<[^>]*>?/gm, '').trim();
        return textOnly.length > 0;
    };

    return (
        
        <section className="px-[5%] md:px-[8%] mt-[70px]">
            
                {/* <p className="md:w-[644px] mx-auto lg:mx-0 md:text-[18.31px] 2xl:text-[23.31px] leading-[29.44px]">
                    Home / Tienda weFem / <strong>{item.name}</strong>
                </p> */}

                <div className="flex flex-col md:flex-row">
                    <div className="mx-auto flex flex-col items-center justify-center lg:flex-row lg:justify-start my-4 gap-4">
                            
                            {/* Left Column - Images */}
                            {hasGalleryImages && (
                                <div className="hidden xl:flex items-start justify-start flex-col gap-4 w-[100px] h-full max-h-[500px]">

                                    <div className="nav-prev-vertical flex flex-row justify-center items-center cursor-pointer p-1 text-white transition-colors  w-full bg-black rounded-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        </svg>
                                    </div>

                                    <Swiper
                                        direction={'vertical'}
                                        spaceBetween={10}
                                        slidesPerView={3.5}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        onBeforeInit={(swiper) => {
                                            swiper.params.navigation.prevEl = '.nav-prev-vertical';
                                            swiper.params.navigation.nextEl = '.nav-next-vertical';
                                        }}
                                        navigation={{
                                            nextEl: '.nav-next-vertical',
                                            prevEl: '.nav-prev-vertical',
                                        }}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="h-[500px]"
                                    >
                                            <SwiperSlide key={`main-${item.id}`}>
                                                <img
                                                    src={`/api/items/media/${item.image}`}
                                                    alt={item.name}
                                                    className="h-20 lg:h-[100px] w-auto max-w-[100px] aspect-square object-contain rounded-md cursor-pointer hover:opacity-80 transition p-1 border border-gray-300"
                                                    onClick={() => setMainImage(item.image)}
                                                    onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                                                />
                                            </SwiperSlide>

                                            {item.images && item.images.length > 0 &&
                                                item.images.map((image, index) => (
                                                    <SwiperSlide key={`thumb-${image.id}`}>
                                                        <img
                                                            key={`thumb-${image.id}`}
                                                            src={`/api/items/media/${image.url}`}
                                                            alt={item.name}
                                                            className="h-20 lg:h-[100px] w-auto max-w-[100px] aspect-square object-contain rounded-md cursor-pointer hover:opacity-80 transition p-1 border border-gray-300"
                                                            onClick={() => setMainImage(image.url)}
                                                            onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                                                        />
                                                    </SwiperSlide>
                                                ))}

                                            {item.colors && item.colors.length > 0 &&
                                                item.colors.map((color, index) => (
                                                    color.image && (
                                                        <SwiperSlide key={`thumb-${color.id}`}>
                                                            <img
                                                                key={`thumb-${color.id}`}
                                                                src={`/api/items/media/${color.image}`}
                                                                alt={item.name}
                                                                className="h-20 lg:h-[100px] w-auto max-w-[100px] aspect-square object-contain rounded-md cursor-pointer hover:opacity-80 transition p-1 border border-gray-300"
                                                                onClick={() => setMainImage(color.image)}
                                                                onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                                                            />
                                                        </SwiperSlide>
                                                    )
                                            ))}  
                                        
                                    </Swiper>

                                    <button className="nav-next-vertical flex flex-row justify-center items-center cursor-pointer p-1 text-white transition-colors  w-full bg-black rounded-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    
                                </div>
                            )}
                        
                            {/* Middle Column - Main Image */}
                            <div className={`${mainImageWidthClass} flex flex-col gap-2 max-w-lg 2xl:max-w-2xl`}>
                                
                                <div className="w-full border border-gray-300 rounded-md">
                                    <img
                                        src={`/api/items/media/${mainImage}`}
                                        alt={item.name}
                                        className="w-full h-full mx-auto max-w-[600px] 2xl:max-w-2xl object-contain aspect-square rounded-lg"
                                        loading="lazy"
                                        onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                                    />
                                </div>

                                {/* Galería móvil (Solo visible en pantallas pequeñas si hay imágenes extra) */}
                                {hasGalleryImages && (
                                    <div className="flex items-start xl:hidden justify-start flex-row gap-2 h-full">
                                        
                                        <button className="nav-prev-mobile flex flex-row justify-center items-center cursor-pointer z-10 p-1 text-white transition-colors h-20 bg-black rounded-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>

                                        <div className="grid grid-cols-1">
                                            <Swiper
                                                direction={'horizontal'}
                                                spaceBetween={10}
                                                slidesPerView={3}
                                                freeMode={true}
                                                watchSlidesProgress={true}
                                                onBeforeInit={(swiper) => {
                                                    swiper.params.navigation.prevEl = '.nav-prev-mobile';
                                                    swiper.params.navigation.nextEl = '.nav-next-mobile';
                                                }}
                                                navigation={{
                                                    nextEl: '.nav-next-mobile',
                                                    prevEl: '.nav-prev-mobile',
                                                }}
                                                modules={[FreeMode, Navigation, Thumbs]}
                                                className="h-20 w-full"
                                            >
                                                <SwiperSlide key={`main-${item.id}`}>
                                                    <img
                                                        src={`/api/items/media/${item.image}`}
                                                        alt={item.name}
                                                        className="h-20 w-auto max-w-20 aspect-square object-contain rounded-md cursor-pointer hover:opacity-80 transition p-1 border border-gray-300 mx-auto"
                                                        onClick={() => setMainImage(item.image)}
                                                        onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                                                    />
                                                </SwiperSlide>

                                                
                                                {item.images && item.images.length > 0 &&
                                                    item.images.map((image, index) => (
                                                    <SwiperSlide key={`thumb-${image.id}`}>
                                                        <img
                                                            key={`thumb-${image.id}`}
                                                            src={`/api/items/media/${image.url}`}
                                                            alt={item.name}
                                                            className="h-20 w-auto max-w-20 aspect-square object-contain rounded-md cursor-pointer hover:opacity-80 transition p-1 border border-gray-300 mx-auto"
                                                            onClick={() => setMainImage(image.url)}
                                                            onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                                                        />
                                                    </SwiperSlide>
                                                ))}
                                                

                                                {item.colors && item.colors.length > 0 &&
                                                    item.colors.map((color, index) => (
                                                        color.image && (
                                                            <SwiperSlide key={`thumb-${color.id}`}>
                                                                <img
                                                                    key={`thumb-${color.id}`}
                                                                    src={`/api/items/media/${color.image}`}
                                                                    alt="Color Thumbnail"
                                                                    className="h-20 w-auto max-w-20 aspect-square object-contain rounded-md cursor-pointer hover:opacity-80 transition p-1 border border-gray-300 mx-auto"
                                                                    onClick={() => setMainImage(color.image)}
                                                                    onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                                                                />
                                                            </SwiperSlide>
                                                        )
                                                ))}
                                            </Swiper>

                                            

                                        </div>

                                        <button className="nav-next-mobile flex flex-row justify-center items-center cursor-pointer z-10 p-1 text-white transition-colors h-20 bg-black rounded-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className={`${productDetailsWidthClass} text-[#333333] flex flex-col justify-center h-full gap-5 py-[5%] lg:pl-5`}>
                                
                                    <div className="flex flex-col gap-4">
                                        <h2 className="min-h-12 2xs:min-h-0 font-sora text-black text-2xl md:text-3xl 2xl:text-3xl 3xlm:text-4xl line-clamp-2 font-bold tracking-tight">
                                            {item.name}
                                        </h2>
                                        {hasRealText(item.description) ? (
                                            <HtmlContent
                                                className="font-dmsans text-black text-base 3xlm:text-[17px] 4xl:text-xl tracking-normal font-light"
                                                html={item.description}
                                            />
                                        ) : null}
                                    </div>

                                    <div className="flex max-w-2xl">
                                        <div className="flex flex-wrap gap-4 w-full">
                                                <div className="flex flex-col items-center gap-1 py-1.5 px-2 2md:px-3 3md:px-4 lg:px-3 xlm:px-4 xl2m:px-3 2xl:px-3 3xlm:px-4 4xl:px-5 border border-gray-300 rounded-md lg:rounded-xl">
                                                        
                                                        <div className="flex flex-row gap-1 items-center">
                                                            <img
                                                                src="/assets/img/balanza.png"
                                                                className="w-7 h-auto object-contain"
                                                                alt="balanza"
                                                                onError={(e) =>
                                                                    (e.target.src =
                                                                        "/api/cover/thumbnail/null")
                                                                }
                                                            /> 
                                                            <span className="font-dmsans text-sm 3xlm:text-lg 4xl:text-[19px]">Peso</span>
                                                        </div>

                                                        <div className="flex font-dmsans justify-center">
                                                            <span className="text-sm 3xlm:text-base 4xl:text-[19px]">{item.weight > 0 ? `${item.weight} g` : 'S/N'}</span>
                                                        </div>
                                                </div>

                                                <div className="flex flex-col items-center gap-1 py-1.5 px-2 2md:px-3 3md:px-4 lg:px-3 xlm:px-4 xl2m:px-3 2xl:px-3 3xlm:px-4 4xl:px-5 border border-gray-300 rounded-md lg:rounded-xl">
                                                        <div className="flex flex-row gap-1 items-center">
                                                            <img
                                                                src="/assets/img/altura.png"
                                                                className="w-7 h-auto object-contain"
                                                                alt="balanza"
                                                                onError={(e) =>
                                                                    (e.target.src =
                                                                        "/api/cover/thumbnail/null")
                                                                }
                                                            />  
                                                            <span className="font-dmsans text-sm 3xlm:text-lg 4xl:text-[19px]">Altura</span>
                                                        </div>
                                                        <div className="flex font-dmsans justify-center">
                                                            <span className="text-sm 3xlm:text-base 4xl:text-[19px]">{item.height > 0 ? `${item.height} mm` : 'S/N'}</span>
                                                        </div>
                                                </div>

                                                <div className="flex flex-col items-center gap-1 py-1.5 px-2 2md:px-3 3md:px-4 lg:px-3 xlm:px-4 xl2m:px-3 2xl:px-3 3xlm:px-4 4xl:px-5 border border-gray-300 rounded-md lg:rounded-xl">
                                                        <div className="flex flex-row gap-1 items-center">
                                                            <img
                                                                src="/assets/img/capacidad.png"
                                                                className="w-7 h-auto object-contain"
                                                                alt="balanza"
                                                                onError={(e) =>
                                                                    (e.target.src =
                                                                        "/api/cover/thumbnail/null")
                                                                }
                                                            /> 
                                                            <span className="font-dmsans text-sm 3xlm:text-lg 4xl:text-[19px]">Capacidad</span>
                                                        </div>
                                                        <div className="flex font-dmsans justify-center">
                                                            <span className="text-sm 3xlm:text-base 4xl:text-[19px]">{item.capacity > 0 ? `${item.capacity} ml` : 'S/N'}</span>
                                                        </div>
                                                </div>

                                                <div className="flex flex-col items-center gap-1 py-1.5 px-2 2md:px-3 3md:px-4 lg:px-3 xlm:px-4 xl2m:px-3 2xl:px-3 3xlm:px-4 4xl:px-5 border border-gray-300 rounded-md lg:rounded-xl">
                                                        
                                                        <div className="flex flex-row gap-1 items-center">
                                                            <img
                                                                src="/assets/img/colores.png"
                                                                className="w-7 h-auto object-contain"
                                                                alt="balanza"
                                                                onError={(e) =>
                                                                    (e.target.src =
                                                                        "/api/cover/thumbnail/null")
                                                                }
                                                            /> 
                                                            <span className="font-dmsans text-sm 3xlm:text-lg 4xl:text-[19px]">Color</span>
                                                        </div>

                                                        <div className="flex font-dmsans justify-center">
                                                            <span className="text-sm 3xlm:text-base 4xl:text-[19px]">{selectedColor || item.color || "S/C"}</span>
                                                        </div>
                                                </div>

                                                <div className="flex flex-col items-center gap-1 py-1.5 px-2 2md:px-3 3md:px-4 lg:px-3 xlm:px-4 xl2m:px-3 2xl:px-3 3xlm:px-4 4xl:px-5 border border-gray-300 rounded-md lg:rounded-xl">
                                                        
                                                        <div className="flex flex-row gap-1 items-center">
                                                            <img
                                                                src="/assets/img/tapa.png"
                                                                className="w-7 h-auto object-contain"
                                                                alt="balanza"
                                                                onError={(e) =>
                                                                    (e.target.src =
                                                                        "/api/cover/thumbnail/null")
                                                                }
                                                            /> 
                                                            <span className="font-dmsans text-sm 3xlm:text-lg 4xl:text-[19px]">Tapa</span>
                                                        </div>

                                                        <div className="flex font-dmsans justify-center">
                                                            <span className="text-sm 3xlm:text-base 4xl:text-[19px]">{item.cover > 0 ? `${item.cover} mm` : 'S/N'}</span>
                                                        </div>
                                                </div>

                                                <div className="flex flex-col items-center gap-1 py-1.5 px-2 2md:px-3 3md:px-4 lg:px-3 xlm:px-4 xl2m:px-3 2xl:px-3 3xlm:px-4 4xl:px-5 border border-gray-300 rounded-md lg:rounded-xl">
                                                        
                                                        <div className="flex flex-row gap-1 items-center">
                                                            <img
                                                                src="/assets/img/diametro.png"
                                                                className="w-7 h-auto object-contain"
                                                                alt="balanza"
                                                                onError={(e) =>
                                                                    (e.target.src =
                                                                        "/api/cover/thumbnail/null")
                                                                }
                                                            /> 
                                                            <span className="font-dmsans text-sm 3xlm:text-lg 4xl:text-[19px]">Diámetro</span>
                                                        </div>

                                                        <div className="flex font-dmsans justify-center">
                                                            <span className="text-sm 3xlm:text-base 4xl:text-[19px]">{item.diameter > 0 ? `${item.diameter} mm` : 'S/N'}</span>
                                                        </div>
                                                </div>
                                        </div>
                                    </div>

                                    {/* --- OPCIONES DE VARIANTES (COLOR Y TALLA) --- */}
                                    {item?.variants && item.variants.length > 0 && (
                                        <div className="flex flex-col gap-4">
                                            {/* Selector de Color */}
                                            {item?.colors && item.colors.length > 0 && (
                                                <div className="flex flex-col gap-2">
                                                    <span className="font-dmsans font-semibold text-sm">
                                                        Color: <span className="font-normal text-gray-600">{selectedColor}</span>
                                                    </span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.colors.map(color => {
                                                            // Opcional: Verificar si el color tiene al menos una variante creada
                                                            const colorHasVariants = item.variants.some(v => v.color?.name === color.name);
                                                            if (!colorHasVariants) return null; // No mostramos colores que no tengan combinaciones

                                                            return (
                                                                <button
                                                                    key={color.id}
                                                                    onClick={() => handleColorChange(color.name)}
                                                                    className={`px-4 py-2 border rounded-md text-sm font-dmsans font-medium transition-all duration-200 ${
                                                                        selectedColor === color.name 
                                                                            ? 'border-black bg-black text-white' 
                                                                            : 'border-gray-300 bg-white text-black hover:border-gray-500'
                                                                    }`}
                                                                >
                                                                    {color.name}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Selector de Medida/Talla */}
                                            {item?.sizes && item.sizes.length > 0 && (
                                                <div className="flex flex-col gap-2">
                                                    <span className="font-dmsans font-semibold text-sm">
                                                        Unidad: <span className="font-normal text-gray-600">{selectedSize}</span>
                                                    </span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.sizes.map(size => {
                                                            // Verificamos si esta medida existe para el color seleccionado
                                                            const isAvailableForColor = availableSizesForCurrentColor.includes(size.name);

                                                            return (
                                                                <button
                                                                    key={size.id}
                                                                    onClick={() => isAvailableForColor && setSelectedSize(size.name)}
                                                                    disabled={!isAvailableForColor}
                                                                    className={`px-4 py-2 border rounded-md text-sm font-dmsans font-medium transition-all duration-200 ${
                                                                        !isAvailableForColor 
                                                                            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-60 line-through' // Estilo cuando NO existe la combinación
                                                                            : selectedSize === size.name 
                                                                                ? 'border-black bg-black text-white' 
                                                                                : 'border-gray-300 bg-white text-black hover:border-gray-500'
                                                                    }`}
                                                                >
                                                                    {size.name}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Precio */}
                                    <div className="flex flex-row items-end gap-2 sm:gap-3">
                                        <div className="flex flex-row items-end gap-2 sm:gap-3">
                                            <span className="font-sora text-black text-2xl 2xl:text-3xl 4xl:text-4xl font-bold tracking-tight !leading-none">
                                                S/{Number(displayFinalPrice).toFixed(2)}
                                            </span>

                                            {/* Mostrar precio original tachado solo si es mayor al final_price */}
                                            {Number(displayPrice) > Number(displayFinalPrice) && (
                                                <span className="font-sora text-gray-400 text-base 2xl:text-lg 4xl:text-2xl font-medium tracking-tight !leading-tight line-through ">
                                                    S/{Number(displayPrice).toFixed(2)}
                                                </span>
                                            )}
                                        </div>

                                        {Number(displayPrice) > Number(displayFinalPrice) && (
                                            <div className="flex flex-row justify-start">
                                                <div className="w-auto flex flex-row items-center justify-center gap-1 bg-[#212529] text-white px-3 pt-[1px] pb-1 rounded-lg">
                                                    <span className="font-dmsans text-xs 2xs:text-sm 4xl:text-xl text-center pt-1 tracking-tight">
                                                        Ahorras
                                                    </span>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <img src="https://i.ibb.co/S7R3V0tf/image.png" className="w-3" alt="Descuento" />
                                                        <p className="font-dmsans text-xs 2xs:text-sm 4xl:text-xl font-semibold">
                                                            S/{parseFloat(displayPrice - displayFinalPrice).toFixed(0)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Add to Cart Button */}
                                    <div className="flex justify-start">
                                        <button
                                            onClick={async () => await addProduct(item)}
                                            className="mt-4 relative w-full max-w-sm font-medium text-base lg:text-lg 4xl:text-xl flex items-center justify-center py-2.5  rounded-xl font-sora text-white bg-black"
                                            disabled={stockDisponible <= 0}
                                        >
                                            <span className="">{stockDisponible <= 0 ? "Sin stock" : "Añadir al carrito"}</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 576 512"
                                                className="fill-white h-5 lg:h-5 absolute  top-1/2 -translate-y-1/2  right-20"
                                            >
                                                <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                                            </svg>
                                        </button>
                                    </div>

                            
                            </div>
                                                               
                    </div>
                </div>

        </section>

    );
};

export default Detail;
