import React, { useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "../../../../css/Swiper/instructionScrollbar.css";

// import required modules
import { Scrollbar } from "swiper/modules";
const WeCupSection = () => {
    const steps = [
        "ANTES DE EMPEZAR",
        "DOBLAR TU COPA",
        "PONER Y RETIRAR",
        "CUIDADO Y LIMPIEZA",
    ];
    const [activeStep, setActiveStep] = useState(0);

    const sizes = [
        {
            size: "Z",
            height: "5.8",
            width: "4",
            capacidad: "18",
            igual: "2",
        },
        {
            size: "A",
            height: "6.4",
            width: "4.3",
            capacidad: "25",
            igual: "3",
        },
        {
            size: "B",
            height: "6.7",
            width: "4.7",
            capacidad: "30",
            igual: "4",
        },
    ];
    return (
        <>
            <div className="px-[5%]  max-w-lg lg:max-w-5xl 2xl:max-w-[75rem] md:px-0 mx-auto py-8  md:mt-20 xl:mt-0 xl:py-0">
                <div className="flex xl:my-11 justify-center items-center gap-8 flex-col  lg:flex-row">
                    <div className="w-full lg:w-1/2 relative flex flex-col items-center justify-center  h-max sm:h-[450px]  md:h-[450px]  2xl:h-[520px]  overflow-hidden">
                        {/* <div className="text-[#EFEDF8] text-[100.92px]  md:text-[140.92px] lg:text-[120.92px] 2xl:text-[150.92px] leading-[100.24px] md:leading-[130.24px] lg:leading-[110.24px] 2xl:leading-[132.24px] font-bold space-y-1">
                            <p>weCup</p>
                            <p>weCup</p>
                            <p>weCup</p>
                        </div> */}
                        <img
                            className=" object-contain aspect-square inset-0 h-auto sm:h-[480.57px] lg:h-[470.57px] 2xl:h-[560.57px] w-[80%] mx-auto"
                            src="/assets/img/instructions/copa.png"
                            alt="weCup"
                        />
                        <a href="" className="block">Manual de uso <i className="mdi mdi-download"></i></a>
                    </div>

                    <div className="bg-[#DDEC4C] flex flex-col items-center gap-4 w-full md:w-[520px] lg:w-[440px] 2xl:w-[540px] h-max  rounded-[50px]  md:rounded-[70px] lg:rounded-[40px] 2xl:rounded-[70px] font-poppins py-[10%] px-[10%] lg:py-10 lg:px-14">
                        <h2 className="font-bold xl:mb-2 text-5xl xl:text-6xl  2xl:text-7xl text-center">
                            weCup
                        </h2>
                        {/* <a href="" className="hidden md:block">Manual de uso <i className="mdi mdi-download"></i></a> */}
                        <ul className="space-y-2 md:space-y-3 xl:space-y-4 ">
                            {[
                                {
                                    text: "Suave y flexible",
                                    img: "/assets/img/instructions/suave.png",
                                },
                                {
                                    text: "Hecho de 100% silicona alemana de grado médico",
                                    img: "/assets/img/instructions/made-in.png",
                                },
                                {
                                    text: "Con aros antifugas",
                                    img: "/assets/img/instructions/antifugas.png",
                                },
                                {
                                    text: "Base y colita ergonómica para hacer más fácil el retiro",
                                    img: "/assets/img/instructions/cup.png",
                                },
                                {
                                    text: "Hasta 12 horas de protección",
                                    img: "/assets/img/instructions/protection.png",
                                },
                            ].map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-3 text-base 2xl:text-2xl leading-[20px] md:leading-snug font-light"
                                >
                                    <img
                                        src={item.img}
                                        className={`w-[25px] xl:w-[32px] 2xl:w-[41px] h-auto flex items-center justify-center brightness-100 grayscale`}
                                        alt={item.text}
                                        loading="lazy"
                                    />
                                    {item.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <nav className="mb-8 mt-8  font-bebas">
                    <ul className="grid grid-cols-2 gap-6 lg:gap-0 lg:flex font-normal lg:font-semibold tracking-wide justify-between border-b text-[18px] md:text-[32.48px]">
                        {steps.map((step, index) => (
                            <li
                                key={index}
                                className={`px-4 pb-1 cursor-pointer text-nowrap ${index === activeStep
                                        ? "text-[#5F48B7] border-b-4 border-[#5F48B7]"
                                        : "text-[#D5D0EA]"
                                    }`}
                                onClick={() => setActiveStep(index)}
                            >
                                {step}
                            </li>
                        ))}
                    </ul>
                </nav>
                <div
                    className={`${activeStep === 0 ? "grid" : "hidden"
                        } grid-cols-1  lg:grid-cols-2 gap-8 lg:mb-12 px-8 lg:px-12 py-4 lg:py-8`}
                >
                    <div className="rounded-lg bg-text-pattern order-1 lg:order-none">
                        <video
                            autoPlay
                            loop
                            muted
                            className=" lg:pt-0  w-full h-auto lg:w-[405px]  lg:h-[405px] 2xl:w-[495px] 2xl:h-[495px] object-cover"
                        >
                            <source
                                src="/assets/img/instructions/wecup/Copa-Paso1.mp4"
                                type="video/mp4"
                            />
                            Tu navegador no soporta la reproducción de video.
                        </video>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-[36px] md:text-[52.75px] lg:text-[42.75px] 2xl:text-[52.75px] leading-[42.73px] font-bold mb-4">
                            Paso 1:
                        </h2>
                        <div className="inline-block bg-[#DDEC4C] px-4 py-1 rounded-full mb-6 w-max">
                            <span className="text-[16px] md:text-[27.57px] lg:text-[20.57px] 2xl:text-[27.57px] leading-[30.88px]">
                                Esteriliza tu copa
                            </span>
                        </div>
                        <p className="text-[14px] md:text-[24px] lg:text-[18px] 2xl:text-[24px] leading-snug">
                            Antes de usar tu weCup por primera vez, desinféctala
                            en una olla o en tu shakerCup con agua hirviendo
                            durante 2:30 minutos.
                            <br /> Una vez que la usas, tendrás que repetir este
                            paso antes y al final de cada ciclo.
                        </p>
                    </div>
                </div>
                <div
                    className={`${activeStep === 1 ? "grid" : "hidden"
                        } grid-cols-1  lg:grid-cols-2 gap-8 lg:mb-12 px-8 lg:px-12 py-4 lg:py-8`}
                >
                    <div className="rounded-lg bg-text-pattern order-1 lg:order-none">
                        <video
                            autoPlay
                            loop
                            muted
                            className=" lg:pt-0  w-full h-auto lg:w-[405px]  lg:h-[405px] 2xl:w-[495px] 2xl:h-[495px] object-cover"
                        >
                            <source
                                src="/assets/img/instructions/wecup/Copa-Paso2.mp4"
                                type="video/mp4"
                            />
                            Tu navegador no soporta la reproducción de video.
                        </video>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-[36px] md:text-[52.75px] lg:text-[42.75px] 2xl:text-[52.75px] leading-[42.73px] font-bold mb-4">
                            Paso 2:
                        </h2>
                        <div className="inline-block bg-[#DDEC4C] px-4 py-1 rounded-full mb-6 w-max">
                            <span className="text-[16px] md:text-[27.57px] lg:text-[20.57px] 2xl:text-[27.57px] leading-[30.88px]">
                                Elije tu doblez
                            </span>
                        </div>
                        <p className="text-[14px] md:text-[24px] lg:text-[18px] 2xl:text-[24px] leading-snug">
                            Hay muchas formas de doblar tu copa menstrual: con
                            pliegue en U y con pliegue hacia abajo. Ambos son
                            fáciles de dominar y adecuados para principiantes,
                            lo importante es que encuentres cual es tu favorita
                            y se acomoda a ti.
                        </p>
                    </div>
                </div>
                <div
                    className={`${activeStep === 2 ? "grid" : "hidden"
                        } grid-cols-1  lg:grid-cols-2 gap-8 lg:mb-12 px-8 lg:px-12 py-4 lg:py-8`}
                >
                    <div className="rounded-lg bg-text-pattern order-1 lg:order-none">
                        <img
                            src="/assets/img/instructions/wecup/Copa-Paso3.webp"
                            className=" lg:pt-0  w-full h-auto lg:w-[405px]  lg:h-[405px] 2xl:w-[495px] 2xl:h-[495px] object-cover"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-[36px] md:text-[52.75px] lg:text-[42.75px] 2xl:text-[52.75px] leading-[42.73px] font-bold mb-4">
                            Paso 3:
                        </h2>
                        <div className="inline-block bg-[#DDEC4C] px-4 py-1 rounded-full mb-6 w-max">
                            <span className="text-[16px] md:text-[27.57px] lg:text-[20.57px] 2xl:text-[27.57px] leading-[30.88px]">
                                ¿Cómo insertar?
                            </span>
                        </div>
                        <p className="text-[14px] md:text-[24px] lg:text-[18px] 2xl:text-[24px] leading-snug">
                            Lávate las manos y ponte cómoda. Mientras estás
                            sentada en el inodoro o de pie con una pierna
                            levantada en la bañera, separa suavemente tus labios
                            vaginales con la mano libre. Respira profundamente,
                            relaja los músculos de tu suelo pélvico y ahora si
                            inserta la copa.
                        </p>
                    </div>
                </div>
                <div
                    className={`${activeStep === 3 ? "grid" : "hidden"
                        } grid-cols-1  lg:grid-cols-2 gap-8 lg:mb-12 px-8 lg:px-12 py-4 lg:py-8`}
                >
                    <div className="rounded-lg bg-text-pattern order-1 lg:order-none">
                        <video
                            autoPlay
                            loop
                            muted
                            className=" lg:pt-0  w-full h-auto lg:w-[405px]  lg:h-[405px] 2xl:w-[495px] 2xl:h-[495px] object-cover"
                        >
                            <source
                                src="/assets/img/instructions/wecup/Copa-Paso4.mp4"
                                type="video/mp4"
                            />
                            Tu navegador no soporta la reproducción de video.
                        </video>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-[36px] md:text-[52.75px] lg:text-[42.75px] 2xl:text-[52.75px] leading-[42.73px] font-bold mb-4">
                            Paso 4:
                        </h2>
                        <div className="inline-block bg-[#DDEC4C] px-4 py-1 rounded-full mb-6 w-max">
                            <span className="text-[16px] md:text-[27.57px] lg:text-[20.57px] 2xl:text-[27.57px] leading-[30.88px]">
                                Lava tus manos y tu copa
                            </span>
                        </div>
                        <p className="text-[14px] md:text-[24px] lg:text-[18px] 2xl:text-[24px] leading-snug">
                            Antes de insertarla y después de retirarla, lava tu
                            weCup con un jabón suave, sin fragancias
                            artificiales, de preferencia de PH neutro. y
                            recuerda no necesitas esterilizar cada vez que la
                            usas en el ciclo, sino solo al empezar y terminar tu
                            periodo, para guardarla limpia y seca.
                        </p>
                    </div>
                </div>
                {/*TAMAÑOS */}
                <div class="hidden lg:grid grid-cols-3 gap-8 mt-24">
                    {sizes.map((zise, index) => (
                        <div
                            className="text-center hover:scale-105 transition-all duration-300"
                            key={index}
                        >
                            {/*8cm * 4cm */}
                            <div class=" flex items-center justify-center">
                                <div className="relative h-[200px]">
                                    <div className="h-[200px]  overflow-hidden">
                                        <img
                                            src="/assets/img/instructions/cup-item-size.png"
                                            alt={`Talla ${zise.zise}`}
                                            class="h-full w-auto"
                                        />
                                    </div>

                                    {/* Línea y anotación de altura */}
                                    <div className="absolute left-[-70px] 2xl:left-[-80px]  top-0 h-full flex items-center">
                                        <span className="mr-2 2xl:w-[60px] font-bebas text-[23.61px] 2xl:text-[28.61px]">
                                            {zise.height} CM
                                        </span>
                                        {/* Triángulo superior */}
                                        <div className="absolute top-0 left-[55px] 2xl:left-[66px]  border-b-[5px] border-l-[5px] border-b-[#000000] border-l-transparent rotate-45"></div>
                                        <div className="h-[96%] border-l border-[#000000]"></div>
                                        {/* Triángulo inferior */}
                                        <div className="absolute bottom-0 left-[55px] 2xl:left-[66px]  border-t-[5px] border-l-[5px] border-t-[#000000] border-l-transparent -rotate-45"></div>
                                    </div>

                                    {/* Línea y anotación de ancho */}
                                    <div className="absolute top-[-10px] left-0 w-full flex justify-center">
                                        <span className="absolute bottom-[2px] font-bebas text-[23.61px] 2xl:text-[28.61px]">
                                            {zise.width} CM
                                        </span>
                                        {/* Triángulo izquierdo */}
                                        <div className="absolute left-0 top-[-2px] border-r-[5px] border-b-[5px] border-r-[#000000] border-b-transparent rotate-45"></div>
                                        <div className="w-[90%] border-t border-[#000000]"></div>
                                        {/* Triángulo derecho */}
                                        <div className="absolute right-0 top-[-2px] border-l-[5px] border-b-[5px] border-l-[#000000] border-b-transparent -rotate-45"></div>
                                    </div>
                                </div>
                            </div>
                            <h3 class="md:text-[35px]  2xl:text-[45px] font-bold  mt-4">
                                Talla {zise.size}
                            </h3>
                            <p class="md:text-[18px] 2xl:text-[22px] leading-[20.98px] font-light">
                                Capacidad {zise.capacidad}ml
                                <br />
                                igual a {zise.igual} tampones
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="px-[5%] md:px-0 w-full md:pl-16 lg:hidden py-4  ">
                <Swiper
                    scrollbar={{
                        hide: false,
                        draggable: true,
                    }}
                    modules={[Scrollbar]}
                    slidesPerView={1.5}
                    spaceBetween={0}
                    loop={true}
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 0 },
                        640: { slidesPerView: 1.5, spaceBetween: 0 },
                    }}
                >
                    {sizes.map((zise, index) => (
                        <SwiperSlide key={index}>
                            <div className="text-center py-14 mb-4  h-[500px]  transition-all duration-300">
                                {/*8cm * 4cm */}
                                <div class=" flex items-center justify-center">
                                    <div className="relative h-[250px] lg:h-[300px]">
                                        <div className="h-[250px] lg:h-[300px]  overflow-hidden">
                                            <img
                                                src="/assets/img/instructions/cup-item-size.png"
                                                alt={`Talla ${zise.zise}`}
                                                class="h-full w-auto"
                                            />
                                        </div>

                                        {/* Línea y anotación de altura */}
                                        <div className="absolute left-[-70px] 2xl:left-[-80px]  top-0 h-full flex items-center">
                                            <span className="mr-2 2xl:w-[60px] font-bebas text-[23.61px] 2xl:text-[28.61px]">
                                                {zise.height} CM
                                            </span>
                                            {/* Triángulo superior */}
                                            <div className="absolute top-0 left-[55px] 2xl:left-[66px]  border-b-[5px] border-l-[5px] border-b-[#000000] border-l-transparent rotate-45"></div>
                                            <div className="h-[96%] border-l border-[#000000]"></div>
                                            {/* Triángulo inferior */}
                                            <div className="absolute bottom-0 left-[55px] 2xl:left-[66px]  border-t-[5px] border-l-[5px] border-t-[#000000] border-l-transparent -rotate-45"></div>
                                        </div>

                                        {/* Línea y anotación de ancho */}
                                        <div className="absolute top-[-10px] left-0 w-full flex justify-center">
                                            <span className="absolute bottom-[2px] font-bebas text-[23.61px] 2xl:text-[28.61px]">
                                                {zise.width} CM
                                            </span>
                                            {/* Triángulo izquierdo */}
                                            <div className="absolute left-0 top-[-2px] border-r-[5px] border-b-[5px] border-r-[#000000] border-b-transparent rotate-45"></div>
                                            <div className="w-[90%] border-t border-[#000000]"></div>
                                            {/* Triángulo derecho */}
                                            <div className="absolute right-0 top-[-2px] border-l-[5px] border-b-[5px] border-l-[#000000] border-b-transparent -rotate-45"></div>
                                        </div>
                                    </div>
                                </div>
                                <h3 class="text-[35px]  2xl:text-[45px] font-bold  mt-4">
                                    Talla {zise.size}
                                </h3>
                                <p class="text-[18px] 2xl:text-[22px] leading-[20.98px] font-light">
                                    Capacidad {zise.capacidad}ml
                                    <br />
                                    igual a {zise.igual} tampones
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default WeCupSection;
