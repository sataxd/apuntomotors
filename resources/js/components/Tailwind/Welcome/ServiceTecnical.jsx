import HtmlContent from "../../../Utils/HtmlContent";

const ServiceTecnical = ({ indeci = true, marginTop = true, dataAbout }) => {
    const aboutusData = dataAbout || [];

    const sixtSection = aboutusData.find(
        (item) => item.correlative === "home-tecnician-title"
    );

    const sevenSection = aboutusData.find(
        (item) => item.correlative === "home-tecnico-section"
    );
    
    return (
        <div className="relative overflow-hidden bg-white">
            <div className={`relative w-full px-[5%] 4xl:px-[8%] gap-10 xl:gap-16 flex flex-col items-center ${
                marginTop 
                    ? "py-10 xl:py-20" 
                    : "py-10 xl:pb-20" 
            }`}>
                {!!sixtSection?.visible && (
                    <div className="w-full flex flex-col items-center justify-center gap-5 max-w-3xl 4xl:max-w-4xl text-center">
                        <h2 className="font-sora text-[#131e2e] text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                            {sixtSection?.name}
                        </h2>
                    </div>
                )}   

                {!!sevenSection?.visible && (
                    <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 2xl:gap-20 w-full items-center justify-center">
                        <div className="w-full xl:w-1/2 flex flex-col gap-2 justify-center items-start order-2 lg:order-1">
                            <h3 className="font-sora text-[#324050] text-3xl sm:text-4xl 2xl:text-4xl 4xl:text-5xl font-semibold tracking-tight !leading-tight mb-3">
                                {sevenSection?.name}
                            </h3>
                            <HtmlContent
                                className="prose font-dmsans text-[#324050] text-base 2xl:text-lg 4xl:text-xl tracking-normal font-light"
                                html={sevenSection?.description}
                            />
                            <div className="flex flex-row mt-2">
                                <a 
                                    href={sevenSection?.button_link}
                                    aria-label={`Más información sobre ${sevenSection?.name}`}
                                    className="bg-[#7c231c] cursor-pointer hover:animate-wiggle font-dmsans border-[2px] text-white flex flex-row items-center px-3 md:px-6 py-2 text-base 2xl:text-lg 4xl:text-xl rounded-xl font-medium"
                                >
                                    {sevenSection?.button_text}
                                </a>
                            </div>
                        </div>
                        <div className="w-full xl:w-1/2 flex flex-col justify-center items-center order-1 lg:order-2">
                            <div className="relative h-[250px] sm:h-[450px] 4xl:h-[450px] overflow-hidden rounded-xl xl:rounded-2xl 4xl:rounded-3xl group">
                                <img 
                                    src={`/api/aboutus/media/${sevenSection?.image}`} 
                                    alt={sevenSection?.name} 
                                    loading="lazy"
                                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" 
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceTecnical;