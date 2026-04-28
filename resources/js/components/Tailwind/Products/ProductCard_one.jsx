import React from "react";

const ProductCard = ({ product, visible = true }) => {
    const formatPrice = (price) =>
        new Intl.NumberFormat("es-PE", {
            style: "currency",
            currency: "PEN",
        }).format(price);

    return (
        <a href={`/product/${product.slug}`} className="block w-full">
            <div className="w-full flex items-center justify-center">
                <div className="group cursor-pointer transition-all duration-300 !w-full">
                    <div className="bg-white rounded-xl w-full">
                        {/* Imagen del producto y etiqueta de descuento */}
                        <div className="relative overflow-hidden">
                            <div className="relative group aspect-square overflow-hidden flex items-center rounded-xl justify-center">
                                {product.discount && (
                                    <div
                                        className={`absolute bg-[#212529] z-50 text-white text-base font-medium px-3 pt-[1px] pb-1 rounded-2xl ${
                                            visible
                                                ? "top-2 right-2"
                                                : "top-2 right-2 "
                                        }`}
                                    >
                                        <span className="text-[12.09px] leading-[14.72px]">
                                            Ahorras
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <img
                                                src="https://i.ibb.co/S7R3V0tf/image.png"
                                                className="w-3 mb-1"
                                                alt="Descuento"
                                            />
                                            <p className="text-[16.08px] leading-[20.9px] font-bold">
                                                S/{" "}
                                                {parseFloat(
                                                    product.price -
                                                        product.discount
                                                ).toFixed(0)}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {product.colors ? (
                                    <img
                                        src={`/api/items/media/${product.colors[0]?.image}`}
                                        alt={product.name}
                                        className="w-[300.38px] md:w-[300.38px] md:h-[300.38px] 2xl:w-[346.38px] 2xl:h-[346.38px] object-cover group-hover:brightness-100 transition-all duration-300"
                                        loading="lazy"
                                        onError={(e) =>
                                            (e.target.src =
                                                "/api/cover/thumbnail/null")
                                        }
                                    />
                                ) : (
                                    <img
                                        src={`/api/items/media/${product?.image}`}
                                        alt={product.name}
                                        className="w-[300.38px] md:w-[300.38px] md:h-[300.38px] 2xl:w-[346.38px] 2xl:h-[346.38px] object-cover group-hover:brightness-100 transition-all duration-300"
                                        loading="lazy"
                                        onError={(e) =>
                                            (e.target.src =
                                                "/api/cover/thumbnail/null")
                                        }
                                    />
                                )}

                                <div className="hidden lg:block absolute bottom-0 rounded-xl left-0 w-full h-full bg-[#00000080] group-hover:bg-transparent transition-colors duration-300"></div>
                            </div>
                        </div>

                        {/* Información del producto */}
                        <div
                            className={`px-0 pb-4 pt-2 lg:px-4 lg:pt-8 block  lg:block w-full ${
                                visible ? "block" : "hidden"
                            }`}
                        >
                            <div className="flex justify-between">
                                <h3 className="text-[20px] md:text-[25.44px] 2xl:text-[29.44px] md:leading-[20.64px] 2xl:leading-[41.64px] text-[#212529] font-semibold line-clamp-2">
                                    {product.name}
                                </h3>
                                <span className="text-[20px] md:text-[27.56px] 2xl:text-[32.56px] md:leading-[20.64px] 2xl:leading-[39.79px] font-bold text-[#FC58BE]">
                                    {formatPrice(product.final_price)}
                                </span>
                            </div>

                            {/* Precio */}
                            <div className="flex justify-between items-baseline gap-2 !w-full">
                                <h4 className="block w-full text-start text-[12px] md:text-[14px] 2xl:text-[16px] text-[#212529] truncate leading-tight text-wrap">
                                    ({product.summary})
                                </h4>
                                {product.discount && (
                                    <span className="text-[12.28px] lg:text-[14.28px] 2xl:text-[16.8px] text-[#9F9F9F] line-through text-nowrap">
                                        S/ {Number(product.price).toFixed(2)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};

export default ProductCard;
