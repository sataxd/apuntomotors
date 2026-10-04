import { Link } from '@inertiajs/react'
import JSEncrypt from 'jsencrypt'
import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import ReCAPTCHA from 'react-google-recaptcha'
import Swal from 'sweetalert2'
import CreateReactScript from './Utils/CreateReactScript'
import Global from './Utils/Global'
import AuthRest from './actions/AuthRest'
import { User, Mail, Lock, Calendar, Gift } from 'lucide-react'
import { CarritoProvider } from "./context/CarritoContext";
import Base from "./components/Tailwind/Base";
import Header from "./components/Tailwind/Header";
import Footer from "./components/Tailwind/Footer";

const RegisterContent = ({ PUBLIC_RSA_KEY, RECAPTCHA_SITE_KEY }) => {
    document.title = `Registro | ${Global.APP_NAME}`

    const jsEncrypt = new JSEncrypt()
    jsEncrypt.setPublicKey(PUBLIC_RSA_KEY)

    // Estados
    const [loading, setLoading] = useState(true)
    const [captchaValue, setCaptchaValue] = useState(null)
    const [month, setMonth] = useState('01')
    const [days, setDays] = useState(31)

    const nameRef = useRef()
    const lastnameRef = useRef()
    const monthRef = useRef()
    const dayRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmationRef = useRef()
    const notifyMeRef = useRef()

    useEffect(() => {
        setLoading(false)
    }, [])

    // Refactorización React-friendly para los días del mes
    useEffect(() => {
        const daysInMonth = {
            '01': 31, '02': 29, '03': 31, '04': 30, '05': 31, '06': 30,
            '07': 31, '08': 31, '09': 30, '10': 31, '11': 30, '12': 31
        };
        setDays(daysInMonth[month] || 31);
    }, [month])

    const arrayDays = Array.from({ length: days }, (_, i) => String(i + 1).padStart(2, '0'))

    const onRegisterSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const password = passwordRef.current.value
        const confirmation = confirmationRef.current.value

        if (password !== confirmation) {
            setLoading(false)
            return Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: 'Las contraseñas no coinciden',
                confirmButtonColor: '#FF9900',
                confirmButtonText: 'Ok'
            })
        }

        if (!captchaValue) {
            setLoading(false)
            return Swal.fire({
                icon: 'warning',
                title: 'Error',
                text: 'Por favor, complete el captcha',
                confirmButtonColor: '#FF9900',
                confirmButtonText: 'Ok'
            })
        }

        const request = {
            name: nameRef.current.value,
            lastname: lastnameRef.current.value,
            month: monthRef.current.value,
            day: dayRef.current.value,
            email: emailRef.current.value,
            password: jsEncrypt.encrypt(password),
            confirmation: jsEncrypt.encrypt(confirmation),
            captcha: captchaValue,
            notify_me: notifyMeRef.current.checked
        }

        const result = await AuthRest.signup(request)

        if (!result) {
            setLoading(false)
            return
        }

        if (result) location.href = `./confirm-email/${result}`;
    }

    const inputClass = "w-full rounded-xl border border-gray-300 p-3 pl-10 text-sm 3xlm:text-base 4xl:text-lg font-dmsans outline-none transition-all focus:border-[#FF9900] focus:ring-1 focus:ring-[#FF9900] bg-white text-gray-800 placeholder-gray-400";

    return (
        <>
            <Header showSlogan={true} backgroundHeight="h-0" />
            
            <section className="min-h-screen bg-[#fafafa] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-[70px]">
                <div className="max-w-xl w-full bg-white rounded-[2rem] shadow-sm border border-gray-200 p-6 sm:p-10">

                    {/* Header / Logo de la Card */}
                    <div className="text-center mb-8">
                        <h1 className="font-sora text-3xl font-bold text-black mb-2">Crear Cuenta</h1>
                        <p className="text-gray-500 text-sm 3xlm:text-base 4xl:text-lg font-dmsans">Únete a {Global.APP_NAME} y disfruta de ofertas exclusivas.</p>
                    </div>

                    {/* Tabs Login / Register */}
                    <div className="flex bg-gray-100 p-1 rounded-xl mb-8 font-dmsans">
                        <a
                            href="/login"
                            className="flex-1 text-center py-3 rounded-lg text-sm 3xlm:text-base 4xl:text-lg font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-all"
                        >
                            INICIAR SESIÓN
                        </a>
                        <div className="flex-1 text-center py-3 rounded-lg text-sm 3xlm:text-base 4xl:text-lg font-semibold bg-white text-black shadow-sm">
                            REGISTRARSE
                        </div>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={onRegisterSubmit} className="flex flex-col gap-5 font-dmsans">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="relative">
                                <label htmlFor="name" className="mb-2 block text-sm 3xlm:text-base 4xl:text-lg font-medium text-gray-700">Nombres <b className="text-red-500">*</b></label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input ref={nameRef} className={inputClass} type="text" id="name" placeholder="Ej: María" required />
                                </div>
                            </div>

                            <div className="relative">
                                <label htmlFor="lastname" className="mb-2 block text-sm 3xlm:text-base 4xl:text-lg font-medium text-gray-700">Apellidos <b className="text-red-500">*</b></label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input ref={lastnameRef} className={inputClass} type="text" id="lastname" placeholder="Ej: Pérez" required />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm 3xlm:text-base 4xl:text-lg font-medium text-gray-700">Cumpleaños <b className="text-red-500">*</b></label>
                            <div className="flex gap-3">
                                <div className="relative w-2/3">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                                    <select ref={monthRef} className={`${inputClass} appearance-none cursor-pointer`} onChange={(e) => setMonth(e.target.value)} value={month}>
                                        <option value="01">Enero</option>
                                        <option value="02">Febrero</option>
                                        <option value="03">Marzo</option>
                                        <option value="04">Abril</option>
                                        <option value="05">Mayo</option>
                                        <option value="06">Junio</option>
                                        <option value="07">Julio</option>
                                        <option value="08">Agosto</option>
                                        <option value="09">Septiembre</option>
                                        <option value="10">Octubre</option>
                                        <option value="11">Noviembre</option>
                                        <option value="12">Diciembre</option>
                                    </select>
                                </div>
                                <div className="relative w-1/3">
                                    <Gift className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                                    <select ref={dayRef} className={`${inputClass} appearance-none cursor-pointer`}>
                                        {arrayDays.map((day) => (
                                            <option key={day} value={day}>{day}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm 3xlm:text-base 4xl:text-lg font-medium text-gray-700">Correo electrónico <b className="text-red-500">*</b></label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input ref={emailRef} className={inputClass} type="email" id="email" required placeholder="correo@ejemplo.com" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm 3xlm:text-base 4xl:text-lg font-medium text-gray-700">Contraseña <b className="text-red-500">*</b></label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input ref={passwordRef} className={inputClass} type="password" required id="password" placeholder="••••••••" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmation" className="mb-2 block text-sm 3xlm:text-base 4xl:text-lg font-medium text-gray-700">Confirmación <b className="text-red-500">*</b></label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input ref={confirmationRef} className={inputClass} type="password" required id="confirmation" placeholder="••••••••" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 mb-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <label className="flex items-center gap-3 cursor-pointer select-none">
                                <div className="relative flex items-center justify-center">
                                    <input
                                        ref={notifyMeRef}
                                        type="checkbox"
                                        className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded hover:border-[#FF9900] checked:bg-[#FF9900] checked:border-[#FF9900] transition-all cursor-pointer"
                                    />
                                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="text-sm 3xlm:text-base 4xl:text-lg text-gray-600 font-medium">Quiero recibir ofertas exclusivas y novedades</span>
                            </label>
                        </div>

                        <div className="flex justify-center mb-2">
                            <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={setCaptchaValue} />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-[#FF9900] text-white font-sora font-semibold text-lg py-4 rounded-xl hover:bg-opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-md shadow-orange-500/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? (
                                <><i className='fa fa-spinner fa-spin'></i> VERIFICANDO...</>
                            ) : (
                                '¡CREAR MI CUENTA!'
                            )}
                        </button>

                    </form>
                </div>
            </section>
            
            <Footer />
        </>
    )
}

const Register = (properties) => {
    return (
        <CarritoProvider>
            <Base {...properties}>
                <RegisterContent {...properties} />
            </Base>
        </CarritoProvider>
    );
};

CreateReactScript((el, properties) => {
    createRoot(el).render(<Register {...properties} />)
})