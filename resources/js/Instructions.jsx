import React from "react";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";

import Header from "./components/Tailwind/Header";
import FeaturesSection from "./components/Tailwind/Welcome/FeaturesSection";
import BenefitsSection from "./components/Tailwind/Welcome/BenefitsSection";
import ProductCarousel from "./components/Tailwind/Products/ProductCarousel";
import QuizSection from "./components/Tailwind/Welcome/QuizSection";
import TopSaleSection from "./components/Tailwind/Welcome/TopSaleSection";
import GuaranteeSection from "./components/Tailwind/Welcome/GuaranteeSection";
import WeLoversSection from "./components/Tailwind/Welcome/WeLoversSections";
import NotSureSection from "./components/Tailwind/Welcome/NotSureSection";
import InstagramSection from "./components/Tailwind/Welcome/InstagramSection";
import Footer from "./components/Tailwind/Footer";
import ProductFilter from "./components/Tailwind/Products/ProductFilter";
import WeCupSection from "./components/Tailwind/Instructions/WeCupSection";
import WeDiskSection from "./components/Tailwind/Instructions/WeDiskSection";
import TestProduct from "./components/Tailwind/Instructions/TestProduct";
import { CarritoProvider } from "./context/CarritoContext";

const Instructions = ({
    sliders,
    items,
    supplies,
    testimonies,
    popups,
    showSlogan = true,
    products_featured,
    new_product,
}) => {
    return (
        <>
            <Header
                showSlogan={showSlogan}
                backgroundType="video"
                backgroundSrc="/assets/img/backgrounds/instructions.mp4"
                backgroundHeight="h-[220px] lg:h-[400px] 2xl:h-[600px]"
                backgroundPosition="object-center"
            >
                <div className="absolute inset-0 flex items-center  justify-center text-center">
                    <div className="text-white text-center p-6">
                        <h1 className="text-[40px]  md:text-[65.08px]  lg:text-[58.54px] 2xl:text-[78.54px]  md:leading-[90.81px]  2xl:leading-[117.81px] font-bold max-w-4xl text-center tracking-[0.01em]">
                            ¿Cómo usar?
                        </h1>
                        <p className="text-[9.61px] md:text-[18.61px] lg:text-[20.61px] 2xl:text-[24.61px] md:leading-[36.92px]  my-2 tracking-[0.01em]">
                            Nuestra prioridad es promover la educación y
                            libertad menstrual, por
                            <br />
                            eso{" "}
                            <strong className="text-[#DDEC4C]">
                                aquí te enseñamos más sobre cómo usar tus copas
                                y discos
                            </strong>
                        </p>
                    </div>
                </div>
            </Header>
            <div className="relative z-10">
                <WeCupSection />
                <WeDiskSection />

                <ProductCarousel products={products_featured}>
                    <h2 className="font-poppins text-lg md:text-3xl 2xl:text-4xl font-bold flex gap-2 md:gap-4 items-center justify-center">
                        <img
                            src="/assets/img/emojis/growing-heart.png"
                            className="h-4 md:h-8 lg:h-9"
                        />{" "}
                        Preferidos por nosotrxs{" "}
                        <img
                            src="/assets/img/emojis/growing-heart.png"
                            className="h-4 md:h-8 lg:h-9"
                        />
                    </h2>
                    <p className="font-poppins text-[13.3px] md:text-[19.3px] leading-[19.77px] lg:mt-4">
                        ¿Estás listx para el cambio?
                    </p>
                </ProductCarousel>

                <div
                    className="py-8 lg:py-12 text-white lg:h-[300.68px] 2xl:h-[349.68px] flex items-center justify-center font-poppins"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(128,113,182,1) 0%, rgba(192,175,225,1) 100%)",
                    }}
                >
                    <p className="px-8 lg:max-w-5xl 2xl:max-w-7xl lg:px-0 mx-auto text-[14px] md:text-[25.38px] leading-snug md:leading-[29.67px] lg:text-[20.45px] 2xl:text-[26.45px] lg:leading-[32.67px]">
                        weFem es una de las marcas más confiables en la
                        categoría de cuidado menstrual reutilizable en el Perú,
                        innovamos con la misma integridad con la que comenzamos
                        hace más de 4 años.
                        <br />
                        <strong>
                            {" "}
                            ¿Listo para transformar tu período para siempre?
                            Elevamos tu confianza con productos creados
                            conscientemente y hechos para tu cuerpo y nuestro
                            planeta.
                        </strong>
                    </p>
                </div>
                <TestProduct producto={new_product} />
                <Footer />
            </div>
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <Instructions {...properties} />
            </Base>
        </CarritoProvider>
    );
});
