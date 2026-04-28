import { useEffect, useState, useRef, useContext } from "react";
import GeneralRest from "../../../actions/GeneralRest";
import { LoadingContext } from "../Base";

const generalRest = new GeneralRest();

const CategoriesSection = ({ category, dataAbout }) => {
    
    const [aboutuses, setAboutuses] = useState(null);

    const aboutusData = dataAbout || [];

    const fivetSection = aboutusData.find(
        (item) => item.correlative === "home-category-section"
    );

    


    if (!category || category.length === 0) {
        return null;
    }
    
    return (

        <div className="relative overflow-hidden">
            <div className="relative w-full px-[5%] 4xl:px-[8%] gap-10 xl:gap-16 flex flex-col items-center pt-10 xl:pt-16 bg-[#fff]">
                {!!fivetSection?.visible && (
                    <div className="w-full flex flex-col items-center justify-center gap-5 max-w-5xl 4xl:max-w-6xl text-center">
                        <h2 className="font-sora text-[#ff9003] text-3xl sm:text-4xl 2xl:text-5xl 4xl:text-6xl font-semibold tracking-tight !leading-tight">
                            {fivetSection?.name}
                        </h2>
                    </div>
                )}
                    <div className="flex w-full items-center justify-center py-5">
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 4xl:gap-16 ">
                            
                            {category.map((item) => (
                                <a 
                                    key={item.id} 
                                    href={`/catalogo/${item.slug}`} 
                                    className="relative h-[250px] sm:h-[300px] 4xl:h-[400px] overflow-hidden rounded-2xl group"
                                >
                                    <div className="w-full h-full">
                                        <img 
                                            src={`/api/category/media/${item.image}`} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                        />
                                    </div>

                                    <div className="pointer-events-none absolute inset-0">
                                        <div className="absolute rounded-xl inset-0 bg-gradient-to-br from-[rgba(0,0,0,0.56)_23.61%] to-[rgba(0,0,0,0)_64.76%]"></div>
                                        <h2 className="text-white absolute top-8 left-8 font-sora text-xl 2xl:text-2xl 4xl:text-3xl font-semibold tracking-normal !leading-tight max-w-sm">
                                            {item.name}
                                        </h2>
                                    </div>
                                </a>
                            ))}

                        </div>
                        
                    </div>
                
            </div>
        </div>
    );
};

export default CategoriesSection;

