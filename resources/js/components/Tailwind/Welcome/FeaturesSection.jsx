const FeaturesSection = () => {
    return (
        <section
            className={`bg-[#EFE5FF]  overflow-hidden ${location.pathname == "/"
                    ? "md:pt-8 md:pb-0 2xl:pt-6 "
                    : "md:py-4"
                }`}
        >
            <div className="px-[5%] mx-auto relative">
                <div className="grid items-center content-center px-[5%] lg:px-0 2xl:px-14 mt-6 lg:mt-4  grid-cols-2 gap-x-[5%] gap-y-[2.5%] sm:max-w-[608px] lg:flex w-full lg:max-w-[72rem] 2xl:max-w-[84rem] mx-auto whitespace-nowrap transition-none">
                    <div className="flex items-center gap-2 md:gap-3 justify-center w-full">
                        <div className="relative z-10 h-max ">
                            <img
                                src="/assets/img/highlights/truck.png"
                                alt="Envíos a todo el Perú"
                                className="w-7 h-7 lg:w-11 lg:h-11
                                 object-contain"
                            />
                        </div>
                        <div className="w-9/12">
                            <h3 className="text-[9.33px]  md:text-[15.33px] lg:text-[18.4px] font-bold leading-[20.88px] w-full text-[#212529]">
                                Envíos a todo el Perú
                            </h3>
                            <p className="h-[26px] md:h-[56px] md:mt-1 text-[7.3px]  md:text-[12.3px] 2xl:text-[15.33px] leading-tight break-words whitespace-normal text-[#444444]">
                                Recibe tus productos <br /> hasta en 24 horas.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center  gap-2 md:gap-3 w-full">
                        <div className="relative z-10 h-max ">
                            <img
                                src="/assets/img/highlights/clock.png"
                                alt="Protege hasta 12 horas"
                                className="w-7 h-7 lg:w-11 lg:h-11 object-contain"
                            />
                        </div>
                        <div className="w-9/12">
                            <h3 className="text-[9.33px]  md:text-[15.33px] lg:text-[18.4px] font-bold leading-[20.88px] w-full text-[#212529]">
                                Protege hasta 12 horas
                            </h3>
                            <p className="h-[26px] md:h-[56px] md:mt-1 text-[7.3px]  md:text-[12.3px] 2xl:text-[15.33px]  leading-tight break-words whitespace-normal text-[#444444]">
                                Siéntete más segura de <br /> día y de noche.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3 justify-center  w-full">
                        <div className="relative z-10 h-max ">
                            <img
                                src="/assets/img/highlights/gota.png"
                                alt="Hipoalergénica"
                                className="w-7 h-7 lg:w-11 lg:h-11 object-contain"
                            />
                        </div>
                        <div className="w-9/12">
                            <h3 className="text-[9.33px]  md:text-[15.33px] lg:text-[18.4px] font-bold leading-[20.88px] w-full text-[#212529]">
                                Hipoalergénica
                            </h3>
                            <p className="h-[26px] md:h-[56px] md:mt-1 text-[7.3px]  md:text-[12.3px] 2xl:text-[15.33px] leading-tight break-words whitespace-normal text-[#444444]">
                                Suaves para la piel y reducen
                                el riesgo de irritación o alergias.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-3 justify-center  w-full">
                        <div className="relative z-10 h-max ">
                            <img
                                src="/assets/img/highlights/heart.png"
                                alt="Libre de BPA"
                                className="w-7 h-7 lg:w-11 lg:h-11 object-contain"
                            />
                        </div>
                        <div className="w-9/12">
                            <h3 className="text-[9.33px]  md:text-[15.33px] lg:text-[18.4px] font-bold leading-[20.88px] w-full text-[#212529]">
                                Libre de BPA
                            </h3>
                            <p className="h-[26px] md:h-[56px] md:mt-1 text-[7.3px]  md:text-[12.3px] 2xl:text-[15.33px] leading-tight break-words whitespace-normal text-[#444444]">
                                Silicona certificada <br /> por la FDA y
                                DIGEMID.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
