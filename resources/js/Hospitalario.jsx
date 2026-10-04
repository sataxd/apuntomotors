import React from "react";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import Header from "./components/Tailwind/Header";
import { CarritoProvider } from "./context/CarritoContext";
import Footer from "./components/Tailwind/Footer";
import SectionHospitalario from "./components/Tailwind/Services/SectionHospitalario";
import Products from "./components/Tailwind/Services/Products";
import ServiceTecnical from "./components/Tailwind/Welcome/ServiceTecnical";
import Marcas from "./components/Tailwind/Welcome/Marcas";

const Hospitalario = ({generals, brandsData, globalSubcategories, globalTags, showSlogan = true, brands, dataAbout}) => {
  return <>

    <Header
        showSlogan={showSlogan}
    >
    </Header>

    <SectionHospitalario dataAbout={dataAbout} />

    <div className="flex flex-col gap-10">
      {brandsData && brandsData.map((brandInfo, index) => (
        <Products 
           key={index} 
           brandData={brandInfo} 
           globalSubcategories={globalSubcategories} 
           globalTags={globalTags} 
        />
      ))}
    </div>

    <ServiceTecnical indeci={false} marginTop={false} />

    <Marcas dataAbout={dataAbout} brands={brands} apiFolder='core_value' />
  
    <Footer />
   
  </>
}

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <Hospitalario {...properties} />
            </Base>
        </CarritoProvider>
    );
});