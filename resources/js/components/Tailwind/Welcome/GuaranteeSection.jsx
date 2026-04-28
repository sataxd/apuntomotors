import React, { useEffect, useState } from "react";
import GeneralRest from "../../../actions/GeneralRest";

const GuaranteeSection = () => {
    const generalRest = new GeneralRest();
    const message = "Hola! Estoy interesada en la garantía weFem. ☺️";
    const [socials, setSocials] = useState([]);

    useEffect(() => {
        const fetchSocials = async () => {
            try {
                const data = await generalRest.getSocials();
                setSocials(data);
            } catch (error) {
                console.error("Error fetching socials:", error);
            }
        };

        fetchSocials();
    }, []); // Asegúrate de que este array de dependencias está vacío si solo se ejecuta una vez

    const WhatsApp = socials.find(
        (social) => social.description === "WhatsApp Garantía"
    );

    return (
        <section className="bg-[#FF9900] text-white mt-6 lg:mt-0 h-[168px] md:h-[308px] lg:h-[110.178px] 2xl:h-[164.178px] flex items-center">
            <div className="px-[5%] w-full xl:max-w-[66rem] 2xl:max-w-7xl xl:px-0 mx-auto flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-3 lg:gap-[2%]">
                <div className="flex items-center w-max">
                    <div className="bg-[#6745BA] rounded-full px-2 py-2 mr-2">
                        <img
                            className="h-[30px] sm:h-[35.16px] md:h-[50px] xl:h-[35.16px]  2xl:h-[43.16px]"
                            src="https://i.ibb.co/HLXD6gTx/image.png"
                            alt="Garantía WEFEM"
                        />
                    </div>
                    <h2
                        className="text-[40.53px]  sm:text-[48.53px] xl:text-[50.53px] 2xl:text-[72.53px] leading-[0.53px] md:leading-[72.53px] tracking-[0.01em] font-bebas"
                        style={{ textShadow: "4px 3px 0px #6745BA" }}
                    >
                        GARANTÍA WEFEM
                    </h2>
                </div>

                <p className={`${WhatsApp ? 'text-center' : 'text-end'} text-[10.95px] sm:text-[12.95px] md:text-[22.95px] leading-[15.33px]  md:leading-[26.33px]  lg:text-[14px] xl:text-[15px]  2xl:text-[19px] xl:leading-[20.33px]  2xl:leading-[26.33px] tracking-[0.01em] w-10/12 lg:w-[38%]`}>
                    Si encuentras una copa o disco certificado a un mejor
                    precio,
                    <strong> nosotros te mejoramos la oferta.</strong>
                </p>
                {WhatsApp && (
                    <a
                        className="w-[180.94px] lg:w-[311.94px]  text-[12px] md:text-[14.77px] lg:text-[16.77px] 2xl:text-[18.77px] h-[30px] md:h-[50.11px] xl:w-[268.06px] bg-transparent text-white font-semibold  border border-white rounded-md lg:rounded-xl shadow xl:h-[45.36px] flex items-center justify-center"
                        target="_blank"
                        id="whatsapp-toggle"
                        href={WhatsApp.link}
                    >
                        ¡Escríbenos aquí!
                    </a>
                )}
            </div>
        </section>
    );
};

export default GuaranteeSection;
