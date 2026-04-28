import React, { useContext, useState } from "react";
import { CarritoContext } from "../../../context/CarritoContext";

const NotSureSection = ({ producto }) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState("purple");
    const [selectedSize, setSelectedSize] = useState("Talla A");

    const changeQuantity = (amount) => {
        setQuantity((prev) => Math.max(1, prev + amount));
    };
    const { agregarAlCarrito } = useContext(CarritoContext);
    return (
        <section className="py-6 lg:py-10 2xl:py-16 px-[5%] mx-auto font-font-general bg-[#F3E5FF] mb-0 2xl:mb-0">
            <h2 className="lg:hidden text-[26.3px] leading-[27.31px]  md:text-[46.3px]  md:leading-[47.31px] font-bold text-[#212529]  text-center flex gap-2 items-center justify-center">
                ¿Aún no estás segura?
            </h2>
            <p className="lg:hidden md:text-[28.01px] mt-2 md:mt-4 text-center md:leading-[34.77px] text-[#333333]  ">
                {producto?.name}
            </p>
            <div className="mx-auto flex flex-col lg:flex-row justify-center items-center mt-2 lg:my-4 gap-3 lg:gap-8">
                {/* Image */}
                <div className="w-screen md:w-[562px] md:h-[562px] lg:w-[500.81px] lg:h-[500.81px]  2xl:w-[620.81px] 2xl:h-[620.81px] overflow-hidden md:order-none lg:order-1">
                    <img
                        src={`/api/items/media/${producto?.image}`}
                        alt={producto?.name}
                        className="w-9/12 aspect-square bg-gray-300 mx-auto md:w-[562px] md:h-[562px] lg:w-[500.81px] lg:h-[500.81px]  2xl:w-[620.81px] 2xl:h-[620.81px] object-cover rounded-lg"
                        loading="lazy"
                    />
                </div>
                {/* Product Details */}
                <div className="w-screen md:w-[562px] lg:h-[562px] lg:w-[350px] 2xl:w-[475px] text-[#333333] lg:flex lg:flex-col lg:justify-center">
                    <h3 className="hidden lg:block md:text-[44.38px] md:leading-[45.78px] 2xl:text-[54.38px] 2xl:leading-[58.78px] font-bold">
                        ¿Aún no estás segura?
                    </h3>
                    <p className="hidden lg:block md:text-[20px] 2xl:text-[29px] md:leading-[30px] 2xl:leading-[36px] mt-2 2xl:mt-4 ">
                        Prueba con el {producto?.name}
                    </p>
                    <p className="w-9/12 lg:w-full mx-auto text-[12.49px] xl:text-[11px] 2xl:text-[14.05px] lg:my-3 leading-4 lg:leading-relaxed whitespace-pre-line">
                        <img
                            src="/assets/img/emojis/blossom.png"
                            className="h-[15.05px] inline-flex me-1"
                        />
                        <span>{producto?.description}</span>
                        <img
                            src="/assets/img/emojis/crescent-moon.png"
                            className="h-[15.05px] inline-flex ms-1"
                        />
                        <img
                            src="/assets/img/emojis/sparkling-heart.png"
                            className="h-[15.05px] inline-flex ms-1"
                        />
                    </p>
                    <div className="hidden lg:flex md:w-[158.43px] 2xl:w-[155px] md:h-[20px] 2xl:h-[25px] bg-[#212529] text-white rounded-[5.44px] my-4  items-center justify-center">
                        {producto?.discount && (
                            <p className="w-[158.43px]   h-[25.55px]  bg-[#212529]  text-white rounded-[5.44px] my-4 flex items-center justify-center text-[10.88px]  leading-[21.75px]">
                                <img
                                    src="/assets/img/emojis/fire.png"
                                    className="h-[11.88px] inline-flex mr-2"
                                />{" "}
                                <span className="font-bold text-[10.88px] mr-1">
                                    AHORRA
                                </span>{" "}
                                S/{" "}
                                {Number(
                                    producto?.price - producto?.discount
                                ).toFixed(2)}{" "}
                                <img
                                    src="/assets/img/emojis/fire.png"
                                    className="h-[11.88px] inline-flex ml-2"
                                />
                            </p>
                        )}
                    </div>
                    <p className="hidden  lg:block md:text-[39.33px] 2xl:text-[49.33px] md:leading-[52.31px] 2xl:leading-[62.31px] tracking-[-0.01em] font-bold text-[#FC58BE]">
                        S/ {Number(producto?.final_price).toFixed(2)}
                    </p>
                    <p className="hidden lg:block md:text-[20.84px] 2xl:text-[24.84px] leading-[31.37px] text-[#B4B4B4]">
                        <del>Antes S/ {producto?.price}</del>
                    </p>

                    {/* Add to Cart Button */}
                    {/* Add to Cart Button */}
                    <div className="hidden lg:flex justify-center">
                        <button
                            onClick={async () => {
                                const result = await agregarAlCarrito({
                                    ...producto,
                                    quantity,
                                    selectedColor:
                                        producto.colors?.length > 0
                                            ? selectedColor
                                            : null,
                                    selectedSize:
                                        producto.sizes?.length > 0
                                            ? selectedSize
                                            : null,
                                });
                                if (result && result.success === false) {
                                    alert(result.message || 'No se pudo agregar al carrito por falta de stock.');
                                }
                            }}
                            className="mt-4 relative w-full sm:w-[332px] lg:w-full h-[59px] lg:h-[35.88px] 2xl:h-[39.88px] text-[17.02px] lg:text-[12.59px]  2xl:text-[13.59px] leading-[13.59px] bg-[#FC58BE] text-white rounded-[6px]  lg:rounded-[2.72px] border-[1.81px] border-[#FC58BE]  flex items-center justify-center"
                        >
                            <span className="">Añadir al carrito</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                                className="fill-white h-4 lg:h-3 absolute top-1/2 -translate-y-1/2 right-16 "
                            >
                                <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                            </svg>
                        </button>
                    </div>

                    <div className="lg:hidden   text-[#333333]">
                        <div className="w-9/12 my-2 lg:w-full mx-auto flex gap-3 lg:gap-4 lg:block items-center">
                            <p className="text-[29.42px] md:text-[50.42px] lg:text-[35.33px] 2xl:text-[49.33px] font-bold text-[#FC58BE]">
                                S/ {Number(producto?.final_price).toFixed(2)}
                            </p>
                            {producto?.discount && (
                                <p className="text-[15.39px] md:text-[25.39px] lg:text-[18.84px] 2xl:text-[24.84px] text-[#B4B4B4]">
                                    <del>Antes S/ {producto?.price}</del>
                                </p>
                            )}
                        </div>
                        <div className="w-9/12  mx-auto flex justify-center">
                            <button
                                onClick={async () => {
                                    const result = await agregarAlCarrito({
                                        ...producto,
                                        quantity,
                                        selectedColor:
                                            producto.colors?.length > 0
                                                ? selectedColor
                                                : null,
                                        selectedSize:
                                            producto.sizes?.length > 0
                                                ? selectedSize
                                                : null,
                                    });
                                    if (result && result.success === false) {
                                        alert(result.message || 'No se pudo agregar al carrito por falta de stock.');
                                    }
                                }}
                                className="lg:mt-4 relative w-[200px] lg:w-full h-[38px] lg:h-[35.88px] 2xl:h-[39.88px] text-[12.02px] lg:text-[12.59px]  2xl:text-[13.59px] leading-[13.59px] bg-[#FC58BE] text-white rounded-[6px]  lg:rounded-[2.72px] border-[1.81px] border-[#FC58BE]  flex items-center justify-center"
                            >
                                <span className="me-2">Añadir al carrito</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    className="fill-white h-3 lg:h-3 relative "
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

export default NotSureSection;
