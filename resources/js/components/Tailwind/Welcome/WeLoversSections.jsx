import React, { useEffect, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import TestimonyRest from "../../../actions/TestimonyRest";

const WeLoversSection = ({ we_lovers }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedVideo, setSelectedVideo] = useState(
        we_lovers[0].description
    );
    const [isPlaying, setIsPlaying] = useState(false);

    // Precarga thumbnails al iniciar
    useEffect(() => {
        we_lovers.forEach((video) => {
            const img = new Image();
            img.src = `https://img.youtube.com/vi/${video.description}/mqdefault.jpg`;
        });
    }, []);
    return (
        <div className="pt-8 pb-16  lg:py-8 px-4 bg-gradient-to-b from-[#6745BA] to-[#522EAA]">
            <div className="max-w-[18rem]  md:max-w-4xl 2xl:max-w-6xl mx-auto text-center text-white">
                <h2 className="hidden mb-6 text-white text-center md:text-[45.41px] 2xl:text-[55.41px]  leading-none tracking-[0.01em] font-bold md:mb-8 2xl:mb-12 lg:flex items-center justify-center gap-2 mt-6">
                    Nuestras weLovers{" "}
                    <img
                        src="/assets/img/emojis/stars.png"
                        alt=""
                        className="h-12"
                    />
                    <span className="whitespace-nowrap">lo afirman</span>
                    <img
                        src="/assets/img/emojis/stars.png"
                        alt=""
                        className="h-12"
                    />
                </h2>
                <h2 className="lg:hidden mb-6 text-white text-center text-[25.41px] md:text-[45.41px] 2xl:text-[55.41px]  leading-none tracking-[0.01em] font-semibold md:font-bold md:mb-8 2xl:mb-12  items-center justify-center gap-2">
                    Nuestras weLovers <br />
                    <span className="flex w-full items-center justify-center gap-2">
                        <img
                            src="/assets/img/emojis/stars.png"
                            alt=""
                            className="h-6 sm:h-12"
                        />
                        <span className="whitespace-nowrap">lo afirman</span>
                        <img
                            src="/assets/img/emojis/stars.png"
                            alt=""
                            className="h-6 sm:h-12"
                        />
                    </span>
                </h2>

                {/* Swiper for Desktop */}
                <div className="hidden lg:block max-w-[65rem] mx-auto relative mt-10">
                    <Swiper
                        navigation={{
                            prevEl: ".custom-prev",
                            nextEl: ".custom-next",
                        }}
                        slidesPerView={1.5}
                        spaceBetween={10}
                        centeredSlides={true}
                        loop={true}
                        breakpoints={{
                            640: { slidesPerView: 2.5, spaceBetween: 10 },
                            1024: { slidesPerView: 3, spaceBetween: 0 },
                        }}
                        className="testimonialSwiper"
                        modules={[Navigation, Pagination]}
                        onSlideChange={(swiper) =>
                            setActiveIndex(swiper.realIndex)
                        }
                    >
                        {we_lovers.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="pb-10">
                                    <div
                                        className={`relative rounded-[29.44px] overflow-hidden w-full h-[600px] transition-all duration-300 ${
                                            index === activeIndex
                                                ? "scale-100 opacity-100"
                                                : "scale-90 opacity-50"
                                        }`}
                                        style={{
                                            boxShadow:
                                                "6.9px 7.77px 20.2px 0px #0000004D",
                                        }}
                                    >
                                        <iframe
                                            className="w-full h-full "
                                            src={`https://www.youtube.com/embed/${testimonial.description}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerpolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {/* Botones de navegación personalizados */}
                    <div className="absolute top-1/2 left-[-40px] transform -translate-y-1/2 custom-prev cursor-pointer">
                        <img
                            src="/assets/img/swiper/right.png"
                            className="rotate-180 brightness-0 grayscale invert"
                        />
                    </div>

                    <div className="absolute top-1/2 right-[-40px] 2xl:right-[-25px] transform -translate-y-1/2 custom-next cursor-pointer">
                        <img
                            src="/assets/img/swiper/right.png"
                            className="brightness-0 grayscale invert"
                        />
                    </div>

                    {/* Paginacion personalizada */}
                    <div className="flex justify-center gap-2 mt-0 mb-2">
                        {we_lovers.map((_, index) => (
                            <button
                                key={index}
                                className={`w-[10.5px] h-[10.5px] rounded-full transition-all duration-300 ${
                                    index === activeIndex
                                        ? "bg-white opacity-100"
                                        : "bg-white opacity-20"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Mobile View */}
                <div className="block lg:hidden !w-full mx-auto mt-2">
                    <div className="flex  justify-between gap-2 ">
                        {/* Thumbnails */}
                        <div className="w-[25%] flex flex-col gap-1">
                            {we_lovers.map((video, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setSelectedVideo(video.description);
                                        setIsPlaying(true);
                                    }}
                                    className={`cursor-pointer border-2 rounded-lg ${
                                        selectedVideo === video.description
                                            ? "border-white"
                                            : "border-transparent"
                                    }`}
                                >
                                    <img
                                        src={`https://img.youtube.com/vi/${video.description}/mqdefault.jpg`}
                                        alt={`Miniatura ${index}`}
                                        className={`aspect-square object-cover !w-full rounded-lg `}
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Main Image */}
                        <div className="w-9/12 flex justify-center">
                            <iframe
                                key={selectedVideo} // Fuerza recarga del iframe
                                className="aspect-[9/16] !w-full rounded-xl"
                                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=${
                                    isPlaying ? 1 : 0
                                }&mute=0`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeLoversSection;
