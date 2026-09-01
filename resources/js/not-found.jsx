import React from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import { CarritoProvider } from "./context/CarritoContext";

const NotFoundPage = () => {
    return (
        <CarritoProvider>
            <div className="flex flex-col min-h-screen">
                <Header showShadow={false} />
                
                <section className="relative w-full px-[5%] 4xl:px-[8%] gap-10 4xl:gap-16 flex flex-col items-center py-10 xl:py-16 mt-[70px]">
                    <div className="text-center max-w-lg">
                        <div className="flex flex-row justify-center items-center mb-4">
                            <h3 className="text-7xl font-sora font-bold text-[#131e2e]">4</h3>    
                            <img
                                src="/assets/img/favicon.png"
                                alt="Apunto Motor"
                                className="h-20 4xl:h-24 object-contain"
                            />
                            <h3 className="text-7xl font-sora font-bold text-[#131e2e]">4</h3>
                        </div>
                        <p className="text-4xl font-bold text-gray-600 mb-2 font-dmsans">¡Página no encontrada!</p>
                        <p className="text-gray-600 mb-8 font-dmsans">
                            Lo sentimos, la página que estás buscando pudo haber sido eliminada, cambió de nombre o no está disponible temporalmente.
                        </p>
                        <div className="flex flex-row justify-center mt-2">
                            <a href="/"
                                className="bg-[#7c231c] cursor-pointer hover:animate-wiggle font-dmsans border-[2px] text-white flex flex-row items-center px-3 md:px-6 py-2 text-base 2xl:text-lg 4xl:text-xl rounded-xl font-medium">
                                 Volver al inicio
                            </a>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </CarritoProvider>
    );
};

const container = document.getElementById("app");
if (container) {
    createRoot(container).render(<NotFoundPage />);
}