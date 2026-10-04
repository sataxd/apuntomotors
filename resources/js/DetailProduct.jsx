import React from "react";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import CreateReactScript from "./Utils/CreateReactScript";

import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import ProductFilter from "./components/Tailwind/Products/ProductFilter";
import Detail from "./components/Tailwind/DetailProduct/Detail";
import { CarritoProvider } from "./context/CarritoContext";

const DetailProduct = ({
    sliders,
    items,
    supplies,
    testimonies,
    popups,
    showSlogan = true,
    item,
    products_featured,
}) => {
 
    return (
        <>
            <Header showSlogan={showSlogan}></Header>
            
            <Detail item={item} />

            <div className="relative z-10">
                {/* <ProductCarousel products={products_featured}>
                    <h2 className="font-poppins text-lg md:text-3xl 2xl:text-4xl font-bold flex gap-2 md:gap-4 items-center justify-center">
                        <img
                            src="/assets/img/emojis/growing-heart.png"
                            className="h-4 md:h-8 lg:h-9"
                        />{" "}
                        Preferidos por nosotrxs{" "}
                    </h2>
                </ProductCarousel> */}
            </div>

            <Footer />
        </>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <DetailProduct {...properties} />
            </Base>
        </CarritoProvider>
    );
});
