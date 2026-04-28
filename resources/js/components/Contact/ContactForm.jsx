import React, { useRef, useState } from 'react';
import { Mail, User, MessageSquare, ArrowUpRight, PhoneCallIcon } from 'lucide-react';
import MessagesRest from '../../Actions/MessagesRest';
import Swal from 'sweetalert2';

const messagesRest = new MessagesRest()

const ContactForm = ({ title, button}) => {

  const nameRef = useRef()
  const emailRef = useRef()
  const subjectRef = useRef()
  const descriptionRef = useRef()

  const [sending, setSending] = useState(false);

  const onMessageSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    const request = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      subject: subjectRef.current.value,
      description: descriptionRef.current.value
    }

    const result = await messagesRest.save(request);
    setSending(false)

    if (!result) return

    Swal.fire({
      icon: 'success',
      title: 'Mensaje enviado',
      text: 'Tu mensaje ha sido enviado correctamente. ¡Nos pondremos en contacto contigo pronto!',
      showConfirmButton: false,
      timer: 3000
    })

    nameRef.current.value = null
    emailRef.current.value = null
    subjectRef.current.value = null
    descriptionRef.current.value = null
  }

  return (
    <form className="w-full relative max-w-lg 2xl:max-w-xl" onSubmit={onMessageSubmit}>
      <div className='absolute w-full h-full bg-white bg-opacity-5 z-0 rounded-2xl'></div>
      <div className="relative w-full p-[6%] sm:p-10 md:py-9 md:px-8 mx-auto z-10 flex flex-col gap-5">
        
        <h2 className="font-sora text-white text-2xl 2xl:text-3xl 4xl:text-4xl font-semibold tracking-tight !leading-tight">
          {title}
        </h2>

        <div className="flex flex-col space-y-4 text-sm text-black" >
          
          <div className="flex items-center bg-white bg-opacity-5 rounded-md w-full">
            <User className="ml-3 text-gray-400" size={20} />
            <input
              ref={nameRef}
              type="text"
              placeholder="Nombres y/o Apellidos"
              className="flex-grow text-white p-2 outline-none w-full rounded-md font-dmsans text-base 2xl:text-lg 4xl:text-xl bg-transparent"
              disabled={sending}
              required
            />
          </div>
          
          <div className="flex items-center bg-white bg-opacity-5 rounded-md w-full">
            <Mail className="ml-3 text-gray-400" size={20} />
            <input
              ref={emailRef}
              type="email"
              placeholder="Correo electrónico"
              className="flex-grow text-white p-2 outline-none w-full rounded-md font-dmsans text-base 2xl:text-lg 4xl:text-xl bg-transparent"
              disabled={sending}
              required
            />
          </div>

          <div className="flex items-center bg-white bg-opacity-5 rounded-md w-full">
            <PhoneCallIcon className="ml-3 text-gray-400" size={20} />
            <input
              ref={subjectRef}
              type="text"
              placeholder="Teléfono móvil"
              className="flex-grow text-white p-2  outline-none w-full rounded-md font-dmsans text-base 2xl:text-lg 4xl:text-xl bg-transparent"
              disabled={sending}
              required
            />
          </div>

          <div className="flex items-start bg-white bg-opacity-5 rounded w-full">
            <MessageSquare className="ml-3 mt-3 text-gray-400" size={20} />
            <textarea
              ref={descriptionRef}
              placeholder="Mensaje"
              className="min-h-[70px] flex-grow text-white p-2 outline-none w-full rounded-md font-dmsans text-base 2xl:text-lg 4xl:text-xl bg-transparent"
              style={{ fieldSizing: 'content' }}
              disabled={sending}
              required
            />
          </div>
        </div>

        <button className="group flex items-center justify-center border-[1.5px] border-white border-opacity-50 text-white hover:text-black font-dmsans gap-2 px-6 py-2.5  text-base 2xl:text-lg 4xl:text-xl rounded-xl font-medium hover:bg-white transition-colors duration-300 w-max disabled:cursor-not-allowed disabled:opacity-50" disabled={sending}>
          <span>{button}</span>
          <ArrowUpRight className='text-white group-hover:text-black' size={20} />
        </button>

      </div>
    </form>
  );
};

export default ContactForm;
