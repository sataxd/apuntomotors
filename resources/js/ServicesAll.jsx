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
import ServicesHome from "./components/Tailwind/Welcome/ServicesHome";

const ServicesAll = ({generals, showSlogan = true, services, aboutus}) => {
    
  return <>

    <Header />

    <ServicesHome is_home={false} services={services} dataAbout={aboutus} />
    
    <Footer />
   
  </>
}

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <ServicesAll {...properties} />
            </Base>
        </CarritoProvider>
    );
});