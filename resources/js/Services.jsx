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

const Services = ({generals, showSlogan = true, servicios}) => {
    
  return <>

    <Header />

    <TabPanel servicios={servicios} />
    
    <Footer />
   
  </>
}

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <Services {...properties} />
            </Base>
        </CarritoProvider>
    );
});