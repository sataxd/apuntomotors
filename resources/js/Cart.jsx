import React, { useContext } from "react";
import { CarritoContext } from "./context/CarritoContext";
import { CarritoProvider } from "./context/CarritoContext";
import Number2Currency from "./Utils/Number2Currency";
import Base from "./components/Tailwind/Base";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";
import AlertComponent from "./context/AlertComponent";
import CreateReactScript from "./Utils/CreateReactScript";
import { Trash2, ShieldCheck, ArrowRight } from "lucide-react";
import { createRoot } from "react-dom/client";

const CartContent = () => {
    const { 
        carrito, 
        incrementarCantidad, 
        decrementarCantidad, 
        eliminarProducto 
    } = useContext(CarritoContext);

    // Calcular el subtotal
    const subtotal = carrito.reduce(
        (acc, item) => acc + (item.final_price || 0) * item.quantity, 
        0
    );

    return (
        <>
            <Header showSlogan={true} backgroundHeight="h-0" />

            <section className="mt-[70px] px-[5%] md:px-[7.5%] lg:px-[10%] text-[#404040] font-dmsans">
                <div className="max-w-7xl mx-auto py-10">
                    
                    <h1 className="text-3xl md:text-4xl font-bold font-sora mb-8 text-black">
                        Tu Carrito de Compras
                    </h1>

                    {carrito.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-gray-200">
                            <img
                                src="/assets/img/logo.webp"
                                alt="Wefem"
                                className="h-24 md:h-32 object-contain opacity-50 mb-6"
                                onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                            />
                            <h2 className="text-2xl font-sora font-semibold text-gray-700 mb-4">
                                Tu carrito está vacío
                            </h2>
                            <p className="text-gray-500 mb-8 text-center max-w-md">
                                Parece que aún no has añadido ningún producto a tu carrito. ¡Explora nuestro catálogo y encuentra lo que buscas!
                            </p>
                            <a 
                                href="/catalogo" 
                                className="bg-[#FF9900] text-white font-semibold px-8 py-3 rounded-xl hover:bg-opacity-90 transition-all hover:scale-105"
                            >
                                Ir a la tienda
                            </a>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 relative">
                            
                            {/* Lado Izquierdo: Lista de Productos */}
                            <div className="w-full lg:w-2/3 flex flex-col gap-6">
                                
                                {/* Encabezado de la tabla (solo visible en desktop) */}
                                <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b border-gray-300 text-sm font-bold text-gray-500 uppercase tracking-wider">
                                    <div className="col-span-6">Producto</div>
                                    <div className="col-span-3 text-center">Cantidad</div>
                                    <div className="col-span-2 text-right">Subtotal</div>
                                    <div className="col-span-1"></div>
                                </div>

                                {/* Items del carrito */}
                                <div className="flex flex-col gap-6">
                                    {carrito.map((item, index) => (
                                        <div 
                                            key={item.cartItemId || index} 
                                            className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-4 border-b border-gray-100 relative group"
                                        >
                                            {/* Imagen y Detalles */}
                                            <div className="col-span-1 md:col-span-6 flex gap-4 items-center">
                                                <div className="w-24 h-24 flex-shrink-0 bg-white border border-gray-200 rounded-lg p-2">
                                                    <img
                                                        src={`/api/items/media/${item.image}`}
                                                        alt={item.name}
                                                        className="w-full h-full object-contain"
                                                        onError={(e) => (e.target.src = "/api/cover/thumbnail/null")}
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <a href={`/producto/${item.slug}`} className="font-sora font-semibold text-base md:text-lg text-black line-clamp-2 hover:text-[#FF9900] transition-colors">
                                                        {item.name}
                                                    </a>
                                                    
                                                    {/* Mostrar atributos solo si no son los "nulos/Estándar" */}
                                                    {(item.selectedColor !== "Estándar" || item.selectedSize !== "Unidad") && (
                                                        <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-500">
                                                            {item.selectedColor !== "Estándar" && (
                                                                <span className="bg-gray-100 px-2 py-0.5 rounded-md">{item.selectedColor}</span>
                                                            )}
                                                            {item.selectedSize !== "Unidad" && (
                                                                <span className="bg-gray-100 px-2 py-0.5 rounded-md">{item.selectedSize}</span>
                                                            )}
                                                        </div>
                                                    )}
                                                    
                                                    <div className="mt-2 text-sm font-medium text-gray-700">
                                                        S/ {Number2Currency(item.final_price || 0)} <span className="text-gray-400 font-normal text-xs">c/u</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Controles de Cantidad */}
                                            <div className="col-span-1 md:col-span-3 flex justify-start md:justify-center items-center mt-2 md:mt-0">
                                                <div className="flex h-10 border border-gray-300 items-center justify-between rounded-lg w-32 overflow-hidden bg-white">
                                                    <button
                                                        className="w-10 h-full text-lg hover:bg-gray-100 text-gray-600 transition-colors"
                                                        onClick={() => decrementarCantidad(item.cartItemId)}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="flex-1 text-center font-semibold text-black select-none">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        className="w-10 h-full text-lg hover:bg-gray-100 text-gray-600 transition-colors"
                                                        onClick={() => incrementarCantidad(item.cartItemId)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Subtotal del Item */}
                                            <div className="col-span-1 md:col-span-2 flex justify-start md:justify-end items-center mt-1 md:mt-0">
                                                <span className="font-sora font-bold text-lg text-black">
                                                    S/ {Number2Currency((item.final_price || 0) * item.quantity)}
                                                </span>
                                            </div>

                                            {/* Botón Eliminar */}
                                            <div className="absolute top-4 right-0 md:relative md:top-auto md:col-span-1 flex justify-end items-center">
                                                <button
                                                    onClick={() => eliminarProducto(item.cartItemId)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                                                    title="Eliminar producto"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Lado Derecho: Resumen de Compra */}
                            <div className="w-full lg:w-1/3">
                                <div className="bg-gray-50 border border-gray-200 p-6 md:p-8 rounded-2xl sticky top-24">
                                    <h3 className="font-sora text-xl md:text-2xl font-bold text-black mb-6">
                                        Resumen del pedido
                                    </h3>

                                    <div className="flex flex-col gap-4 text-base text-gray-600 mb-6">
                                        <div className="flex justify-between items-center">
                                            <span>Subtotal ({carrito.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                                            <span className="font-semibold text-black">S/ {Number2Currency(subtotal)}</span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center">
                                            <span>Envío</span>
                                            <span className="font-semibold text-gray-500 italic text-sm">Por calcular</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-6 mb-8 flex justify-between items-center">
                                        <span className="font-sora text-xl font-bold text-black">Total</span>
                                        <span className="font-sora text-2xl font-bold text-black">
                                            S/ {Number2Currency(subtotal)}
                                        </span>
                                    </div>

                                    <a 
                                        href="/checkout"
                                        className="w-full flex items-center justify-center gap-2 bg-[#FF9900] text-white font-sora font-semibold text-lg py-4 rounded-xl hover:bg-opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-md shadow-orange-500/20"
                                    >
                                        Continuar al pago <ArrowRight className="w-5 h-5" />
                                    </a>

                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <div className="flex items-center gap-2 justify-center text-sm text-gray-500 mb-4">
                                            <ShieldCheck className="w-5 h-5 text-green-500" />
                                            Pago 100% seguro y encriptado
                                        </div>
                                        <img 
                                            src="/assets/img/checkout/cards_digital.png" 
                                            alt="Métodos de pago" 
                                            className="w-full max-w-[250px] mx-auto object-contain opacity-80"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
};

const Cart = (properties) => {
    return (
        <CarritoProvider>
            <Base {...properties}>
                <CartContent />
            </Base>
        </CarritoProvider>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(<Cart {...properties} />);
});