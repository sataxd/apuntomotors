import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";

import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoProvider } from "./context/CarritoContext";
import AboutSection from "./components/Tailwind/Welcome/AboutSection";
import Marcas from "./components/Tailwind/Welcome/Marcas";

const About = ({ generals, showSlogan = true, dataAbout, brands }) => {
   
    return (
        <>
            <Header />

            <AboutSection dataAbout={dataAbout} />

            <Marcas dataAbout={dataAbout} brands={brands} apiFolder='core_value' />
            
            <Footer />
           
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <About {...properties} />
            </Base>
        </CarritoProvider>
    );
});
