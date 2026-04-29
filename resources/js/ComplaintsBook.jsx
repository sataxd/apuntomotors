import React, { useState, useEffect } from 'react';
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
import HtmlContent from "./Utils/HtmlContent";
import { User, MapPin, Package, AlertTriangle, ShieldCheck } from 'lucide-react';
import Swal from 'sweetalert2';

const ComplaintsBook = () => {
    
    const [loading, setLoading] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    
    // Estados para Ubigeo
    const [departments, setDepartments] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);

    const [form, setForm] = useState({
        fullname: '', document_type: 'DNI', document_number: '', phone: '', email: '',
        department: '', province: '', district: '', address: '',
        contract_type: 'Producto', claimed_amount: '', product_description: '',
        type: 'Reclamo', incident_date: '', order_number: '', details: ''
    });

    // Cargar Ubigeo inicial
    useEffect(() => {
        fetch('/api/ubigeo/departments').then(res => res.json()).then(data => setDepartments(data));
    }, []);
    useEffect(() => {
        if (form.department) fetch(`/api/ubigeo/provinces/${form.department}`).then(res => res.json()).then(data => setProvinces(data));
    }, [form.department]);
    useEffect(() => {
        if (form.province) fetch(`/api/ubigeo/districts/${form.province}`).then(res => res.json()).then(data => setDistricts(data));
    }, [form.province]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!termsAccepted) {
            Swal.fire('Atención', 'Debe aceptar los términos y condiciones', 'warning');
            return;
        }

        setLoading(true);
        try {
            // Buscamos los nombres del ubigeo
            const depName = departments.find(d => d.id === form.department)?.description;
            const provName = provinces.find(p => p.id === form.province)?.description;
            const distName = districts.find(d => d.id === form.district)?.description;

            const requestData = {
                ...form,
                department: depName,
                province: provName,
                district: distName
            };

            const response = await fetch('/api/complaints/save', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' // Importante para que Laravel siempre devuelva JSON
                },
                body: JSON.stringify(requestData)
            });
            
            const data = await response.json();

            // Verificamos si la respuesta del servidor fue exitosa (200 OK)
            if (response.ok || data.status === 200 || data.status === true) {
                
                // Buscamos el correlativo sin importar cómo lo devuelva el BasicController
                const correlativo = data?.data?.correlative || data?.result?.correlative || data?.correlative || '';
                
                Swal.fire({
                    title: '¡Reclamo Enviado!',
                    text: `Su solicitud ha sido registrada exitosamente ${correlativo ? `con el código: ${correlativo}` : ''}.`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    // Recargamos la página para limpiar todo el formulario y los estados
                    window.location.reload(); 
                });

            } else {
                Swal.fire('Error', data.message || 'Ocurrió un problema al guardar el formulario', 'error');
            }
        } catch (error) {
            // Imprimimos el error real en consola para saber qué pasó
            console.error("Error procesando la respuesta en React:", error);
            Swal.fire('Atención', 'El reclamo fue enviado, pero hubo un error de lectura en pantalla.', 'info');
        }
        setLoading(false);
    };

  return <>

    <Header />

    <div className="max-w-4xl mx-auto py-10 px-5 font-dmsans text-gray-700 mt-[70px] min-h-[70vh]">
            <div className="mb-8 text-center">
                <h2 className="font-sora text-[#ff9003] text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                    Libro de Reclamaciones
                </h2>
                <p className="text-gray-500 mt-2">Conforme a lo establecido en el Código de Protección y Defensa del Consumidor.</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-8">
                {/* 1. Datos Personales */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold text-black mb-5 flex items-center gap-3">
                        <User className="text-red-600 bg-red-100 p-1.5 rounded-full w-8 h-8" />
                        Identificación del Consumidor
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium mb-1">Nombres completos *</label>
                            <input type="text" name="fullname" required onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-red-500" placeholder="Ingresa tu nombre completo" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Tipo de documento *</label>
                            <select name="document_type" required onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-red-500 bg-white">
                                <option value="DNI">DNI</option>
                                <option value="RUC">RUC</option>
                                <option value="CE">Carnet de Extranjería</option>
                                <option value="Pasaporte">Pasaporte</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Número de documento *</label>
                            <input type="text" name="document_number" required onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-red-500" placeholder="Número" />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium mb-1">Número de celular *</label>
                            <input type="tel" name="phone" required onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-red-500" placeholder="+51" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Correo electrónico *</label>
                            <input type="email" name="email" required onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-red-500" placeholder="tu@correo.com" />
                        </div>
                    </div>
                </div>

                {/* 2. Ubicación */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold text-black mb-5 flex items-center gap-3">
                        <MapPin className="text-red-600 bg-red-100 p-1.5 rounded-full w-8 h-8" />
                        Ubicación
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                            <label className="block text-sm font-medium mb-1">Departamento *</label>
                            <select name="department" required onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none bg-white">
                                <option value="">Seleccione</option>
                                {departments.map(d => <option key={d.id} value={d.id}>{d.description}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Provincia *</label>
                            <select name="province" required onChange={handleInputChange} disabled={!form.department} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none bg-white disabled:bg-gray-100">
                                <option value="">Seleccione</option>
                                {provinces.map(p => <option key={p.id} value={p.id}>{p.description}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Distrito *</label>
                            <select name="district" required onChange={handleInputChange} disabled={!form.province} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none bg-white disabled:bg-gray-100">
                                <option value="">Seleccione</option>
                                {districts.map(d => <option key={d.id} value={d.id}>{d.description}</option>)}
                            </select>
                        </div>
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium mb-1">Dirección completa *</label>
                            <input type="text" name="address" required onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-red-500" placeholder="Av. Principal 123..." />
                        </div>
                    </div>
                </div>

                {/* 3. Identificación del Bien Contratado */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold text-black mb-5 flex items-center gap-3">
                        <Package className="text-red-600 bg-red-100 p-1.5 rounded-full w-8 h-8" />
                        Identificación del bien contratado
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Tipo de contratación *</label>
                            <select name="contract_type" required onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none bg-white">
                                <option value="Producto">Producto</option>
                                <option value="Servicio">Servicio</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Monto reclamado (S/) *</label>
                            <input type="number" step="0.01" name="claimed_amount" required onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none" placeholder="0.00" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Descripción del producto/servicio *</label>
                            <input type="text" name="product_description" required onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none" placeholder="Nombre, modelo..." />
                        </div>
                    </div>
                </div>

                {/* 4. Detalle del Reclamo */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold text-black mb-5 flex items-center gap-3">
                        <AlertTriangle className="text-red-600 bg-red-100 p-1.5 rounded-full w-8 h-8" />
                        Detalle del reclamo
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Tipo de solicitud *</label>
                            <select name="type" required onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none bg-white">
                                <option value="Reclamo">Reclamo (Disconformidad con el bien o servicio)</option>
                                <option value="Queja">Queja (Descontento con la atención)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Fecha de ocurrencia *</label>
                            <input type="date" name="incident_date" required onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Número de pedido (Opcional)</label>
                            <input type="text" name="order_number" onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none" placeholder="#PED-123456" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Detalle del reclamo o queja *</label>
                            <textarea name="details" rows={4} required onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2.5 outline-none resize-none" placeholder="Describe detalladamente lo sucedido..." minLength={50}></textarea>
                            <small className="text-gray-400">Mínimo 50 caracteres</small>
                        </div>
                    </div>
                </div>

                {/* 5. Términos y Envío */}
                <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-xl font-bold text-black mb-5 flex items-center gap-3">
                        <ShieldCheck className="text-red-600 bg-red-100 p-1.5 rounded-full w-8 h-8" />
                        Verificación y términos
                    </h2>
                    
                    <div className="bg-gray-50 p-4 rounded-lg flex items-start gap-3 mb-6">
                        <input type="checkbox" id="terms" className="mt-1 w-5 h-5" onChange={(e) => setTermsAccepted(e.target.checked)} />
                        <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                            Acepto y estoy de acuerdo con los <a target='_blank' href="/terminos-y-condiciones" className="text-blue-600 underline">términos y condiciones</a> del libro de reclamaciones. Confirmo que la información proporcionada es veraz y completa.
                        </label>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button type="reset" className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                            Limpiar formulario
                        </button>
                        <button type="submit" disabled={loading} className="px-8 py-3 bg-[#0d6efd] text-white rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-70">
                            {loading ? 'Procesando...' : <><i className="mdi mdi-send"></i> Enviar reclamo</>}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    
    <Footer />
   
  </>
}

CreateReactScript((el, properties) => {
    createRoot(el).render(
        <CarritoProvider>
            <Base {...properties}>
                <ComplaintsBook {...properties} />
            </Base>
        </CarritoProvider>
    );
});