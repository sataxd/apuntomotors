import { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ products, children }) {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <section className="pb-10 lg:py-24 lg:pt-20 bg-white text-[#212529] font-poppins">
            <div className="mx-auto xl:px-[5%] text-center">
                <div className="flex flex-col items-center pb-2 lg:pb-8">
                    {children}
                </div>

                {/* Swiper Slider */}
                <div className="w-full flex items-center justify-center sm:max-w-[60rem] 2xl:max-w-[69rem] mx-auto relative lg:mt-6">
                    <Swiper
                        navigation={{
                            prevEl: ".custom-prev",
                            nextEl: ".custom-next",
                        }}
                        slidesPerView={3}
                        centeredSlides={true}
                        spaceBetween={30}
                        pagination={{
                            type: "fraction",
                        }}
                        modules={[Navigation]}
                        loop={true}
                        breakpoints={{
                            0: { slidesPerView: 1.9, spaceBetween: 10 },
                            640: { slidesPerView: 2.5, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 30 },
                        }}
                        onSlideChange={(swiper) =>
                            setActiveIndex(swiper.realIndex)
                        }
                    >
                        {products.map((product, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    className={`!w-full ${
                                        index === activeIndex
                                            ? "scale-[.9] opacity-100 lg:opacity-100 lg:scale-100 "
                                            : "scale-[1] opacity-50 lg:opacity-100 lg:scale-100 "
                                    }`}
                                >
                                    <ProductCard
                                        product={product}
                                        visible={
                                            index === activeIndex ? true : false
                                        }
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Botones de navegación personalizados */}
                    <div className="hidden lg:block absolute top-1/2 left-[-40px] transform -translate-y-1/2 custom-prev cursor-pointer">
                        <img
                            src="/assets/img/swiper/right.png"
                            className="rotate-180"
                        />
                    </div>

                    <div className="hidden lg:block  absolute top-1/2 right-[-30px] xl:right-[-30px] transform -translate-y-1/2 custom-next cursor-pointer">
                        <img src="/assets/img/swiper/right.png" />
                    </div>
                </div>

                <div className="flex justify-center -mt-3 lg:mt-6">
                    <a
                        href="/catalog"
                        className="group bg-white h-[35.59px] lg:h-[55.59px] 2xl:h-[60.59px] w-[200px] lg:w-[300px] 2xl:w-[331px] text-[#FF9900] border-[0.9px] border-[#FF9900] text-[12.37px] md:text-[16.37px] 2xl:text-[19.37px] rounded-[7.57px] lg:rounded-[13.57px] font-semibold flex items-center justify-center gap-3 leading-[29.05px] hover:bg-[#FF9900] hover:text-white transition-colors duration-300"
                    >
                        Ver más productos
                        <svg
                            className="w-3 lg:w-5 fill-[#FF9900] group-hover:fill-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
