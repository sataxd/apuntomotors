import { useState } from "react";
// Importaciones ajustadas según tu estructura
import HtmlContent from "../../../Utils/HtmlContent";

const Faqs = ({ tieneMargen = false, faqs }) => {
    const bgVariable = tieneMargen ? "mt-[70px]" : "mt-0";
    // Aseguramos que faqs tenga al menos un elemento antes de acceder a faqs[0]
    const [opened, setOpened] = useState(null);

    return (
        <section className={`relative w-full px-[5%] 4xl:px-[8%] gap-10 4xl:gap-16 flex flex-col items-center py-10 xl:py-16 ${bgVariable}`}>

            <div className="w-full flex flex-col gap-2 justify-center items-center">
                <h3 className="font-sora text-[#ff9003] text-3xl sm:text-4xl 2xl:text-4xl 4xl:text-5xl font-semibold tracking-tight !leading-tight mb-3 text-center">
                    Asistencia al Cliente
                </h3>
            </div>

            {/* AQUÍ ESTÁ LA MAGIA DEL GRID */}
            <div className='w-full max-w-6xl 4xl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-start'>
                {
                    faqs?.map((faq, index) => {
                        return (
                            <div key={index} className='bg-white rounded-xl text-[#404040] shadow-md'>
                                <h1 
                                    // Cambié items-center por items-start para que si hay varias líneas, la flecha y el número se queden arriba
                                    className='text-base 4xl:text-lg flex justify-between items-start font-sora font-medium px-6 py-4 bg-[#f8f8f8] rounded-xl shadow-md cursor-pointer transition-colors hover:bg-gray-100' 
                                    onClick={() => setOpened(opened === faq.id ? null : faq.id)}
                                >
                                    {/* Contenedor Flex para separar el número del texto */}
                                    <div className="flex gap-1">
                                        {/* flex-shrink-0 evita que el número se aplaste, min-w le da un ancho fijo para alinear todos los textos igual */}
                                        <span className="flex-shrink-0 min-w-[20px]">{index + 1}.</span>
                                        <span>{faq.name}</span>
                                    </div>

                                    {/* Íconos con un pequeño margen superior (mt-1) para alinearlos visualmente con la primera línea de texto */}
                                    {
                                        opened === faq.id
                                            ? <i className='mdi mdi-arrow-up ml-4 mt-[2px] flex-shrink-0'></i>
                                            : <i className='mdi mdi-arrow-down ml-4 mt-[2px] flex-shrink-0'></i>
                                    }
                                </h1>
                                <p className={`px-6 text-base 4xl:text-lg font-dmsans transition-all duration-300 overflow-hidden ${opened === faq.id ? 'py-4 opacity-100 max-h-96' : 'py-0 opacity-0 max-h-0'}`}>
                                    {faq.description}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
};

export default Faqs;