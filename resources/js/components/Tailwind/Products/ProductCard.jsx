import React from 'react';

const ProductCard = ({ product }) => {
    const getProductUrl = (product) => {
        if (!product.category) return '#'; 

        const catSlug = product.category.slug; 
        const subcatSlug = product.subcategory ? product.subcategory.slug : null;
        const prodSlug = product.slug;

        if (subcatSlug) {
            return `/producto/${catSlug}/${subcatSlug}/${prodSlug}`;
        }
        
        return `/producto/${catSlug}/${prodSlug}`;
    };

    // --- NUEVA LÓGICA: Calcular precios a mostrar ---
    let displayPrice = product.price;
    let displayFinalPrice = product.final_price;
    let displayDiscount = product.discount;

    // Si el producto no tiene precio final base (o es 0) y tiene variantes
    if ((!displayFinalPrice || Number(displayFinalPrice) === 0) && product.variants?.length > 0) {
        // Buscar la variante con el precio final más bajo
        const lowestVariant = product.variants.reduce((prev, curr) => {
            const prevPrice = Number(prev.final_price || 0);
            const currPrice = Number(curr.final_price || 0);
            
            // Si alguno es 0, preferimos el que sí tenga precio
            if (prevPrice === 0) return curr;
            if (currPrice === 0) return prev;
            
            return prevPrice < currPrice ? prev : curr;
        }, product.variants[0]);

        displayPrice = lowestVariant.price;
        displayFinalPrice = lowestVariant.final_price;
        displayDiscount = lowestVariant.discount;
    }

    return (
        <a
            href={getProductUrl(product)}
            key={product.id}
            className="rounded-lg w-full group cursor-pointer group relative"
        >
            <div className="flex flex-col border border-gray-200 rounded-md">
                
                {/* Etiqueta de Ahorro usando los valores calculados */}
                {displayDiscount && displayDiscount > 0 && (
                    <div className="flex flex-row items-center justify-center gap-1 absolute top-2 right-2 bg-[#212529] z-50 text-white px-3 pt-[1px] pb-1 rounded-lg">
                        <span className="font-dmsans text-xs 2xs:text-sm 4xl:text-xl text-center pt-1 tracking-tight">
                            Ahorras
                        </span>
                        <div className="flex items-center gap-1 mt-1">
                            <img
                                src="https://i.ibb.co/S7R3V0tf/image.png"
                                className="w-3"
                                alt="Descuento"
                            />
                            <p className="font-dmsans text-xs 2xs:text-sm 4xl:text-xl font-semibold">
                                S/
                                {parseFloat(
                                    displayPrice - displayDiscount
                                ).toFixed(0)}
                            </p>
                        </div>
                    </div>
                )}

                <img
                    src={`/api/items/media/${product.image}`}
                    alt={product.name}
                    className={`w-full h-auto object-cover aspect-square`}
                    onError={(e) =>
                        (e.target.src = "/api/cover/thumbnail/null")
                    }
                />

                <div className="px-[5%] text-[#212529] flex flex-col gap-2 md:gap-3 3xlm:gap-4 4xl:gap-5 py-3 md:py-5">
                    
                    <div className="flex justify-between">
                        <h2 className="min-h-12 2xs:min-h-0 font-sora text-black text-base sm:text-lg md:text-xl 2xl:text-[22px] 4xl:text-3xl line-clamp-2 font-semibold tracking-tight">
                            {product.name}
                        </h2>
                    </div>

                    <div className="hidden md:flex flex-wrap justify-between gap-2">
                        <div className="flex flex-wrap justify-between 4md:justify-around xl:justify-between 4xl:justify-around w-full">
                                
                                <div className="flex flex-col items-center gap-1 py-1.5 px-2 2md:px-3 3md:px-4 lg:px-3 xlm:px-4 xl2m:px-3 2xl:px-3 4xl:px-4 border border-gray-300 rounded-md lg:rounded-xl">
                                        <div className="flex flex-row gap-1 items-center">
                                            <img
                                                src="/assets/img/balanza.png"
                                                className="w-6 xl:w-5 2xl:w-7 h-auto object-contain"
                                                alt="balanza"
                                                onError={(e) =>
                                                    (e.target.src = "/api/cover/thumbnail/null")
                                                }
                                            /> 
                                            <span className="font-dmsans text-sm xl:text-[13px] xl4m:text-sm 3xlm:text-base 4xl:text-lg">Peso</span>
                                        </div>
                                        <div className="flex font-dmsans justify-center">
                                            <span className="text-sm xl:text-[13px] 3xlm:text-base 4xl:text-lg">{product.weight > 0 ? `${product.weight} g` : 'S/N'}</span>
                                        </div>
                                </div>
                                
                                <div className="flex flex-col items-center gap-1 py-1.5 px-2 2md:px-3 3md:px-4 lg:px-3 xlm:px-4 xl2m:px-3 2xl:px-3 4xl:px-4 border border-gray-300 rounded-md lg:rounded-xl">
                                        <div className="flex flex-row gap-1 items-center">
                                            <img
                                                src="/assets/img/altura.png"
                                                className="w-6 xl:w-5 2xl:w-7 h-auto object-contain"
                                                alt="altura"
                                                onError={(e) =>
                                                    (e.target.src = "/api/cover/thumbnail/null")
                                                }
                                            />  
                                            <span className="font-dmsans text-sm xl:text-[13px] xl4m:text-sm 3xlm:text-base 4xl:text-lg">Altura</span>
                                        </div>
                                        <div className="flex font-dmsans justify-center">
                                            <span className="text-sm xl:text-[13px] 3xlm:text-base 4xl:text-lg">{product.height > 0 ? `${product.height} g` : 'S/N'}</span>
                                        </div>
                                </div>
                                
                                <div className="flex flex-col items-center gap-1 py-1.5 px-2 2md:px-3 3md:px-4 lg:px-3 xlm:px-4 xl2m:px-3 2xl:px-3 4xl:px-4 border border-gray-300 rounded-md lg:rounded-xl">
                                        <div className="flex flex-row gap-1 items-center">
                                            <img
                                                src="/assets/img/capacidad.png"
                                                className="w-6 xl:w-5 2xl:w-7 h-auto object-contain"
                                                alt="capacidad"
                                                onError={(e) =>
                                                    (e.target.src = "/api/cover/thumbnail/null")
                                                }
                                            /> 
                                            <span className="font-dmsans  text-sm xl:text-[13px] xl4m:text-sm 3xlm:text-base 4xl:text-lg">Capacidad</span>
                                        </div>
                                        <div className="flex font-dmsans justify-center">
                                            <span className="text-sm xl:text-[13px] 3xlm:text-base 4xl:text-lg">{product.capacity > 0 ? `${product.capacity} ml` : 'S/N'}</span>
                                        </div>
                                </div>
                        </div>
                    </div>

                    
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2 items-baseline">
                        {/* Usamos las variables display calculadas al principio */}
                        <div className="flex flex-row items-end gap-2 sm:flex-col sm:items-start sm:justify-start sm:gap-1">
                            <span className="font-sora text-black text-xl 2xl:text-[22px] 4xl:text-3xl font-bold tracking-tight !leading-none">
                                S/{Number(displayFinalPrice || 0).toFixed(2)}
                            </span>
                            {displayDiscount && displayDiscount > 0 && (                        
                                <span className="font-sora text-gray-400 text-base 2xl:text-lg 4xl:text-2xl font-medium tracking-tight !leading-tight line-through ">
                                    S/{Number(displayPrice || 0).toFixed(2)}
                                </span>
                            )}
                        </div>

                        <div
                            className="font-dmsans text-sm sm:text-base 4xl:text-xl flex gap-2 items-center justify-center fill-[#FF9900] border border-1 border-[#FF9900] text-[#FF9900] font-medium py-2 px-2 rounded-md md:rounded-lg group-hover:bg-[#FF9900] group-hover:fill-[#FFFFFF] group-hover:text-white transition-colors duration-1000"
                        >
                            Ver producto
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="14"
                                viewBox="0 0 17 14"
                                fill="current"
                            >
                                <path
                                    d="M16.4986 7.82554C16.8518 7.47235 16.8518 6.89972 16.4986 6.54653L10.743 0.791003C10.3899 0.437815 9.81723 0.437815 9.46404 0.791003C9.11086 1.14419 9.11086 1.71682 9.46404 2.07001L14.5801 7.18604L9.46404 12.3021C9.11086 12.6552 9.11086 13.2279 9.46404 13.5811C9.81723 13.9343 10.3899 13.9343 10.743 13.5811L16.4986 7.82554ZM0.484375 8.09043H15.8591V6.28164H0.484375V8.09043Z"
                                    fill="current"
                                />
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        </a>
    );
};

export default ProductCard;