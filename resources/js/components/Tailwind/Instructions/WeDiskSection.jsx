import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "../../../../css/Swiper/instructionScrollbar.css";

// import required modules
import { Scrollbar } from "swiper/modules";

const features = [
    {
        icon: "/assets/img/instructions/suave.png",
        text: "Suave y flexible",
    },
    {
        icon: "/assets/img/instructions/made-in.png",
        text: "Hecho de 100% silicona alemana de grado médico",
    },
    {
        icon: "/assets/img/instructions/antifugas.png",
        text: "Con aros antifugas",
    },
    {
        icon: "/assets/img/instructions/disk.png",
        text: "Base y colita ergonómica para hacer más fácil el retiro",
    },
    {
        icon: "/assets/img/instructions/protection.png",
        text: "Hasta 12 horas de protección",
    },
];

const steps = [
    "ANTES DE EMPEZAR",
    "DOBLAR TU DISCO",
    "PONER Y RETIRAR",
    "CUIDADO Y LIMPIEZA",
];

const sizes = [
    {
        size: "A",
        height: "6.7",
        width: "6",
        capacidad: "30",
        igual: "4",
    },
    {
        size: "B",
        height: "7.6",
        width: "6.5",
        capacidad: "50",
        igual: "6",
    },
];

const WeDiskSection = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <>
            <div className="px-[5%]  max-w-lg lg:max-w-5xl 2xl:max-w-[75rem] md:px-0 mx-auto py-8  md:mt-20 xl:mt-0 xl:py-0">
                <div className="flex xl:my-11 justify-center items-center gap-8 flex-col  lg:flex-row">
                    <div className="w-full lg:w-1/2 relative flex flex-col items-center justify-center h-max sm:h-[450px] md:h-[450px] 2xl:h-[520px] overflow-hidden">
                        <img
                            className="object-contain aspect-square inset-0 h-auto sm:h-[480.57px] lg:h-[470.57px] 2xl:h-[560.57px] w-[80%] mx-auto"
                            src="/assets/img/instructions/disco.png"
                            alt="weDisk"
                        />
                        <a href="" className="block">Manual de uso <i className="mdi mdi-download"></i></a>
                    </div>
                    <div className="bg-[#DDEC4C] flex flex-col items-center gap-4 w-full md:w-[520px] lg:w-[440px] 2xl:w-[540px] h-max rounded-[50px] md:rounded-[70px] lg:rounded-[40px] 2xl:rounded-[70px] font-poppins py-[10%] px-[10%] lg:py-10 lg:px-14">
                        <h2 className="font-bold xl:mb-2 text-5xl xl:text-6xl  2xl:text-7xl text-center">
                            weDisk
                        </h2>
                        <ul className="space-y-2 md:space-y-3 xl:space-y-4">
                            {features.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-3 text-base 2xl:text-2xl leading-[20px] md:leading-snug font-light"
                                >
                                    <img
                                        src={item.icon}
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
                <nav className="mb-8 mt-8 font-bebas">
                    <ul className="grid grid-cols-2 gap-6 lg:gap-0 lg:flex font-normal lg:font-semibold tracking-wide justify-between border-b text-[18px] md:text-[32.48px]">
                        {steps.map((step, index) => (
                            <li
                                key={index}
                                className={`px-4 pb-1 cursor-pointer ${index === activeStep
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
                    className={`${activeStep === 0 ? "grid" : "hidden"} grid-cols-1 lg:grid-cols-2 gap-8 lg:mb-12 px-8 lg:px-12 py-4 lg:py-8`}
                >
                    <div className="rounded-lg bg-text-pattern order-1 lg:order-none">
                        <video
                            autoPlay
                            loop
                            muted
                            className="lg:pt-0 w-full h-auto lg:w-[405px] lg:h-[405px] 2xl:w-[495px] 2xl:h-[495px] object-cover"
                        >
                            <source
                                src="/assets/img/instructions/wedisk/Disco-Paso1.mp4"
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
                                Esteriliza tu disco
                            </span>
                        </div>
                        <p className="text-[14px] md:text-[24px] lg:text-[18px] 2xl:text-[24px] leading-snug">
                            Antes de usar tu weDisk por primera vez,
                            desinféctalo en una olla o en tu shakerCup con agua
                            hirviendo durante 2:30 minutos.
                            <br />
                            Una vez que la usas, tendrás que repetir este paso
                            antes y al final de cada ciclo.
                        </p>
                    </div>
                </div>
                <div
                    className={`${activeStep === 1 ? "grid" : "hidden"
                        }  grid-cols-1  lg:grid-cols-2 gap-8 lg:mb-12 px-8 lg:px-12 py-4 lg:py-8`}
                >
                    <div className="rounded-lg bg-text-pattern order-1 lg:order-none">
                        <video
                            autoPlay
                            loop
                            muted
                            className=" lg:pt-0  w-full h-auto lg:w-[405px]  lg:h-[405px] 2xl:w-[495px] 2xl:h-[495px] object-cover"
                        >
                            <source
                                src="/assets/img/instructions/wedisk/Disco-Paso2.mp4"
                                type="video/mp4"
                            />
                            Tu navegador no soporta la reproducción de video.
                        </video>
                    </div>
                    <div className="flex flex-col justify-center">
                         <h2 className="text-[36px] md:text-[52.75px] lg:text-[42.75px] 2xl:text-[52.75px] leading-[42.73px] font-bold mb-4">
                            Paso 2:
                        </h2>
                        <div className="inline-block bg-[#DDEC4C] px-6 py-2 rounded-full mb-6 w-max">
                            <span className="text-[22.57px] md:text-[27.57px] lg:text-[20.57px] 2xl:text-[27.57px] leading-[30.88px]">
                                Haz tu doblez
                            </span>
                        </div>
                        <p className="text-[20px] md:text-[24px] lg:text-[18px] 2xl:text-[24px] leading-[33px]">
                            La forma correcta de doblar tu disco es en forma de
                            “8” que es juntar los dos pliegues del disco. Este
                            doblez es fácil de dominar gracias a su suave
                            material de silicona alemana, lo importante es que
                            encuentres cual es tu favorita y se acomoda a ti.
                        </p>
                    </div>
                </div>
                <div
                    className={`${activeStep === 2 ? "grid" : "hidden"
                        }  grid-cols-1  lg:grid-cols-2 gap-8 lg:mb-12 px-8 lg:px-12 py-4 lg:py-8`}
                >
                    <div className="rounded-lg bg-text-pattern order-1 lg:order-none">
                        <video
                            autoPlay
                            loop
                            muted
                            className=" lg:pt-0  w-full h-auto lg:w-[405px]  lg:h-[405px] 2xl:w-[495px] 2xl:h-[495px] object-cover"
                        >
                            <source
                                src="/assets/img/instructions/wedisk/Disco-Paso3.mp4"
                                type="video/mp4"
                            />
                            Tu navegador no soporta la reproducción de video.
                        </video>
                    </div>
                    <div className="flex flex-col justify-center">
                          <h2 className="text-[36px] md:text-[52.75px] lg:text-[42.75px] 2xl:text-[52.75px] leading-[42.73px] font-bold mb-4">
                            Paso 3:
                        </h2>
                        <div className="inline-block bg-[#DDEC4C] px-6 py-2 rounded-full mb-6 w-max">
                            <span className="text-[22.57px] md:text-[27.57px] lg:text-[20.57px] 2xl:text-[27.57px] leading-[30.88px]">
                                ¿Cómo insertar?
                            </span>
                        </div>
                        <p className="text-[20px] md:text-[24px] lg:text-[18px] 2xl:text-[24px] leading-[33px]">
                            Lávate las manos y ponte cómoda. Mientras estás
                            sentada en el inodoro o de pie con una pierna
                            levantada en la bañera. Respira profundamente,
                            relaja los músculos de tu suelo pélvico y ahora si
                            inserta el disco, este debe ir más arriba hasta el
                            hueso pélvico.
                        </p>
                    </div>
                </div>
                <div
                    className={`${activeStep === 3 ? "grid" : "hidden"
                        }  grid-cols-1  lg:grid-cols-2 gap-8 lg:mb-12 px-8 lg:px-12 py-4 lg:py-8`}
                >
                    <div className="rounded-lg bg-text-pattern order-1 lg:order-none">
                        <video
                            autoPlay
                            loop
                            muted
                            className=" lg:pt-0  w-full h-auto lg:w-[405px]  lg:h-[405px] 2xl:w-[495px] 2xl:h-[495px] object-cover"
                        >
                            <source
                                src="/assets/img/instructions/wedisk/Disco-Paso4.mp4"
                                type="video/mp4"
                            />
                            Tu navegador no soporta la reproducción de video.
                        </video>
                    </div>
                    <div className="flex flex-col justify-center">
                         <h2 className="text-[36px] md:text-[52.75px] lg:text-[42.75px] 2xl:text-[52.75px] leading-[42.73px] font-bold mb-4">
                            Paso 4:
                        </h2>
                        <div className="inline-block bg-[#DDEC4C] px-6 py-2 rounded-full mb-6 w-max">
                            <span className="text-[22.57px] md:text-[27.57px] lg:text-[20.57px] 2xl:text-[27.57px] leading-[30.88px]">
                                Lava tus manos y tu disco
                            </span>
                        </div>
                        <p className="text-[20px] md:text-[24px] lg:text-[18px] 2xl:text-[24px] leading-[33px]">
                            Antes de insertarla y después de retirarla, lava tu
                            weDisk con un jabón suave, sin fragancias
                            artificiales, de preferencia de PH neutro. y
                            recuerda no necesitas esterilizar cada vez que la
                            usas en el ciclo, sino solo al empezar y terminar tu
                            periodo, para guardarla limpia y seca.
                        </p>
                    </div>
                </div>
                {/*SIZES */}
                <div class="hidden lg:flex items-center justify-center gap-52 mt-24">
                    {sizes.map((zise, index) => (
                        <div
                            className="text-center hover:scale-105 transition-all duration-300"
                            key={index}
                        >
                            {/*8cm * 4cm */}
                            <div class=" flex items-center justify-center">
                                <div className="relative h-[290px]">
                                    <div className="h-[290px]  ">
                                        <img
                                            src="/assets/img/instructions/disk-item-size.png"
                                            alt={`Talla ${zise.zise}`}
                                            class="h-full w-auto rotate-[-20deg]"
                                        />
                                    </div>

                                    {/* Línea y anotación de altura */}
                                    <div className="absolute left-[-70px] 2xl:left-[-80px]  top-0 h-full flex items-center">
                                        <span className="mr-2 2xl:w-[60px] font-bebas text-[23.61px] 2xl:text-[28.61px]">
                                            {zise.height} CM
                                        </span>
                                        {/* Triángulo superior */}
                                        <div className="absolute top-6 left-[55px] 2xl:left-[66px]  border-b-[5px] border-l-[5px] border-b-[#000000] border-l-transparent rotate-45"></div>
                                        <div className="h-[80%] border-l border-[#000000]"></div>
                                        {/* Triángulo inferior */}
                                        <div className="absolute bottom-6 left-[55px] 2xl:left-[66px]  border-t-[5px] border-l-[5px] border-t-[#000000] border-l-transparent -rotate-45"></div>
                                    </div>

                                    {/* Línea y anotación de ancho */}
                                    <div className="absolute top-[10px] left-0 w-full flex justify-center">
                                        <span className="absolute bottom-[2px] font-bebas text-[23.61px] 2xl:text-[28.61px]">
                                            {zise.width} CM
                                        </span>
                                        {/* Triángulo izquierdo */}
                                        <div className="absolute left-10 top-[-2px] border-r-[5px] border-b-[5px] border-r-[#000000] border-b-transparent rotate-45"></div>
                                        <div className="w-[70%] border-t border-[#000000]"></div>
                                        {/* Triángulo derecho */}
                                        <div className="absolute right-10 top-[-2px] border-l-[5px] border-b-[5px] border-l-[#000000] border-b-transparent -rotate-45"></div>
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
                                    <div className="relative h-[260px]">
                                        <div className="h-[220px] md:h-[240px]  ">
                                            <img
                                                src="/assets/img/instructions/disk-item-size.png"
                                                alt={`Talla ${zise.zise}`}
                                                class="h-full w-auto rotate-[-10deg]"
                                            />
                                        </div>

                                        {/* Línea y anotación de altura */}
                                        <div className="absolute left-[-50px]  md:left-[-80px] 2xl:left-[-80px]  top-0 h-full flex items-center">
                                            <span className="mr-2 2xl:w-[60px] font-bebas text-[23.61px] 2xl:text-[28.61px]">
                                                {zise.height} CM
                                            </span>
                                            {/* Triángulo superior */}
                                            <div className="absolute top-5 left-[54px] 2xl:left-[66px]  border-b-[5px] border-l-[5px] border-b-[#000000] border-l-transparent rotate-45"></div>
                                            <div className="h-[80%] border-l border-[#000000]"></div>
                                            {/* Triángulo inferior */}
                                            <div className="absolute bottom-6 left-[54px] 2xl:left-[66px]  border-t-[5px] border-l-[5px] border-t-[#000000] border-l-transparent -rotate-45"></div>
                                        </div>

                                        {/* Línea y anotación de ancho */}
                                        <div className="absolute top-[10px] left-0 w-full flex justify-center">
                                            <span className="absolute bottom-[2px] font-bebas text-[23.61px] 2xl:text-[28.61px]">
                                                {zise.width} CM
                                            </span>
                                            {/* Triángulo izquierdo */}
                                            <div className="absolute left-7 top-[-2px] border-r-[5px] border-b-[5px] border-r-[#000000] border-b-transparent rotate-45"></div>
                                            <div className="w-[70%] border-t border-[#000000]"></div>
                                            {/* Triángulo derecho */}
                                            <div className="absolute right-7 top-[-2px] border-l-[5px] border-b-[5px] border-l-[#000000] border-b-transparent -rotate-45"></div>
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

export default WeDiskSection;
