import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import HtmlContent from "../../Utils/HtmlContent";
import GeneralRest from "../../actions/GeneralRest";

ReactModal.setAppElement("#app");

const Footer = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => setModalOpen(false);
    const generalRest = new GeneralRest();

    const [socials, setSocials] = useState([]);
    const [aboutuses, setAboutuses] = useState(null);

    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const [socialData, aboutData] = await Promise.all([
                    generalRest.getSocials(),
                    generalRest.getAboutuses()
                ]);
                setSocials(socialData);
                setAboutuses(aboutData);
            } catch (error) {
                console.error("Error fetching footer data:", error);
            }
        };

        fetchFooterData();
    }, []); 

    const TikTok = socials.find((social) => social.description === "TikTok");
    const WhatsApp = socials.find((social) => social.description === "WhatsApp");
    const Instagram = socials.find((social) => social.description === "Instagram");
    const Facebook = socials.find((social) => social.description === "Facebook");

    const aboutusData = aboutuses?.aboutus || [];
    const generalsData = aboutuses?.generals || [];

    const telefono = generalsData.find((item) => item.correlative === "support_phone")?.description;
    const direccion = generalsData.find((item) => item.correlative === "address")?.description;
    const distrito = generalsData.find((item) => item.correlative === "district")?.description;
    const mail = generalsData.find((item) => item.correlative === "support_email")?.description;
    const termsConditions = generalsData.find((item) => item.correlative === "terms_conditions")?.description;

    return (
        <>
            <footer className="bg-[#131e2e] text-white">
                <div className="px-[5%] py-10 lg:py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 lg:gap-8">
                        
                        <div className="w-full sm:col-span-6 flex flex-col gap-6 sm:gap-4 2xl:gap-5 4xl:gap-6 justify-start">
                            <a href="/">
                                <img
                                    src="/assets/img/logofooter.webp"
                                    alt="Apunto Motors Logo"
                                    loading="lazy"
                                    className="h-24 4xl:h-28 object-cover -mt-2"
                                />
                            </a>

                            <div className="flex flex-col gap-0">
                                <p className="font-dmsans text-white text-opacity-70 text-sm 2xl:text-base 4xl:text-lg">{direccion}, {distrito}</p>
                            </div>
                            
                            <div className="flex flex-row gap-5 max-w-md">
                                <div className="flex flex-col gap-1">
                                    <p className="font-dmsans text-white text-opacity-70 text-sm 2xl:text-base 4xl:text-lg">Teléfono móvil</p>
                                    <a href={`tel:${telefono}`} className="font-dmsans text-white text-sm 2xl:text-base 4xl:text-lg">{telefono}</a>
                                </div>
                            </div>
                        </div>

                        <div className="w-full sm:col-span-2 md:col-span-6 sm:pl-5 md:pl-0 lg:col-span-2">
                            <h2 className="font-dmsans text-white text-opacity-70 text-sm 2xl:text-base 4xl:text-lg">Menú</h2>
                            <nav className="flex flex-col gap-1 2xl:gap-2 4xl:gap-4 mt-3 sm:mt-5">
                                <a href="/" className="cursor-pointer hover:opacity-85 transition-opacity font-dmsans text-white text-sm 2xl:text-base 4xl:text-lg">Inicio</a>
                                <a href="/nosotros" className="cursor-pointer hover:opacity-85 transition-opacity font-dmsans text-white text-sm 2xl:text-base 4xl:text-lg">Nosotros</a>
                                <a href="/servicios" className="cursor-pointer hover:opacity-85 transition-opacity font-dmsans text-white text-sm 2xl:text-base 4xl:text-lg">Servicios</a>
                                <a href="/contacto" className="cursor-pointer hover:opacity-85 transition-opacity font-dmsans text-white text-sm 2xl:text-base 4xl:text-lg">Contacto</a>
                            </nav>
                        </div>

                        <div className="w-full sm:col-span-2 md:col-span-6 lg:col-span-2">
                            <h2 className="font-dmsans text-white text-opacity-70 text-sm 2xl:text-base 4xl:text-lg">Servicio al cliente</h2>
                            <nav className="flex flex-col gap-1 2xl:gap-2 4xl:gap-4 mt-3 sm:mt-5">
                                <a href="/terminos-y-condiciones" className="cursor-pointer hover:opacity-85 transition-opacity font-dmsans text-white text-sm 2xl:text-base 4xl:text-lg">Términos y Condiciones</a>
                                <a href="/politicas-de-privacidad" className="cursor-pointer hover:opacity-85 transition-opacity font-dmsans text-white text-sm 2xl:text-base 4xl:text-lg">Políticas de privacidad</a>
                                <div className="flex flex-col gap-1 mt-3"> 
                                    <a href="/libro-de-reclamaciones" aria-label="Acceder al Libro de Reclamaciones">
                                        <img
                                            src="/assets/img/footer/libro-reclamaciones.png"
                                            alt="Libro de Reclamaciones"
                                            loading="lazy"
                                            className="w-40 h-auto"
                                        />
                                    </a> 
                                </div>            
                            </nav>
                        </div>
                        
                        <div className="w-full sm:col-span-2 md:col-span-6 lg:col-span-2 flex flex-col">
                            <h2 className="font-dmsans text-white text-opacity-70 text-sm 2xl:text-base 4xl:text-lg">Redes Sociales</h2>

                            <div className="flex flex-row justify-end gap-4 max-w-32 mt-3 sm:mt-5">
                                {Instagram && (
                                    <a href={Instagram.link} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                        <div className="w-9 4xl:w-10 h-full aspect-square p-2 bg-white rounded-full flex justify-center items-center">
                                            <i className="fa-brands fa-instagram text-[#131e2e] text-2xl 4xl:text-2xl"></i>
                                        </div>
                                    </a>
                                )}

                                {Facebook && (
                                    <a href={Facebook.link} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                        <div className="w-9 4xl:w-10 h-full aspect-square p-2 bg-white rounded-full flex justify-center items-center">
                                            <i className="fa-brands fa-facebook text-[#131e2e] text-2xl 4xl:text-2xl"></i>
                                        </div>
                                    </a>
                                )}

                                {WhatsApp && (
                                    <a href={WhatsApp.link} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                                        <div className="w-9 4xl:w-10 h-full aspect-square p-2 bg-white rounded-full flex justify-center items-center">
                                            <i className="fa-brands fa-whatsapp text-[#131e2e] text-2xl 4xl:text-2xl"></i>
                                        </div>
                                    </a>
                                )}
                            </div>

                            <div className="flex flex-col gap-1 mt-3 sm:mt-5">
                                <span className="font-dmsans text-white text-opacity-70 text-sm 2xl:text-base 4xl:text-lg">Email</span>
                                <a href={`mailto:${mail}`} className="font-dmsans text-white text-sm 2xl:text-base 4xl:text-lg">{mail}</a>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="border-t border-white border-opacity-20 mx-[5%] py-5">
                    <div className="flex items-center justify-start">
                        <p className="text-center font-dmsans text-white text-opacity-70 text-[15px] 4xl:text-lg">
                            Copyright © {new Date().getFullYear()} Apunto Motors | Todos los derechos reservados
                        </p>
                    </div>
                </div>
            </footer>

            <ReactModal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                contentLabel="Términos y condiciones"
                className="absolute left-1/2 -translate-x-1/2 bg-white p-6 rounded shadow-lg w-[95%] max-w-2xl my-8 outline-none h-[90vh]"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
            >
                <button onClick={closeModal} className="float-right text-gray-500 hover:text-gray-900">
                    Cerrar
                </button>
                <h2 className="text-xl font-bold mb-4">Términos y Condiciones</h2>
                <HtmlContent
                    className="prose h-[calc(90vh-120px)] lg:h-[calc(90vh-90px)] overflow-auto"
                    html={termsConditions}
                />
            </ReactModal>
        </>
    );
};

export default Footer;