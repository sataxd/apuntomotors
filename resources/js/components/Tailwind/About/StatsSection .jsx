import { useEffect, useRef } from "react";

const StatsSection = ({ indicators }) => {
    const countersRef = useRef([]);

    useEffect(() => {
        function animateCounter(element, target, suffix = "") {
            let start = 0;
            let stepTime = Math.abs(Math.floor(2000 / target)); // Duración fija de 2000ms

            let timer = setInterval(() => {
                start += 1;
                element.textContent = `+${start}${suffix}`;

                if (start >= target) {
                    clearInterval(timer);
                    element.textContent = `+${target}${suffix}`; // Asegura el valor final exacto
                }
            }, stepTime);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const target = parseInt(
                            el.getAttribute("data-count"),
                            10
                        );
                        const suffix = el.getAttribute("data-suffix") || "";
                        animateCounter(el, target, suffix);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.5 }
        );

        countersRef.current.forEach((el) => el && observer.observe(el));
    }, []);

    const stats = [
        { value: 3, label: "Clientes satisfechos" },
        { value: 4, label: "Años en el mercado" },
        { value: 6, label: "Copas vendidas" },
        { value: 4, label: "Discos vendidos" },
    ];
    const updatedStats = stats.map((stat) => {
        const matchingIndicator = indicators.find(
            (ind) => ind.name === stat.label
        );
        return matchingIndicator
            ? {
                  ...stat,
                  value: matchingIndicator.description,
              }
            : stat;
    });
    // Función para obtener solo el número sin el sufijo
    const getNumericValue = (desc) => parseFloat(desc.replace(/[KM]/, ""));
    // Función para obtener solo el sufijo
    const getSuffix = (desc) => {
        const match = desc.match(/[KM]/);
        return match ? match[0] : "";
    };
    return (
        <div className="relative overflow-hidden bg-[#D9DE21]">
            <div className="bg-[#D9DE21] md:max-w-5xl 2xl:max-w-7xl mx-auto">
                <div className="relative mx-auto text-white py-10 px-6 flex flex-col items-center text-center">
                    {/* Imágenes laterales */}
                    <img
                        src="https://i.ibb.co/bj6rNvs7/1bc2a501a327fe55cf37f78fd57747ca.png"
                        alt="Copa menstrual"
                        className="hidden lg:block absolute -left-[200px] bottom-0 top-[100px] md:h-[700px] 2xl:h-[900px] z-0 transform scale-x-[-1] w-[450px] object-cover"
                    />

                    {/* Contenido */}
                    <div className="px-[5%] mx-auto relative z-10 grid grid-cols-2 gap-4 gap-y-8 md:gap-y-16 pt-0 md:pt-20 pb-0  lg:py-20">
                        {updatedStats.map((stat, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center"
                            >
                                <div
                                    className="text-[60.31px] md:text-[120.31px] 2xl:text-[199.31px] leading-none font-bold text-white mb-2 count"
                                    style={{
                                        textShadow:
                                            "1.98px 3.96px 10px #00000033",
                                    }}
                                    ref={(el) =>
                                        (countersRef.current[index] = el)
                                    }
                                    data-count={getNumericValue(stat.value)}
                                    data-suffix={getSuffix(stat.value)}
                                >
                                    +0{getSuffix(stat.value)}
                                </div>
                                <div className="-rotate-2 w-full  md:w-[300.09px] text-[10px] 2xl:w-[369.09px] md:text-[22.61px] 2xl:text-[31.61px] text-white px-5 py-1 font-bold bg-[#F750BD]">
                                    {stat.label}
                                </div>
                            </div>
                        ))}

                        <div className="col-span-2 relative lg:hidden h-[100px] md:h-[350px]">
                            <img
                                src="https://i.ibb.co/bj6rNvs7/1bc2a501a327fe55cf37f78fd57747ca.png"
                                alt="Copa menstrual"
                                className="absolute -left-[100px] bottom-0 top-[-50px] h-[300px] w-[350px] md:aspect-auto md:h-[700px]  z-0 transform scale-x-[-1] md:w-[450px] object-cover"
                            />
                            <img
                                src="https://i.ibb.co/4nHfPP5q/49f3389e94334976b46ba6a4d0aea0e8.png"
                                alt="Disco menstrual"
                                className="absolute -right-[50px]  bottom-0 top-[-50px] h-[250px]  md:h-[580px]  object-cover object-top  w-auto z-20"
                            />
                        </div>
                    </div>

                    {/* Imagen lateral derecha */}
                    <img
                        src="https://i.ibb.co/4nHfPP5q/49f3389e94334976b46ba6a4d0aea0e8.png"
                        alt="Disco menstrual"
                        className="hidden lg:block absolute md:-right-[180px] 2xl:-right-[230px] bottom-0 md:top-[120px] 2xl:top-[150px] md:h-[580px] 2xl:h-[700px] z-20"
                    />
                </div>
            </div>
        </div>
    );
};

export default StatsSection;
