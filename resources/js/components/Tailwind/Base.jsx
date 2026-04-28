import React, { useState, useEffect, createContext, useCallback } from "react";

export const LoadingContext = createContext();
import LogoImage from "../../../../public/assets/img/logovitromax.webp";

const Preloader = ({ progress }) => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fff]">
            {/* Inyectamos los keyframes para el efecto flotante suave */}
            <style>
                {`
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-15px); }
                        100% { transform: translateY(0px); }
                    }
                    .animate-float {
                        animation: float 3s ease-in-out infinite;
                    }
                `}
            </style>

            {/* Cambiamos animate-pulse por nuestra nueva clase animate-float */}
            <img 
                src={LogoImage} 
                alt="Logo" 
                className="w-full mb-8 max-w-xs md:max-w-sm animate-float" 
            />
            
            <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-[#ff9003] transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="mt-2 text-sm font-sora text-gray-500">{Math.round(progress)}%</p>
        </div>
    );
};

const Base = ({ children }) => {
    const [tasksCounter, setTasksCounter] = useState(0);
    const [tasksCompleted, setTasksCompleted] = useState(0);
    const [isInitialMount, setIsInitialMount] = useState(true);

    // 1. MEJORA: Añadimos un nombre a la tarea para verla en consola
    const registerTask = useCallback((taskName = "Desconocida") => {
        console.log(`[Preloader] ⏳ Iniciando API: ${taskName}`);
        setTasksCounter((prev) => prev + 1);
    }, []);

    const completeTask = useCallback((taskName = "Desconocida") => {
        console.log(`[Preloader] ✅ Completada API: ${taskName}`);
        setTasksCompleted((prev) => prev + 1);
    }, []);

    // Margen para que los componentes hijos se monten
    useEffect(() => {
        const timer = setTimeout(() => setIsInitialMount(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // 2. MEJORA: Seguro de vida. Fuerza el cierre a los 8 segundos si algo falla.
    useEffect(() => {
        const safetyTimer = setTimeout(() => {
            if (tasksCounter > tasksCompleted) {
                console.warn("⚠️ [Preloader] Forzando cierre: Alguna API no respondió a tiempo.");
                setTasksCompleted(tasksCounter); // Igualamos contadores para forzar el 100%
            }
        }, 8000); 

        return () => clearTimeout(safetyTimer);
    }, [tasksCounter, tasksCompleted]);

    let progress = 0;
    if (tasksCounter > 0) {
        progress = (tasksCompleted / tasksCounter) * 100;
    } else if (!isInitialMount) {
        progress = 100;
    }

    const isLoading = isInitialMount || (tasksCounter > 0 && tasksCompleted < tasksCounter);

    return (
        <LoadingContext.Provider value={{ registerTask, completeTask }}>
            <section className="relative min-h-screen">
                {isLoading && <Preloader progress={progress} />}
                
                <div className={isLoading ? "h-screen overflow-hidden opacity-0" : "animate-fadeIn opacity-100 transition-opacity duration-500"}>
                    {children}
                </div>
            </section>
        </LoadingContext.Provider>
    );
};

export default Base;

// import React from "react";

// const Base = ({
//     children,
//     footerLinks,
//     session,
//     socials,
//     terms,
//     showSlogan = true,
//     showFooter = true,
//     gradientStart = "#c4b8d3",
//     gradientEnd = "#f1d7c1",
//     menuGradientEnd = "#dbc8c9",
// }) => {
//     return <section>{children}</section>;
// };

// export default Base;
