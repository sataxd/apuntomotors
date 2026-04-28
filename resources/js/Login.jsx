import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import JSEncrypt from "jsencrypt";
import CreateReactScript from "./Utils/CreateReactScript";
import AuthRest from "./actions/AuthRest";
import Swal from "sweetalert2";
import { GET } from "sode-extend-react";
import Global from "./Utils/Global";
import { Mail, Lock, LogIn } from "lucide-react";
import { CarritoProvider } from "./context/CarritoContext";
import Base from "./components/Tailwind/Base";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";

const LoginContent = () => {
    document.title = `Login | ${Global.APP_NAME}`;

    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(Global.PUBLIC_RSA_KEY);

    // Estados
    const [loading, setLoading] = useState(false);
    const rememberRef = useRef();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (GET.message) {
            Swal.fire({
                icon: "info",
                title: "Mensaje",
                text: GET.message,
                showConfirmButton: false,
                timer: 3000,
            });
        }
        
        if (GET.service) {
            history.pushState(null, null, `/login?service=${GET.service}`);
        } else {
            history.pushState(null, null, "/login");
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const email = formData.email;
        const password = formData.password;
        
        const request = {
            email: jsEncrypt.encrypt(email),
            password: jsEncrypt.encrypt(password),
        };
        
        const result = await AuthRest.login(request);

        if (!result) return setLoading(false);

        location.reload();
    };

    // Estilo base para los inputs (Idéntico al de Registro)
    const inputClass = "w-full rounded-xl border border-gray-300 p-3 pl-10 text-sm 3xlm:text-base 4xl:text-lg font-dmsans outline-none transition-all focus:border-[#FF9900] focus:ring-1 focus:ring-[#FF9900] bg-white text-gray-800 placeholder-gray-400";

    return (
        <div className="flex flex-col min-h-screen bg-[#fafafa]">
            
            <Header showSlogan={true} backgroundHeight="h-0" />
            
            <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-[70px] py-12">
                <div className="max-w-xl 4xl:max-w-2xl w-full bg-white rounded-[2rem] shadow-sm border border-gray-200 p-6 sm:p-10">

                    {/* Header / Logo de la Card */}
                    <div className="text-center mb-8">
                        <h1 className="font-sora text-3xl font-bold text-black mb-2">Bienvenido de nuevo</h1>
                        <p className="text-gray-500 text-sm 3xlm:text-base 4xl:text-lg font-dmsans">Inicia sesión en {Global.APP_NAME} para continuar.</p>
                    </div>

                    {/* Tabs Login / Register */}
                    <div className="flex bg-gray-100 p-1 rounded-xl mb-8 font-dmsans">
                        <div className="flex-1 text-center py-3 rounded-lg text-sm font-semibold bg-white text-black shadow-sm">
                            INICIAR SESIÓN
                        </div>
                        <a
                            href="/register"
                            className="flex-1 text-center py-3 rounded-lg text-sm font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-all"
                        >
                            REGISTRARSE
                        </a>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={onLoginSubmit} className="flex flex-col gap-5 font-dmsans">

                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm 3xlm:text-base 4xl:text-lg font-medium text-gray-700">Correo electrónico</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    className={inputClass} 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                    placeholder="correo@ejemplo.com" 
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm 3xlm:text-base 4xl:text-lg font-medium text-gray-700">Contraseña</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    className={inputClass} 
                                    type="password" 
                                    required 
                                    id="password" 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••" 
                                />
                            </div>
                        </div>

                        {/* Opciones extra: Recordarme y Olvidé contraseña */}
                        <div className="flex items-center justify-between mt-1 mb-2">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <div className="relative flex items-center justify-center">
                                    <input
                                        ref={rememberRef}
                                        type="checkbox"
                                        id="remember"
                                        className="peer appearance-none w-4 h-4 border-2 border-gray-300 rounded hover:border-[#FF9900] checked:bg-[#FF9900] checked:border-[#FF9900] transition-all cursor-pointer"
                                    />
                                    <svg className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="text-sm 3xlm:text-base 4xl:text-lg text-gray-600 font-medium">Guardar mis datos</span>
                            </label>
                            
                            {/* <a href="/forgot-password" className="text-sm font-semibold text-[#FF9900] hover:text-orange-500 transition-colors">
                                ¿Olvidaste tu contraseña?
                            </a> */}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-[#FF9900] text-white font-sora font-semibold text-lg py-4 rounded-xl hover:bg-opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-md shadow-orange-500/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
                        >
                            {loading ? (
                                <><i className='fa fa-spinner fa-spin'></i> INGRESANDO...</>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" /> INGRESAR
                                </>
                            )}
                        </button>

                    </form>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

const Login = (properties) => {
    return (
        <CarritoProvider>
            <Base {...properties}>
                <LoginContent {...properties} />
            </Base>
        </CarritoProvider>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(<Login {...properties} />);
});