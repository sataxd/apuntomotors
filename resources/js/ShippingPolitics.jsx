import React from "react";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import Address from "./Components/Contact/Address";
import ContactForm from "./components/Contact/ContactForm";
import Header from "./components/Tailwind/Header";
import { CarritoProvider } from "./context/CarritoContext";
import Footer from "./components/Tailwind/Footer";
import MapLocation from "./components/Contact/MapLocation";
import ContactSection from "./components/Tailwind/Welcome/ContactSection";
import TabPanel from "./components/Tailwind/Services/TabPanel";
import HtmlContent from "./Utils/HtmlContent";

const ShippingPolitics = ({generals, general}) => {
    
  return <>

    <Header />

    <div className="relative overflow-hidden mt-[70px] min-h-[70vh]">
        <div className="relative w-full px-[5%] 4xl:px-[8%] gap-10 xl:gap-16 flex flex-col items-center py-10 xl:py-20">

            <div className="w-full flex flex-col items-center justify-center gap-5 max-w-3xl 4xl:max-w-4xl text-center">
                <h2 className="font-sora text-[#ff9003] text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                    Políticas de envío
                </h2>
            </div>

            <HtmlContent
                className="font-dmsans text-[#5e5e60] text-base 2xl:text-lg 4xl:text-xl"
                html={general?.description}
            />
        </div>
    </div>
    
    <Footer />
   
  </>
}

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <ShippingPolitics {...properties} />
            </Base>
        </CarritoProvider>
    );
});