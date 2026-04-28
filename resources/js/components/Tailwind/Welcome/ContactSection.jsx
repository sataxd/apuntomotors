import { useEffect, useState, useRef, useContext } from "react";
import GeneralRest from "../../../actions/GeneralRest";
import ContactForm from "../../Contact/ContactForm";
import HtmlContent from "../../../Utils/HtmlContent";
import { LoadingContext } from "../Base";

const generalRest = new GeneralRest();

const ContactSection = ({tieneMargen = false}) => {
   
    const bgVariable = tieneMargen ? "mt-[70px]" : "mt-0";
    const { registerTask, completeTask } = useContext(LoadingContext);
    const [aboutuses, setAboutuses] = useState(null);
                
    useEffect(() => {
        const fetchAboutuses = async () => {
            registerTask("ContactSection");
            try {
                const data = await generalRest.getAboutuses();
                setAboutuses(data);
            } catch (error) {
                console.error("Error fetching about:", error);
            } finally {
                completeTask("ContactSection");
            }
        };

        fetchAboutuses();
    }, [registerTask, completeTask]);

    const aboutusData = aboutuses?.aboutus || [];
    const generalsData = aboutuses?.generals || [];

    const tenSection = aboutusData.find(
        (item) => item.correlative === "home-contact-section"
    );

    const elevenSection = generalsData.find(
        (item) => item.correlative === "support_email"
    );

    const twuelveSection = generalsData.find(
        (item) => item.correlative === "support_phone"
    );

    const thirtenSection = generalsData.find(
        (item) => item.correlative === "address"
    );

    const fourteenSection = generalsData.find(
        (item) => item.correlative === "district"
    );
    
    return (

        <div className="relative overflow-hidden">
            <div className={`relative w-full px-[5%] 4xl:px-[8%] gap-10 xl:gap-16 flex flex-col items-center py-10 xl:py-16 bg-[#0b0b0b] ${bgVariable}`}>

                    <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 2xl:gap-20 w-full items-center justify-center">
                        <div className="w-full xl:w-1/2 flex flex-col gap-2 justify-center items-start">
                            
                            <h3 className="font-sora text-white text-3xl sm:text-4xl 2xl:text-4xl 4xl:text-5xl font-semibold tracking-tight !leading-tight mb-3">
                                {tenSection?.name}
                            </h3>
                            <HtmlContent
                                className="font-dmsans text-white text-base 2xl:text-lg 4xl:text-xl tracking-normal font-light"
                                html={tenSection?.description}
                            />
                            <div className="flex flex-col gap-3 w-full max-w-md my-3">
                                <div className="flex flex-row gap-3 border border-gray-100 border-opacity-20 rounded-2xl p-3 bg-gray-900 bg-opacity-10 group">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border border-gray-100 border-opacity-20 rounded-md px-2 bg-gray-900 bg-opacity-10">
                                            <i className="mdi mdi-email-outline text-[22px] text-white"></i> 
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between w-full">
                                        <div className="flex flex-col">
                                            <h2 className="font-sora font-medium text-white text-sm 2xl:text-base">Correo Electrónico</h2>
                                            <p className="font-dmsans text-white text-sm 2xl:text-base">{elevenSection?.description}</p>
                                        </div>
                                        <div className="flex flex-row justify-center items-center">
                                            <div className="rounded-full w-9 h-9 flex flex-row justify-center items-center bg-gray-300 bg-opacity-10">
                                                <i className="mdi mdi-arrow-top-right text-[22px] text-white group-hover:rotate-45 transition-all duration-500"></i> 
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-3 border border-gray-100 border-opacity-20 rounded-2xl p-3 bg-gray-900 bg-opacity-10 group">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border border-gray-100 border-opacity-20 rounded-md px-2 bg-gray-900 bg-opacity-10">
                                            <i className="mdi mdi-cellphone text-[22px] text-white"></i> 
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between w-full">
                                        <div className="flex flex-col">
                                            <h2 className="font-sora font-medium text-white text-sm 2xl:text-base">Teléfono móvil</h2>
                                            <p className="font-dmsans text-white text-sm 2xl:text-base">{twuelveSection?.description}</p>
                                        </div>
                                        <div className="flex flex-row justify-center items-center">
                                            <div className="rounded-full w-9 h-9 flex flex-row justify-center items-center bg-gray-300 bg-opacity-10">
                                                <i className="mdi mdi-arrow-top-right text-[22px] text-white group-hover:rotate-45 transition-all duration-500"></i> 
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row gap-3 border border-gray-100 border-opacity-20 rounded-2xl p-3 bg-gray-900 bg-opacity-10 group">
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="border border-gray-100 border-opacity-20 rounded-md px-2 bg-gray-900 bg-opacity-10">
                                            <i className="mdi mdi-map-marker-outline text-[22px] text-white"></i> 
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between w-full">
                                        <div className="flex flex-col">
                                            <h2 className="font-sora font-medium text-white text-sm 2xl:text-base">Dirección</h2>
                                            <p className="font-dmsans text-white text-sm 2xl:text-base">{thirtenSection?.description} - {fourteenSection?.description}</p>
                                        </div>
                                        <div className="flex flex-row justify-center items-center">
                                            <div className="rounded-full w-9 h-9 flex flex-row justify-center items-center bg-gray-300 bg-opacity-10">
                                                <i className="mdi mdi-arrow-top-right text-[22px] text-white group-hover:rotate-45 transition-all duration-500"></i> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            
                        </div>
                        
                        <div className="w-full xl:w-1/2 flex flex-col justify-center items-center">
                            <ContactForm title={tenSection?.subtitle} button={tenSection?.button_text} />
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default ContactSection;
