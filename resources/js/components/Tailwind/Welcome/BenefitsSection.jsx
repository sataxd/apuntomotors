import { useEffect, useState, useRef } from "react";
import GeneralRest from "../../../actions/GeneralRest";

const Counter = ({ target }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const numericTarget = parseInt(target) || 0; // Asegura que sea número

    useEffect(() => {
        if (!numericTarget) return; // No iniciar si es 0

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        let start = 0;
                        const stepTime = Math.max(
                            50,
                            Math.floor(2000 / numericTarget)
                        ); // Evitar valores negativos o muy rápidos
                        const timer = setInterval(() => {
                            start += 11;
                            setCount(start);
                            if (start >= numericTarget) {
                                clearInterval(timer);
                                setCount(numericTarget);
                            }
                        }, stepTime);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [numericTarget]);

    return (
        <h3
            ref={ref}
            className="text-[60.94px] mt-1 lg:mt-0 leading-[50px] lg:leading-[115.94px] md:text-[111.94px] tracking-wide font-bebas"
        >
            {count}
        </h3>
    );
};

const generalRest = new GeneralRest();
const BenefitsSection = () => {
    const [Benefits, setBenefits] = useState(null);
    const [Toallas, setToallas] = useState(null);
    const [Soles, setSoles] = useState(null);

    useEffect(() => {
        const fetchBenefits = async () => {
            try {
                const data = await generalRest.getBenefits();
                setBenefits(data);

                // Solo asigna valores cuando haya datos
                const toallasFound = data.find(
                    (benefit) =>
                        benefit.name === "Reemplaza (Toallas higiénicas)"
                );
                const solesFound = data.find(
                    (benefit) => benefit.name === "Ahorra (Soles)"
                );

                setToallas(toallasFound);
                setSoles(solesFound);
            } catch (error) {
                console.error("Error fetching benefits:", error);
            }
        };

        fetchBenefits();
    }, []);
    return (
        <div className="relative overflow-hidden pt-8 bg-[#EFE5FF]">
            <div className="bg-[#6745BA]">
                <div className="relative w-full lg:max-w-5xl 2xl:max-w-7xl mx-auto text-white py-6 lg:py-10 px-6 lg:px-0 flex flex-col items-center text-center">
                    <div className="max-w-[20rem] ml-[8rem] md:ml-60 lg:ml-0 md:max-w-2xl mx-auto md:mx-0 relative z-10">
                        <h2 className="text-[10.0px] md:text-[21.07px] leading-[25.28px] xl:text-[24.65px] 2xl:text-[27.65px] xl:leading-[33.18px] font-medium">
                            Una copa o disco menstrual en 5 años
                        </h2>
                        <div className="flex justify-center gap-10 md:mt-4">
                            <div className="w-1/2 flex flex-col items-center justify-center">
                                <span className="text-[13px] md:text-[24.99px] md:leading-[40.78px] xl:text-[28.79px] 2xl:text-[32.79px] 2xl:leading-[53.52px] font-semibold text-[#E7FF57]">
                                    Reemplaza
                                </span>
                                <Counter target={Toallas?.description} />
                                <p className="font-light text-nowrap text-[8.84px] md:text-[18.84px] md:leading-[47.47px] xl:text-[20.14px] 2xl:text-[24.14px] 2xl:leading-[62.3px]">
                                    Toallas higiénicas
                                </p>
                            </div>
                            <div className="w-1/2 flex flex-col items-center justify-center">
                                <span className="text-[13px] md:text-[24.99px] md:leading-[40.78px] xl:text-[28.79px] 2xl:text-[32.79px] 2xl:leading-[53.52px] font-semibold text-[#E7FF57]">
                                    Ahorra
                                </span>
                                <Counter target={Soles?.description} />
                                <p className="font-light text-nowrap text-[8.84px] md:text-[18.84px] md:leading-[47.47px] xl:text-[20.14px] 2xl:text-[24.14px] 2xl:leading-[62.3px]">
                                    Soles Aprox
                                </p>
                            </div>
                        </div>
                    </div>
                    <img
                        src="/assets/img/infobenefits/left.png"
                        alt="Copa menstrual"
                        className="block absolute -left-16   md:-left-36 2xl:-left-16 bottom-0 -top-[50px] h-[270px] md:top-[-90px] md:h-[540px] z-0 transform scale-x-[-1]"
                    />
                    <img
                        src="/assets/img/infobenefits/right.png"
                        alt="Disco menstrual"
                        className="hidden  lg:block absolute right-0 md:-right-32 2xl:-right-12 bottom-0 top-[-60px] h-[470px] z-0 transform scale-x-[-1] -rotate-[8deg]"
                    />
                </div>
            </div>
        </div>
    );
};

export default BenefitsSection;
