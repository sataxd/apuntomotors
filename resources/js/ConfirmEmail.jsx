import React from 'react'
import { createRoot } from 'react-dom/client'
import CreateReactScript from './Utils/CreateReactScript'
import Global from './Utils/Global'
import { MailCheck, ArrowRight } from 'lucide-react'
import { CarritoProvider } from "./context/CarritoContext";
import Base from "./components/Tailwind/Base";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";

const ConfirmEmailContent = ({ email }) => {
  document.title = `Confirmar correo electrónico | ${Global.APP_NAME}`

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
        
        <Header showSlogan={true} backgroundHeight="h-0" />

        <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-[70px] py-12 font-dmsans">
            <div className="max-w-lg w-full bg-white rounded-[2rem] shadow-sm border border-gray-200 p-8 sm:p-12 text-center relative overflow-hidden">

                {/* Efecto de fondo sutil (Onda de color arriba) */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-orange-50 to-white -z-10"></div>

                {/* Icono animado y moderno */}
                <div className="mx-auto w-24 h-24 bg-orange-100 text-[#FF9900] rounded-full flex items-center justify-center mb-8 shadow-inner">
                    <MailCheck className="w-12 h-12" strokeWidth={2} />
                </div>

                <h1 className="text-2xl md:text-3xl font-bold font-sora text-black mb-4 tracking-tight">
                    Revisa tu bandeja
                </h1>

                <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
                    Hemos enviado un correo electrónico a <b className="text-gray-800">{email}</b>. Por favor, verifica si has recibido nuestro mensaje y haz clic en el enlace incluido para activar tu cuenta.
                </p>

                {/* Botón principal */}
                <a
                    href="/login"
                    className="w-full flex items-center justify-center gap-2 bg-[#FF9900] text-white font-sora font-semibold text-lg py-4 rounded-xl hover:bg-opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-md shadow-orange-500/20"
                >
                    Ir a Iniciar Sesión <ArrowRight className="w-5 h-5" />
                </a>

                {/* Nota inferior */}
                <p className="text-sm text-gray-400 mt-8">
                    ¿No recibiste el correo? Revisa tu carpeta de spam o correo no deseado.
                </p>
                
            </div>
        </main>

        <Footer />
        
    </div>
  )
};

// Componente Envoltorio (Wrapper) para proveer los contextos sin romper el Header
const ConfirmEmail = (properties) => {
    return (
        <CarritoProvider>
            <Base {...properties}>
                <ConfirmEmailContent {...properties} />
            </Base>
        </CarritoProvider>
    );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<ConfirmEmail {...properties} />)
})