import React, { useContext, useEffect, useState } from "react";
import { CarritoContext } from "../../../context/CarritoContext";
const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: "00",
        minutes: "00",
        seconds: "00",
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            // Calcular diferencia
            const difference = tomorrow - now;
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            return {
                hours: hours.toString().padStart(2, "0"),
                minutes: minutes.toString().padStart(2, "0"),
                seconds: seconds.toString().padStart(2, "0"),
            };
        };

        // Actualizar inmediatamente
        setTimeLeft(calculateTimeLeft());

        // Configurar intervalo para actualizar cada segundo
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Limpiar intervalo al desmontar
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute top-8 mx-auto font-bold flex items-center justify-center bg-[#FF9900] text-white md:text-[17px] 2xl:text-[20.85px] px-20 py-1 w-max rounded-full">
            Solo por {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}
        </div>
    );
};

const TopSaleSection = ({ producto }) => {
    const [isModalTalla, setIsModalTalla] = useState(false);

    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(
        producto.colors.length > 0 ? producto.colors[0].name : ""
    );

    const [selectedSize, setSelectedSize] = useState(
        producto.sizes.length > 0 ? producto.sizes[0].name : ""
    );
    const changeQuantity = (amount) => {
        setQuantity((prev) => Math.max(1, prev + amount));
    };

    const { agregarAlCarrito } = useContext(CarritoContext);
    const [isModalAd, setIsModalAd] = useState(false);
    const [mainImage, setMainImage] = useState(producto.colors[0]?.image);

    return (
        <section className="py-2 md:py-10 lg:mb-8 px-[5%] mx-auto font-poppins bg-white">
            <h2 className=" text-[20.25px]   md:text-[30.25px] 2xl:text-[36.25px] leading-[29.36px] font-bold text-[#212529] mt-7 mb-3 md:mb-10 lg:mb-14 text-center flex gap-2 items-center justify-center">
                <img src="/assets/img/emojis/fire.png" className="h-5 md:h-8" />{" "}
                El más vendido{" "}
                <img src="/assets/img/emojis/fire.png" className="h-5 md:h-8" />
            </h2>
            <div className="  mx-auto flex flex-col lg:flex-row justify-center items-center my-0 md:my-4 gap-4 lg:gap-8">
                {/* Image */}
                <div className=" w-screen md:w-[644px] md:h-[644px] lg:w-[500.81px] lg:h-[500.81px] 2xl:w-[620.81px] 2xl:h-[620.81px] overflow-hidden">
                    <img
                        src={`/api/items/media/${mainImage}`}
                        alt={producto.name}
                        className="w-9/12 mx-auto md:w-[644px] md:h-[644px] lg:w-[500.81px] lg:h-[500.81px] 2xl:w-[620.81px] 2xl:h-[620.81px] object-cover rounded-lg"
                        loading="lazy"
                    />
                </div>
                {/* Product Details */}
                <div className="w-screen  md:w-[644px] lg:w-[350px] 2xl:w-[475px] text-[#333333]">
                    <div className=" w-9/12 lg:w-full mx-auto flex lg:block items-center justify-between gap-4">
                        <h3 className="text-[28px] leading-[30.78px] lg:mb-2 md:text-[55.58px] lg:text-[40.38px] 2xl:text-[54.38px] font-bold lg:leading-[40.78px]">
                            {producto.name}
                        </h3>
                        <p className="text-[15px] md:text-[31.5px] text-center lg:text-start lg:text-[16.81px] 2xl:text-[30.81px]  font-normal inline-flex ">
                            ({producto.summary})
                        </p>
                    </div>
                    <div className="block w-9/12 lg:w-full mx-auto text-[12.36px] md:text-[14.36px] lg:text-[11px] 2xl:text-[14.05px] mt-2 leading-relaxed ">
                        <img
                            src="/assets/img/emojis/blossom.png"
                            className="h-[15.05px] inline-flex me-1"
                        />{" "}
                        {producto.description}
                        <img
                            src="/assets/img/emojis/crescent-moon.png"
                            className="h-[15.05px] inline-flex ms-1"
                        />
                        <img
                            src="/assets/img/emojis/sparkling-heart.png"
                            className="h-[15.05px] inline-flex ms-1"
                        />
                    </div>
                    <div className="w-9/12 lg:w-full mx-auto">
                        <div className=" w-max 2xl:w-[155px] h-[20px] 2xl:h-[25px] bg-[#212529] text-white rounded-[5.44px] my-2 lg:my-4 flex items-center justify-center">
                            {producto.discount && (
                                <p className=" px-2   h-[20.55px]  bg-[#212529]  text-white rounded-[5.44px] my-4 flex items-center justify-center text-[9.88px]  leading-[21.75px]">
                                    <img
                                        src="/assets/img/emojis/fire.png"
                                        className="h-[11.88px] inline-flex me-2 lg:mr-2"
                                    />{" "}
                                    <span className="font-bold mr-1">
                                        AHORRA
                                    </span>{" "}
                                    <span className="text-nowrap font-bold">
                                        S/{" "}
                                        {Number(
                                            producto.price - producto.discount
                                        ).toFixed(2)}{" "}
                                    </span>
                                    <img
                                        src="/assets/img/emojis/fire.png"
                                        className="h-[11.88px] inline-flex ms-2 lg:ml-2"
                                    />
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="w-9/12 lg:w-full mx-auto flex gap-2 lg:gap-4 lg:block items-center">
                        <p className="text-[27.42px] md:text-[50.42px] lg:text-[35.33px] 2xl:text-[49.33px] font-bold text-[#FC58BE]">
                            S/ {Number(producto.final_price).toFixed(2)}
                        </p>
                        {producto.discount && (
                            <p className="text-[13px] md:text-[25.39px] lg:text-[18.84px] 2xl:text-[24.84px] text-[#B4B4B4]">
                                <del>Antes S/ {producto.price}</del>
                            </p>
                        )}
                    </div>
                    {/* score  */}
                    <div className="hidden lg:block">
                        {producto.score > 4 && (
                            <div className="flex items-center mt-2 text-[#FF9900] gap-1 text-base">
                                {Array.from({ length: producto.score }).map(
                                    (_, index) => (
                                        <img
                                            key={index}
                                            src="/assets/img/emojis/star-score.png"
                                            className="h-[19px] inline-flex"
                                            alt="star"
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    {/* Color Selector */}
                    <div className="w-9/12 lg:w-full mx-auto relative flex justify-between sm:justify-start gap-4 lg:gap-0 lg:justify-between items-center  lg:my-2">
                        {producto.colors.length > 0 && (
                            <div className="flex items-center gap-2">
                                <p className="text-[11.05px] lg:text-[11px] 2xl:text-[14.05px] font-bold">
                                    Color:
                                </p>
                                <div className="flex items-center gap-2">
                                    {producto.colors.map((color, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setSelectedColor(color.name);
                                                setMainImage(color.image);
                                            }}
                                            className={`rounded-full p-[2px] lg:p-1 border ${selectedColor === color.name
                                                    ? "border-[#222222]"
                                                    : "border-[#DDDDDD]"
                                                }`}
                                        >
                                            <div
                                                className="w-[12px] h-[12px]   lg:w-[22px] lg:h-[22px] rounded-full "
                                                style={{
                                                    backgroundColor: `${color.summary}`,
                                                }}
                                            ></div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {producto.sizes.length > 0 && (
                            <div className="lg:absolute right-0 lg:top-1/2  ">
                                <button
                                    onClick={() =>
                                        setIsModalTalla(!isModalTalla)
                                    }
                                    className="inline-flex md:gap-2 2xl:gap-0 items-center justify-center px-3 h-[24.02px] lg:h-[34.02px] font-medium text-[10.05px] lg:text-[12.05px] 2xl:text-[15.57px] leading-[15.95px] bg-[#5F48B7] text-white rounded-[8.51px]"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-3 lg:h-5 fill-white mr-2"
                                        viewBox="0 0 640 512"
                                    >
                                        <path
                                            d="M0 336c0 26.5 21.5 48 48 48l544 0c26.5 0 48-21.5
                48-48l0-160c0-26.5-21.5-48-48-48l-64 0 0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80-64 0 0 80c0
                8.8-7.2 16-16 16s-16-7.2-16-16l0-80-64 0 0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80-64 0 0 80c0
                8.8-7.2 16-16 16s-16-7.2-16-16l0-80-64 0 0 80c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-80-64 0c-26.5
                0-48 21.5-48 48L0 336z"
                                        />
                                    </svg>
                                    ¿Cuál es mi talla?
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="w-9/12 lg:w-full mx-auto">
                        {producto.sizes.length > 0 && (
                            <div className=" flex gap-4 lg:block items-end">
                                {/* Size Selector */}
                                <div className=" w-full md:w-1/2 lg:w-full mb-4 2xl:mb-6">
                                    <label className="text-[11.05px] lg:text-[11px] 2xl:text-[14.05px] font-bold">
                                        Selecciona tu talla:
                                    </label>
                                    <select
                                        className="w-full lg:h-[40.94px] 2xl:h-[48.94px]  text-xs py-2 lg:text-base font-medium px-4 bg-[#EFEDF8] rounded-[5.44px]  outline-none ring-0 border-0 cursor-pointer focus:outline-none"
                                        value={selectedSize}
                                        onChange={(e) =>
                                            setSelectedSize(e.target.value)
                                        }
                                    >
                                        {producto.sizes.map((size) => {
                                            return (
                                                <option
                                                    key={size.id}
                                                    value={size.name}
                                                    className="text-[#000000]"
                                                >
                                                    {`Talla ${size.name}`}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                {/* Quantity Selector */}
                                <div className=" w-full md:w-1/2 lg:w-full mb-4 2xl:mb-6">
                                    <div className="text-xs lg:text-base flex py-2.5 lg:h-[40.94px] text-[#000000]  bg-[#EFEDF8] items-center justify-around  rounded-[5.44px] ">
                                        <button
                                            onClick={() => changeQuantity(-1)}
                                            className="w-8 h-full text-[#444444]"
                                        >
                                            -
                                        </button>
                                        <span className="text-xs md:text-base 2xl:text-xl font-medium">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => changeQuantity(1)}
                                            className="w-8 h-full text-[#444444]"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Add to Cart Button */}
                    <div className="w-9/12 lg:w-full mx-auto flex justify-center">
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
                                    return;
                                }
                                // Si tiene ad y offer_item, mostrar modal de oferta
                                if (producto.ad && producto.ad.offer_item) {
                                    setIsModalAd(true);
                                }
                            }}
                            className="lg:mt-4 relative w-[250px] lg:w-full h-[39px] lg:h-[35.88px] 2xl:h-[39.88px] text-[13.02px] lg:text-[12.59px]  2xl:text-[13.59px] leading-[13.59px] bg-[#FC58BE] text-white rounded-[6px]  lg:rounded-[2.72px] border-[1.81px] border-[#FC58BE]  flex items-center justify-center"
                        >
                            <span className="me-2">Añadir al carrito</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                                className="fill-white h-3 lg:h-3 relative lg:absolute  lg:top-1/2 lg:-translate-y-1/2  lg:right-16 "
                            >
                                <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                            </svg>
                        </button>
                        {/* Modal de oferta especial (Ad) */}
                        {isModalAd && producto.ad && producto.ad.offer_item && (
                            <div
                                className="fixed inset-0 flex items-center justify-center z-50 bg-[#00000080]"
                                style={{ backdropFilter: "blur(10px)" }}
                            >
                                <div className="relative flex items-center justify-center">
                                    <button
                                        className="absolute top-5 right-8 text-3xl text-[#9577B9]"
                                        onClick={() => setIsModalAd(false)}
                                    >
                                        ×
                                    </button>
                                    <div className="bg-white rounded-[30.58px]  2xl:rounded-[48.58px] md:w-[459px] md:h-[450.40px] 2xl:w-[519px] 2xl:h-[505.40px] flex flex-col items-center justify-center ">
                                        <CountdownTimer
                                            startDate={producto.ad.dete_begin}
                                            endDate={producto.ad.date_end}
                                        />
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={`/api/ads/media/${producto.ad.image}`}
                                                alt="Ad"
                                                className="w-full h-full object-cover rounded-[30.58px] 2xl:rounded-[48.58px] cursor-pointer"
                                                onClick={async () => {
                                                    // Agregar producto de oferta al carrito usando los datos completos
                                                    if (!producto.ad.offer_item) return;
                                                    await agregarAlCarrito({
                                                        ...producto.ad.offer_item,
                                                        id: producto.ad.offer_item.id,
                                                        quantity: 1,
                                                        price: producto.ad.offer_price ?? producto.ad.offer_item.final_price ?? producto.ad.offer_item.price,
                                                        // Puedes agregar lógica para variantes si es necesario
                                                    });
                                                    // Ya no se guarda flag, siempre debe aparecer el modal de oferta
                                                    setIsModalAd(false);
                                                }}
                                            />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isModalTalla && (
                <div
                    className="fixed inset-0 min-h-screen flex items-center justify-center z-50 bg-[#00000080] transition-all duration-1000"
                    style={{ backdropFilter: "blur(10px)" }}
                >
                    <div
                        className="bg-white rounded-[30.58px] w-[319px] h-[320.40px]  md:w-[519px] md:h-[520.40px] lg:w-[419px] lg:h-[420.40px]  2xl:w-[519px] 2xl:h-[520.40px] z-10  p-8 relative"
                        style={{
                            backgroundImage:
                                "url(/assets/img/multiple/mi-talla.png)",
                            backgroundSize: "cover",
                        }}
                    >
                        <button
                            className="absolute z-50 top-4 right-4 text-3xl text-[#9577B9]"
                            onClick={() => setIsModalTalla(false)}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TopSaleSection;
