import React, { useRef, useState } from 'react';
import { Mail, User, MessageSquare, ArrowUpRight, PhoneCallIcon, Wrench } from 'lucide-react';
import MessagesRest from '../../Actions/MessagesRest';
import Swal from 'sweetalert2';

const messagesRest = new MessagesRest()

const servicesList = [
  'Mantenimiento preventivo y correctivo',
  'Suspensión, Dirección, Frenos y Embragues',
  'Diagnóstico computarizado',
  'Reparación de motor',
  'Aire acondicionado',
  'Luces en general',
  'Full TUNING',
  'Tratamiento de pintura',
  'Limpieza de inyectores ultrasonido',
  'Otro servicio / Consulta general',
];

const ContactForm = ({ title, button}) => {

  const nameRef = useRef()
  const emailRef = useRef()
  const subjectRef = useRef()
  const serviceRef = useRef()
  const descriptionRef = useRef()

  const [sending, setSending] = useState(false);

  const onMessageSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    const selectedService = serviceRef.current?.value || 'No especificado';
    const userMessage = descriptionRef.current?.value || '';

    const request = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      description: `Servicio solicitado: ${selectedService}\n\n${userMessage}`
    }

    const result = await messagesRest.save(request);
    setSending(false)

    if (!result) return

    // Registrar conversión de Google Ads (Solicitud de presupuesto)
    if (typeof window.gtag_report_conversion === 'function') {
      window.gtag_report_conversion();
    }

    Swal.fire({
      icon: 'success',
      title: 'Mensaje enviado',
      text: 'Tu solicitud de presupuesto ha sido enviada correctamente. ¡Nos pondremos en contacto contigo pronto!',
      showConfirmButton: false,
      timer: 3000
    })

    nameRef.current.value = null
    emailRef.current.value = null
    subjectRef.current.value = null
    if (serviceRef.current) serviceRef.current.value = ''
    descriptionRef.current.value = null
  }

  return (
    <form className="w-full relative max-w-lg 2xl:max-w-xl rounded-3xl bg-[#131e2e] shadow-2xl shadow-[#131e2e]/30 border border-[#22334a] overflow-hidden" onSubmit={onMessageSubmit}>
      <div className="relative w-full p-7 sm:p-10 md:py-10 md:px-9 mx-auto z-10 flex flex-col gap-5">
        
        <h2 className="font-sora text-white text-2xl 2xl:text-3xl 4xl:text-4xl font-semibold tracking-tight !leading-tight">
          {title}
        </h2>

        <div className="flex flex-col space-y-4 text-sm" >
          
          <div className="flex items-center bg-white/10 hover:bg-white/15 focus-within:bg-white/15 focus-within:ring-2 focus-within:ring-[#dc2626] border border-white/15 rounded-xl w-full transition-all">
            <User className="ml-3.5 text-gray-300 shrink-0" size={20} />
            <input
              ref={nameRef}
              type="text"
              aria-label="Nombres y Apellidos"
              placeholder="Nombres y/o Apellidos"
              className="flex-grow text-white placeholder-gray-400 p-2.5 outline-none w-full rounded-xl font-dmsans text-base 2xl:text-lg bg-transparent"
              disabled={sending}
              required
            />
          </div>
          
          <div className="flex items-center bg-white/10 hover:bg-white/15 focus-within:bg-white/15 focus-within:ring-2 focus-within:ring-[#dc2626] border border-white/15 rounded-xl w-full transition-all">
            <Mail className="ml-3.5 text-gray-300 shrink-0" size={20} />
            <input
              ref={emailRef}
              type="email"
              aria-label="Correo electrónico"
              placeholder="Correo electrónico"
              className="flex-grow text-white placeholder-gray-400 p-2.5 outline-none w-full rounded-xl font-dmsans text-base 2xl:text-lg bg-transparent"
              disabled={sending}
              required
            />
          </div>

          <div className="flex items-center bg-white/10 hover:bg-white/15 focus-within:bg-white/15 focus-within:ring-2 focus-within:ring-[#dc2626] border border-white/15 rounded-xl w-full transition-all">
            <PhoneCallIcon className="ml-3.5 text-gray-300 shrink-0" size={20} />
            <input
              ref={subjectRef}
              type="tel"
              aria-label="Teléfono móvil"
              placeholder="Teléfono móvil"
              className="flex-grow text-white placeholder-gray-400 p-2.5 outline-none w-full rounded-xl font-dmsans text-base 2xl:text-lg bg-transparent"
              disabled={sending}
              required
            />
          </div>

          <div className="flex items-center bg-white/10 hover:bg-white/15 focus-within:bg-white/15 focus-within:ring-2 focus-within:ring-[#dc2626] border border-white/15 rounded-xl w-full transition-all">
            <Wrench className="ml-3.5 text-gray-300 shrink-0" size={20} />
            <select
              ref={serviceRef}
              aria-label="Tipo de servicio"
              className="flex-grow text-white p-2.5 outline-none w-full rounded-xl font-dmsans text-base 2xl:text-lg bg-transparent cursor-pointer [&>option]:bg-[#131e2e] [&>option]:text-white"
              disabled={sending}
              defaultValue=""
              required
            >
              <option value="" disabled className="text-gray-400">Seleccionar tipo de servicio...</option>
              {servicesList.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-start bg-white/10 hover:bg-white/15 focus-within:bg-white/15 focus-within:ring-2 focus-within:ring-[#dc2626] border border-white/15 rounded-xl w-full transition-all">
            <MessageSquare className="ml-3.5 mt-3 text-gray-300 shrink-0" size={20} />
            <textarea
              ref={descriptionRef}
              aria-label="Detalle de solicitud o consulta"
              placeholder="Detalle o consulta sobre su vehículo"
              className="min-h-[80px] flex-grow text-white placeholder-gray-400 p-2.5 outline-none w-full rounded-xl font-dmsans text-base 2xl:text-lg bg-transparent"
              style={{ fieldSizing: 'content' }}
              disabled={sending}
              required
            />
          </div>
        </div>

        <button className="group flex items-center justify-center bg-[#dc2626] hover:bg-[#b91c1c] text-white font-dmsans font-semibold gap-2 px-8 py-3.5 text-base 2xl:text-lg rounded-xl shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-max disabled:cursor-not-allowed disabled:opacity-50 mt-1" disabled={sending}>
          <span>{button}</span>
          <ArrowUpRight className='text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300' size={20} />
        </button>

      </div>
    </form>
  );
};

export default ContactForm;
