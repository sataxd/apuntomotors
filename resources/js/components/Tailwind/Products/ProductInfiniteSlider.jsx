import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import ProductCard from './ProductCard';

const ProductInfiniteSlider = ({ items }) => {
    
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);

    const [isDetailView, setIsDetailView] = useState(false);
    const [clickedIndex, setClickedIndex] = useState(0);
    const swiperRef = useRef(null);

    const handleProductClick = (index) => {
        setClickedIndex(index); 
        setIsDetailView(true);  
    };

    // Función para volver a la vista normal
    const handleCloseDetail = () => {
        setIsDetailView(false);
    };

    // Si no hay items o el array está vacío, no renderizar nada
    if (!items || items.length === 0) {
        return null;
    }


    return (
        <section>
            <div className="w-full relative">

                {isDetailView && (
                    <button 
                        onClick={handleCloseDetail}
                        className="absolute top-0 right-0 z-20 bg-black text-white p-2 rounded-full m-2 hover:bg-gray-800 transition-colors shadow-lg"
                        style={{marginTop: '-20px', marginRight: '-10px'}} // Ajuste visual opcional
                    >
                        <X size={20} />
                    </button>
                )}

                {/* Swiper Slider */}
                <div className="relative">

                    <Swiper
                        key={isDetailView ? 'swiper-detail' : 'swiper-list'}
                        initialSlide={isDetailView ? clickedIndex : 0}
                        modules={[Autoplay, Navigation]}
                        spaceBetween={16}
                        slidesPerView={1}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        navigation={{
                            prevEl: prevEl,
                            nextEl: nextEl,
                        }}
                        loop={items.length > 3}
                        speed={800}
                        breakpoints={{
                            700: {
                                slidesPerView: isDetailView ? 1 : 2,
                                spaceBetween: 25,
                            },
                            950: {
                                slidesPerView: isDetailView ? 1 : 3,
                                spaceBetween: 20,
                            },
                            1400: {
                                slidesPerView: isDetailView ? 1 : 3,
                                spaceBetween: 20,
                            },
                            2200: {
                                slidesPerView: isDetailView ? 1 : 4,
                                spaceBetween: 20,
                            }
                        }}
                        className="product-swiper"
                    >
                        {items.map((product, index) => (
                            <SwiperSlide key={product.id} className="py-3">
                                <ProductCard 
                                    product={product}
                                    onClick={() => handleProductClick(index)}
                                    isDetailView={isDetailView}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Botones de navegación */}
                    <button
                        ref={(node) => setPrevEl(node)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-primary  transition-all duration-300 -ml-5 lg:-ml-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
                    </button>
                    <button
                        ref={(node) => setNextEl(node)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-full bg-white shadow-lg hover:bg-primary  transition-all duration-300 -mr-5 lg:-mr-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductInfiniteSlider;