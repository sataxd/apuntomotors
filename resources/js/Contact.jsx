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
import Faqs from "./components/Tailwind/Welcome/Faqs";


const Contact = ({generals, showSlogan = true, faqs}) => {
  return <>

    <Header />

    <Faqs tieneMargen={true} faqs={faqs}/>

    <ContactSection />

    <MapLocation generals={generals} />

    <Footer />

    {/* <div className="flex flex-row mt-2">
        <a href="/"
            className="text-white font-dmsans border-[1.5px] border-white border-opacity-50 flex flex-row items-center px-3 md:px-5 py-1.5 text-base 2xl:text-lg 4xl:text-xl rounded-xl font-medium">
            Quiero mas informacion
            <div className="rounded-full flex flex-row justify-center items-center ml-2">
                <i className="mdi mdi-redo text-2xl text-white "></i>
            </div>
        </a>
    </div> */}
  </>
}

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <Contact {...properties} />
            </Base>
        </CarritoProvider>
    );
});