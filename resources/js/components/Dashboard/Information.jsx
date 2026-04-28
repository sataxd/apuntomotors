import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import Swal from 'sweetalert2';
import ProfileRest from '../../Actions/Customer/ProfileRest';
import { Edit2, MapPin, Mail, Phone, Calendar, User, Save, X } from 'lucide-react';

ReactModal.setAppElement('#app');

const Information = ({ session }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [month, setMonth] = useState(session.birth_month ?? '01');
    const [days, setDays] = useState(31);

    const nameRef = useRef();
    const lastnameRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();
    const addressNumberRef = useRef();
    const addressReferenceRef = useRef();
    const birthMonthRef = useRef();
    const birthDayRef = useRef();

    const onModalSubmit = async (e) => {
        e.preventDefault();
        const result = await ProfileRest.save({
            name: nameRef.current.value,
            lastname: lastnameRef.current.value,
            phone: phoneRef.current.value,
            address: addressRef.current.value,
            address_number: addressNumberRef.current.value,
            address_reference: addressReferenceRef.current.value,
            birth_month: birthMonthRef.current.value,
            birth_day: birthDayRef.current.value
        });
        if (!result) return;
        
        Swal.fire({
            title: '¡Actualizado!',
            text: 'Tu información se ha guardado correctamente.',
            icon: 'success',
            confirmButtonColor: '#FF9900',
            timer: 2000,
        });
        location.reload();
    };

    // Bloquear scroll al abrir el modal
    useEffect(() => {
        document.body.style.overflow = modalOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [modalOpen]);

    // Refactorización React-friendly para calcular días del mes
    useEffect(() => {
        const daysInMonth = {
            '01': 31, '02': 29, '03': 31, '04': 30, '05': 31, '06': 30,
            '07': 31, '08': 31, '09': 30, '10': 31, '11': 30, '12': 31
        };
        setDays(daysInMonth[month] || 31);
    }, [month]);

    const arrayDays = Array.from({ length: days }, (_, i) => String(i + 1).padStart(2, '0'));
    
    // Clases CSS reutilizables
    const inputClass = "w-full rounded-xl border border-gray-300 p-3 text-sm 3xlm:text-base 4xl:text-lg font-dmsans outline-none transition-all focus:border-[#FF9900] focus:ring-1 focus:ring-[#FF9900] bg-white";
    const disabledClass = "w-full rounded-xl border border-gray-200 p-3 text-sm 3xlm:text-base 4xl:text-lg font-dmsans bg-gray-100 text-gray-500 cursor-not-allowed";

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden scrollbar-hide h-full flex flex-col font-dmsans">
            
            {/* Header de la Tarjeta */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-5 mb-6 gap-4">
                <h2 className="text-xl md:text-2xl font-bold font-sora text-black">
                    Tu información personal
                </h2>
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center justify-center gap-2 text-sm 3xlm:text-base 4xl:text-lg font-semibold text-[#FF9900] hover:text-white bg-orange-50 hover:bg-[#FF9900] px-5 py-2.5 rounded-xl transition-all duration-300 w-full sm:w-auto"
                >
                    <Edit2 className="w-4 h-4" /> Editar Datos
                </button>
            </div>

            {/* Cuadrículas de Información */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
                
                {/* Nombre y Correo */}
                <div className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:border-gray-200">
                    <div className="bg-white p-3 rounded-full shadow-sm h-fit">
                        <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Nombre Completo</span>
                        <p className="text-gray-800 font-medium 3xlm:text-base 4xl:text-lg">{session.name} {session.lastname}</p>
                    </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:border-gray-200">
                    <div className="bg-white p-3 rounded-full shadow-sm h-fit">
                        <Mail className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex flex-col justify-center overflow-hidden">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Correo electrónico</span>
                        <p className="text-gray-800 font-medium truncate 3xlm:text-base 4xl:text-lg" title={session.email}>{session.email}</p>
                    </div>
                </div>

                {/* Teléfono y Fecha de Nacimiento */}
                <div className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:border-gray-200">
                    <div className="bg-white p-3 rounded-full shadow-sm h-fit">
                        <Phone className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Teléfono</span>
                        <p className="text-gray-800 font-medium 3xlm:text-base 4xl:text-lg">{session.phone || <span className="italic opacity-60">No registrado</span>}</p>
                    </div>
                </div>

                <div className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 transition-colors hover:border-gray-200">
                    <div className="bg-white p-3 rounded-full shadow-sm h-fit">
                        <Calendar className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Cumpleaños</span>
                        <p className="text-gray-800 font-medium 3xlm:text-base 4xl:text-lg">
                            {session.birth_day ? `${session.birth_day} / ${session.birth_month}` : <span className="italic opacity-60">No registrado</span>}
                        </p>
                    </div>
                </div>

                {/* Dirección (Ocupa dos columnas si hay espacio) */}
                <div className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 md:col-span-2 transition-colors hover:border-gray-200">
                    <div className="bg-white p-3 rounded-full shadow-sm h-fit">
                        <MapPin className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Dirección de Envío</span>
                        <p className="text-gray-800 font-medium 3xlm:text-base 4xl:text-lg">
                            {session?.address || <span className="italic opacity-60">Sin dirección registrada</span>} {session?.address_number || ''}
                        </p>
                        {(session?.province || session?.district) && (
                            <p className="text-sm 3xlm:text-base 4xl:text-lg text-gray-500 mt-1">
                                {session?.province ?? session?.district}, {session?.department}, {session?.country} {session?.zip_code && ` - C.P. ${session.zip_code}`}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL DE EDICIÓN */}
            <ReactModal 
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 sm:p-10 pt-12 rounded-3xl shadow-2xl w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto font-dmsans focus:outline-none custom-scrollbar"
                overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
            >
                {/* Botón X posicionado absoluto arriba a la derecha */}
                <button 
                    onClick={() => setModalOpen(false)} 
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors z-20"
                    title="Cerrar"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="mb-6 border-b border-gray-100 pb-4">
                    <h3 className="text-2xl font-bold font-sora text-black">Editar Información</h3>
                </div>

                <form onSubmit={onModalSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-4">
                    
                    {/* Datos Básicos */}
                    <div>
                        <label className="block mb-2 text-sm 3xlm:text-base 4xl:text-lg font-medium text-gray-700">Nombres <b className="text-red-500">*</b></label>
                        <input ref={nameRef} type="text" className={inputClass} required defaultValue={session.name} />
                    </div>
                    
                    <div>
                        <label className="block mb-2 text-sm 3xlm:text-base 4xl:text-lg font-medium text-gray-700">Apellidos <b className="text-red-500">*</b></label>
                        <input ref={lastnameRef} type="text" className={inputClass} required defaultValue={session.lastname} />
                    </div>

                    <div className="md:col-span-2 grid grid-cols-2 gap-5">
                        <div>
                            <label className="block mb-2 text-sm 3xlm:text-base 4xl:text-lg font-medium text-gray-700">Mes de nacimiento <b className="text-red-500">*</b></label>
                            <select ref={birthMonthRef} className={inputClass} onChange={(e) => setMonth(e.target.value)} value={month} required>
                                <option value="01">Enero</option><option value="02">Febrero</option><option value="03">Marzo</option>
                                <option value="04">Abril</option><option value="05">Mayo</option><option value="06">Junio</option>
                                <option value="07">Julio</option><option value="08">Agosto</option><option value="09">Septiembre</option>
                                <option value="10">Octubre</option><option value="11">Noviembre</option><option value="12">Diciembre</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm 3xlm:text-base 4xl:text-lg font-medium text-gray-700">Día <b className="text-red-500">*</b></label>
                            <select ref={birthDayRef} className={inputClass} defaultValue={session.birth_day} required>
                                {arrayDays.map((day) => <option key={day} value={day}>{day}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 text-sm 3xlm:text-base 4xl:text-lg font-medium text-gray-700">Correo (No editable)</label>
                        <input type="text" className={disabledClass} defaultValue={session.email} disabled />
                    </div>
                    
                    <div>
                        <label className="block mb-2 text-sm 3xlm:text-base 4xl:text-lg font-medium text-gray-700">Teléfono <b className="text-red-500">*</b></label>
                        <input ref={phoneRef} type="tel" className={inputClass} required defaultValue={session.phone} />
                    </div>

                    {/* Datos de Dirección */}
                    <div className="md:col-span-2 mt-4 pt-4 border-t border-gray-100">
                        <h4 className="font-bold font-sora text-gray-800 mb-1">Dirección de Envío</h4>
                        <p className="text-sm 3xlm:text-base 4xl:text-lg text-gray-500 mb-4">La información de Región y Distrito se configura durante el proceso de compra.</p>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block mb-2 text-sm 3xlm:text-base 4xl:text-lg font-medium text-gray-700">Dirección de Calle <b className="text-red-500">*</b></label>
                        <input ref={addressRef} type="text" className={inputClass} required defaultValue={session.address} placeholder="Ej: Av. Los Rosales" />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm 3xlm:text-base 4xl:text-lg font-medium text-gray-700">Número / Lote <b className="text-red-500">*</b></label>
                        <input ref={addressNumberRef} type="text" className={inputClass} required defaultValue={session.address_number} placeholder="Ej: 123" />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm 3xlm:text-base 4xl:text-lg font-medium text-gray-700">Referencia / Depto <b className="text-red-500">*</b></label>
                        <input ref={addressReferenceRef} type="text" className={inputClass} required defaultValue={session.address_reference} placeholder="Ej: Frente al parque, piso 3" />
                    </div>

                    {/* Campos de Sólo Lectura (Info Geográfica) */}
                    <div className="grid grid-cols-3 gap-3 md:col-span-2 mt-2">
                        <div>
                            <label className="block mb-1 text-xs 3xlm:text-sm 4xl:text-base font-medium text-gray-500">País</label>
                            <input type="text" className={`${disabledClass} !p-2 !text-xs !3xlm:text-sm !4xl:text-base`} defaultValue="Perú" disabled />
                        </div>
                        <div>
                            <label className="block mb-1 text-xs 3xlm:text-sm 4xl:text-base font-medium text-gray-500">Departamento</label>
                            <input type="text" className={`${disabledClass} !p-2 !text-xs !3xlm:text-sm !4xl:text-base`} defaultValue={session.department || '-'} disabled />
                        </div>
                        <div>
                            <label className="block mb-1 text-xs 3xlm:text-sm 4xl:text-base font-medium text-gray-500">Distrito/Prov.</label>
                            <input type="text" className={`${disabledClass} !p-2 !text-xs !3xlm:text-sm !4xl:text-base`} defaultValue={session.district || session.province || '-'} disabled />
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="md:col-span-2 mt-8 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end border-t border-gray-100 pt-6">
                        <button 
                            type="button" 
                            onClick={() => setModalOpen(false)} 
                            className="px-6 py-3.5 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors w-full sm:w-auto text-center"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white bg-[#FF9900] hover:bg-opacity-90 shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02] w-full sm:w-auto"
                        >
                            <Save className="w-5 h-5" /> Guardar Cambios
                        </button>
                    </div>
                </form>
            </ReactModal>
        </div>
    );
};

export default Information;