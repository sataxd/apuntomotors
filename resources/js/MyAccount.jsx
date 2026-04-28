import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';
import Header from './components/Tailwind/Header';
import Footer from './components/Tailwind/Footer';
import { CarritoProvider } from './context/CarritoContext';
import { ShoppingBag, User, LogOut } from 'lucide-react';

import Purchases from './Components/Dashboard/Purchases';
import Information from './Components/Dashboard/Information';
import Logout from './Actions/Logout';

const MyAccountContent = ({ session, formulas, gifts }) => {
    // Estado inicial corregido
    const [activeComponent, setActiveComponent] = useState('purchases');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'purchases':
                return <Purchases />;
            case 'informacion':
                return <Information session={session} />;
            default:
                return <Purchases />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#fafafa]">
            
            <Header showSlogan={true} backgroundHeight="h-0" />

            {/* main con flex-grow empuja el footer hacia abajo */}
            <main className="flex-grow w-full max-w-7xl 3xlm:max-w-[1350px] 4xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-[70px] py-12 font-dmsans">
                
                {/* Saludo */}
                <div className="mb-8 md:mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold font-sora text-black">
                        ¡Bienvenid@, {session.name.split(' ')[0]}!
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm 3xlm:text-base 4xl:text-lg md:text-base">
                        Gestiona tus pedidos, direcciones y la configuración de tu cuenta.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    
                    {/* Menú Lateral (Sidebar) */}
                    <aside className="w-full md:w-1/4 lg:w-1/5 flex flex-col gap-2">
                        <button
                            onClick={() => setActiveComponent('purchases')}
                            className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold text-sm 3xlm:text-base 4xl:text-lg transition-all duration-300 ${
                                activeComponent === 'purchases'
                                    ? 'bg-[#FF9900] text-white shadow-md shadow-orange-500/20'
                                    : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-[#FF9900] border border-gray-200'
                            }`}
                        >
                            <ShoppingBag className="w-5 h-5" />
                            Mis compras
                        </button>

                        <button
                            onClick={() => setActiveComponent('informacion')}
                            className={`flex items-center gap-3 px-5 py-4 rounded-xl font-semibold text-sm 3xlm:text-base 4xl:text-lg transition-all duration-300 ${
                                activeComponent === 'informacion'
                                    ? 'bg-[#FF9900] text-white shadow-md shadow-orange-500/20'
                                    : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-[#FF9900] border border-gray-200'
                            }`}
                        >
                            <User className="w-5 h-5" />
                            Información personal
                        </button>

                        <button
                            onClick={Logout}
                            className="flex items-center gap-3 px-5 py-4 rounded-xl font-semibold text-sm 3xlm:text-base 4xl:text-lg bg-white text-red-500 hover:bg-red-50 border border-gray-200 transition-all duration-300 mt-4 md:mt-2"
                        >
                            <LogOut className="w-5 h-5" />
                            Cerrar sesión
                        </button>
                    </aside>

                    {/* Área de Contenido */}
                    <section className="w-full md:w-3/4 lg:w-4/5">
                        {renderComponent()}
                    </section>

                </div>
            </main>

            <Footer />
            
        </div>
    );
};

// Componente Wrapper para proveer los contextos y el diseño base
const MyAccount = (properties) => {
    return (
        <CarritoProvider>
            <Base {...properties}>
                <MyAccountContent {...properties} />
            </Base>
        </CarritoProvider>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(<MyAccount {...properties} />);
});