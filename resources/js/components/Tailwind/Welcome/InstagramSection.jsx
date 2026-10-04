import React from "react";
import { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const InstagramSection = ({ posts }) => {
  

    return (
        <section className="bg-white text-[#212529] lg:pt-10 2xl:pt-16">
            {/* Header */}
            <div className="max-w-6xl mx-auto text-center mb-2 lg:mb-12">
                <h2 className="text-[18.94px] pt-6 lg:mt-0 lg:text-[32.94px] lg:leading-[38.12px] font-bold lg:mb-4">
                    ¡Juntxs, sin límites!
                </h2>
                <a
                    href="https://instagram.com/wefem.pe"
                    className="inline-flex items-center font-semibold text-[#EF62BA] hover:opacity-90 transition-opacity lg:leading-[35.75px] text-[16.89px] lg:text-[30.89px] mb-4 md:mb-0"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <svg
                        className="h-5 lg:w-6 lg:h-6 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    @wefem.pe
                </a>
            </div>

            {/* Instagram Grid */}

            <div className="w-full   relative lg:mt-6">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    pagination={{
                        type: "fraction",
                    }}
                    loop={true}
                    centeredSlides={true}
                    breakpoints={{
                        0: {
                            slidesPerView: 2.5,
                            spaceBetween: 3,
                            centeredSlides: true,
                        },
                        640: {
                            slidesPerView: 2.5,
                            spaceBetween: 10,
                            centeredSlides: true,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                            centeredSlides: false,
                        },
                    }}
                >
                    {posts.map((post, index) => (
                        <SwiperSlide key={index} className="left-[20%] md:left-[unset]">
                            <a
                                href={post.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="aspect-square flex flex-col justify-center items-center"
                            >
                                <img
                                    src={`/api/instagram_post/media/${post.image}`}
                                    onError={(e) =>
                                        (e.target.src =
                                            "/api/cover/thumbnail/null")
                                    }
                                    alt={post.name}
                                    className="w-full h-full object-cover"
                                />
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default InstagramSection;
