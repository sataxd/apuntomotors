import React, { useContext, useEffect } from "react";
import CreateReactScript from "./Utils/CreateReactScript";
import { createRoot } from "react-dom/client";
import Base from "./components/Tailwind/Base";
import { CarritoContext, CarritoProvider } from "./context/CarritoContext";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";

const ThanksContent = ({ session }) => {

    useEffect(() => {
        history.replaceState(null, "", "/thanks");
        localStorage.clear();
        localStorage.setItem("carrito", []);
    }, [null]);
    localStorage.clear();
    localStorage.setItem("carrito", []);

    const { vaciarCarrito } = useContext(CarritoContext);

    vaciarCarrito();

    return (
        <>
            <Header showSlogan={true} backgroundHeight="h-0" />
            
            <section className="mt-[90px] px-[5%] md:px-[7.5%] lg:px-[10%] bg-[#fafafa] min-h-[65vh] flex items-center justify-center py-16 font-dmsans text-[#404040]">
                <div className="bg-white p-8 md:p-12 lg:p-16 rounded-[2rem] shadow-sm border border-gray-200 max-w-2xl w-full text-center flex flex-col items-center relative overflow-hidden">
                    
                    {/* Efecto de fondo sutil */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-50 to-white -z-10"></div>

                    {/* Icono de Éxito */}
                    <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-inner">
                        <CheckCircle className="w-12 h-12" strokeWidth={2.5} />
                    </div>

                    {/* Textos */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-sora text-black mb-4">
                        ¡Pago Exitoso!
                    </h1>
                    <p className="text-gray-500 text-base md:text-lg mb-10 max-w-lg leading-relaxed">
                        Tu pedido ha sido procesado correctamente. Te hemos enviado un correo electrónico con los detalles de tu compra y la información de seguimiento.
                    </p>

                    {/* Botones de Acción */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <a 
                            href="/catalogo" 
                            className="flex items-center justify-center gap-2 bg-[#FF9900] text-white font-sora font-semibold text-base px-8 py-4 rounded-xl hover:bg-opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-md shadow-orange-500/20"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Seguir comprando
                        </a>
                        
                        {session?.id && (
                            <a 
                                href="/my-account" 
                                className="flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-300 font-sora font-semibold text-base px-8 py-4 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                            >
                                Mis compras
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                    
                </div>
            </section>

            <Footer />
        </>
    );
};

const Thanks = (properties) => {
    return (
        <CarritoProvider>
            <Base {...properties}>
                <ThanksContent {...properties} />
            </Base>
        </CarritoProvider>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(<Thanks {...properties} />);
});