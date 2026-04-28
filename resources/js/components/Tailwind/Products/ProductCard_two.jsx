import React from "react";
import HtmlContent from "../../../Utils/HtmlContent";

const ProductCard = ({ product, visible = true, onClick, isDetailView }) => {
    
    const MIN_WIDTH_FOR_DETAIL = 768;

    const handleClick = (e) => {
        e.preventDefault();
        // e.stopPropagation();
        if (window.innerWidth < MIN_WIDTH_FOR_DETAIL) {
            return;
        }

        if (onClick && !isDetailView) { 
            onClick(product);
        }
    };

    return (
        <div onClick={handleClick} className={`block rounded-3xl border border-opacity-35 overflow-hidden shadow-md w-full transition-transform duration-300  mx-auto 
                ${isDetailView ? 'cursor-default' : 'hover:-translate-y-2 cursor-pointer max-w-sm'}
            `}>
            <div className="w-full flex items-center justify-center">
                <div className="group cursor-pointer transition-all duration-300 !w-full">
                    <div className={`bg-white rounded-2xl w-full shadow-sm flex  ${isDetailView ? 'flex-row gap-0 md:gap-5' : 'flex-col'}`}>
                        
                        {/* Imagen del producto*/}
                        <div className={`relative overflow-hidden ${isDetailView ? 'w-1/2' : 'w-full'}`}>
                            <div className="relative aspect-square overflow-hidden flex items-center rounded-t-2xl justify-center">
                                <img
                                    src={`/api/items/media/${product?.image}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:brightness-100 transition-all duration-300"
                                    loading="lazy"
                                    onError={(e) =>
                                        (e.target.src =
                                            "/api/cover/thumbnail/null")
                                    }
                                />
                            </div>
                           <div className={`hidden  absolute bottom-0 rounded-t-2xl left-0 w-full h-full bg-transparent group-hover:bg-[#00000030] transition-colors duration-300 ${isDetailView ? '' : 'lg:block'}`}></div>
                        </div>

                        {/* Información del producto */}
                        <div className={`flex flex-col  4xl:py-4 4xl:px-5 gap-2 ${isDetailView ? 'w-1/2 py-4 lg:py-8 px-5 gap-5 justify-center' : 'w-full p-3 md:p-5 overflow-hidden md:mb-6 4xl:mb-4 justify-start'}`}>
                            
                                <h2 className={`text-black font-semibold font-sora tracking-tight ${isDetailView ? 'text-lg md:text-xl lg:text-2xl xl:text-3xl 4xl:text-4xl' : 'text-lg 4xl:text-xl md:line-clamp-1'}`}>
                                    {product.name}
                                </h2>

                                <HtmlContent
                                    className={`block w-full list-disc text-start text-black font-normal  font-dmsans text-wrap ${isDetailView ? 'space-y-1 text-sm lg:text-base 4xl:text-xl' : 'text-sm lg:text-base 4xl:text-lg md:max-h-28'}`}
                                    html={product?.description}
                                    htmlcontent={'html-content-second'}
                                />
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
