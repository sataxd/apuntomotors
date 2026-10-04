import React from "react";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";

import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import ProductFilter from "./components/Tailwind/Products/ProductFilter";
import { motion } from 'framer-motion';
import { CarritoProvider } from "./context/CarritoContext";

const CatalogProducts = ({
    sliders,
    items,
    categories,
    supplies,
    testimonies,
    anuncio,
    initialCategory,    
    initialSubcategory,
    showSlogan = true,
}) => {
    
    const pageTitle = initialSubcategory || initialCategory || "Catálogo";

    return (
        <>
            <Header />

            <div className="mt-[70px] relative flex items-center justify-start px-[5%] h-[40vh]">
                <img className="h-[40vh] absolute w-full top-0 left-0 object-cover" 
                     src="/assets/img/frascos_y_botellas.webp"
                />
                <div className="h-[40vh] absolute flex flex-col items-start justify-start md:justify-center text-white mt-16 sm:mt-0 max-w-xl">
                    <h2 className="font-sora text-white text-3xl sm:text-5xl 2xl:text-[52px] 4xl:text-6xl tracking-normal font-semibold !leading-[1.15]">
                        {pageTitle}
                    </h2>
                </div>
            </div>

            <div className="relative z-10">
                
                <ProductFilter
                    products={items}
                    categories={categories}
                    anuncio={anuncio}
                    initialCategory={initialCategory}      
                    initialSubcategory={initialSubcategory}
                />

            </div>

            <Footer />
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <CatalogProducts {...properties} />
            </Base>
        </CarritoProvider>
    );
});
