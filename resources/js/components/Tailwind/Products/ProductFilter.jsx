import React, { useState } from "react";
import SelectForm from "./Components/SelectForm";
import ProductCard from "./ProductCard";
import ReactSlider from "react-slider";


const DualRangeSlider = ({ label, field, minLimit = 0, maxLimit = 1000, filters, handleRangeChange }) => {
    const currentMin = filters[field].min === "" ? minLimit : Number(filters[field].min);
    const currentMax = filters[field].max === "" ? maxLimit : Number(filters[field].max);

    return (
        <div className="mb-8 w-full">
            <label className="block text-[#000000] text-base lg:text-base 3xlm:text-lg 4xl:text-xl mb-4 font-medium font-sora tracking-tight">{label}</label>
            
            <div className="flex justify-between gap-4 mb-8 text-sm">
                <div className="w-1/2 border border-gray-200 rounded py-1 px-3 flex justify-center items-center shadow-sm bg-white">
                    <input 
                        type="number" 
                        value={filters[field].min} 
                        onChange={(e) => handleRangeChange(field, 'min', e.target.value)}
                        placeholder={minLimit}
                        className="w-full text-center text-gray-600 outline-none bg-transparent font-dmsans"
                    />
                </div>
                <div className="w-1/2 border border-gray-200 rounded py-1 px-3 flex justify-center items-center shadow-sm bg-white">
                    <input 
                        type="number" 
                        value={filters[field].max} 
                        onChange={(e) => handleRangeChange(field, 'max', e.target.value)}
                        placeholder={maxLimit}
                        className="w-full text-center text-gray-600 outline-none bg-transparent font-dmsans"
                    />
                </div>
            </div>

            <ReactSlider
                className="w-full h-1 bg-gray-200 rounded-full flex items-center relative mt-2"
                thumbClassName="w-6 h-6 bg-[#FAFAFA] border border-gray-300 rounded-full shadow-md cursor-grab active:cursor-grabbing focus:outline-none absolute -top-2.5 z-20 flex items-center justify-center transition-transform hover:scale-110"
                trackClassName="h-1 rounded-full absolute"
                min={minLimit}
                max={maxLimit}
                value={[currentMin, currentMax]}
                onChange={(value) => {
                    handleRangeChange(field, 'min', value[0]);
                    handleRangeChange(field, 'max', value[1]);
                }}
                renderTrack={(props, state) => {
                    const trackColor = state.index === 1 ? "bg-[#FF9900]" : "bg-transparent";
                    return <div {...props} className={`${props.className} ${trackColor}`} />;
                }}
            />
        </div>
    );
};


const ProductFilter = ({ products, categories, anuncio, initialCategory, initialSubcategory }) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const sortOptions = [
        { value: "min", label: "Precio: Menor a Mayor" },
        { value: "max", label: "Precio: Mayor a Menor" },
        { value: "sale", label: "Más vendidos" },
    ];

    const initialFilters = {
        categories: initialCategory ? [initialCategory] : [],
        subcategories: initialSubcategory ? [initialSubcategory] : [],
        height: { min: "", max: "" },
        weight: { min: "", max: "" },
        capacity: { min: "", max: "" },
        diameter: { min: "", max: "" },
    };


    const [filters, setFilters] = useState(initialFilters);
    const [selectedOrder, setSelectedOrder] = useState("");
    const [openMenu, setOpenMenu] = useState(false);

    // Estado para controlar qué categorías están desplegadas visualmente
    const [expandedCategories, setExpandedCategories] = useState(
        initialCategory ? [initialCategory] : []
    );

    const hasActiveFilters = 
        filters.categories.length > 0 ||
        filters.subcategories.length > 0 ||
        filters.height.min !== "" || filters.height.max !== "" ||
        filters.weight.min !== "" || filters.weight.max !== "" ||
        filters.capacity.min !== "" || filters.capacity.max !== "" ||
        filters.diameter.min !== "" || filters.diameter.max !== "";

    const handleCategoryClick = (category) => {
        setSelectedCategory(category === selectedCategory ? "" : category);
    };

    const handleCategoryChange = (categoryName) => {
        setFilters(prev => {
            const isSelected = prev.categories.includes(categoryName);

            if (isSelected) {
                // SI ESTAMOS DESMARCANDO LA CATEGORÍA:
                // 1. Buscamos la data de la categoría para saber cuáles son sus subcategorías
                const categoryData = categories.find(c => c.name === categoryName);
                const subcategoriesToRemove = categoryData?.subcategories?.map(sub => sub.name) || [];

                return {
                    ...prev,
                    // Quitamos la categoría
                    categories: prev.categories.filter(c => c !== categoryName),
                    // Quitamos todas las subcategorías que pertenezcan a esta categoría
                    subcategories: prev.subcategories.filter(sub => !subcategoriesToRemove.includes(sub))
                };
            } else {
                // SI ESTAMOS MARCANDO LA CATEGORÍA:
                return {
                    ...prev,
                    categories: [...prev.categories, categoryName]
                };
            }
        });

        // Expandir automáticamente al seleccionar (si no estaba expandida)
        if (!expandedCategories.includes(categoryName)) {
            setExpandedCategories(prev => [...prev, categoryName]);
        }
    };

    const handleSubcategoryChange = (subcategoryName) => {
        setFilters(prev => {
            const isSelected = prev.subcategories.includes(subcategoryName);

            if (isSelected) {
                // SI ESTAMOS DESMARCANDO LA SUBCATEGORÍA:
                // Simplemente la quitamos de la lista
                return {
                    ...prev,
                    subcategories: prev.subcategories.filter(sc => sc !== subcategoryName)
                };
            } else {
                // SI ESTAMOS MARCANDO LA SUBCATEGORÍA:
                // 1. Buscamos a qué categoría padre pertenece esta subcategoría
                const parentCategory = categories.find(c => 
                    c.subcategories && c.subcategories.some(sub => sub.name === subcategoryName)
                );

                // 2. Verificamos si la categoría padre ya estaba marcada previamente
                const isParentAlreadyChecked = parentCategory 
                    ? prev.categories.includes(parentCategory.name) 
                    : true;

                return {
                    ...prev,
                    // Agregamos la subcategoría
                    subcategories: [...prev.subcategories, subcategoryName],
                    // Si el padre existe y NO estaba marcado, lo agregamos también
                    categories: isParentAlreadyChecked 
                        ? prev.categories 
                        : [...prev.categories, parentCategory.name]
                };
            }
        });
    };


    const handleRangeChange = (field, type, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: { ...prev[field], [type]: value }
        }));
    };


    const clearFilters = () => {
        setFilters(initialFilters);
        setExpandedCategories([]);
    };

   
    // --- Filtrado Combinado ---
    const filteredProducts = products.filter(product => {
        const hasCategoriesFiltered = filters.categories.length > 0;
        const hasSubcategoriesFiltered = filters.subcategories.length > 0;

        let catMatch = true;

        if (hasCategoriesFiltered || hasSubcategoriesFiltered) {
            const productCategoryName = product.category?.name;
            const productSubcategoryName = product.subcategory?.name;

            const matchParent = filters.categories.includes(productCategoryName);
            const matchSpecificSub = filters.subcategories.includes(productSubcategoryName);

            // 1. Buscamos todas las subcategorías que pertenecen a la categoría padre de este producto
            const parentCategoryData = categories.find(c => c.name === productCategoryName);
            const subcategoriesOfParent = parentCategoryData?.subcategories?.map(sub => sub.name) || [];
            
            // 2. Verificamos si el usuario ha seleccionado ALGUNA subcategoría que pertenezca a ESTA categoría
            const hasActiveSubFiltersForParent = subcategoriesOfParent.some(subName => 
                filters.subcategories.includes(subName)
            );

            if (matchParent) {
                if (hasActiveSubFiltersForParent) {
                    // La categoría está seleccionada Y tiene subcategorías seleccionadas:
                    // -> El producto DEBE pertenecer a una de las subcategorías seleccionadas.
                    catMatch = matchSpecificSub;
                } else {
                    // La categoría está seleccionada pero NINGUNA de sus subcategorías lo está:
                    // -> Mostramos todo el catálogo de esta categoría.
                    catMatch = true;
                }
            } else {
                // Si la categoría padre NO está marcada, evaluamos solo si la subcategoría lo está
                catMatch = matchSpecificSub;
            }
        }

        // Validación de rangos
        const checkRange = (val, range) => {
            const min = parseFloat(range.min) || -Infinity;
            const max = parseFloat(range.max) || Infinity;
            const value = parseFloat(val) || 0;
            return value >= min && value <= max;
        };

        return catMatch && 
               checkRange(product.height, filters.height) &&
               checkRange(product.weight, filters.weight) &&
               checkRange(product.capacity, filters.capacity) &&
               checkRange(product.diameter, filters.diameter);
               
    }).sort((a, b) => {
        if (selectedOrder === "min") return a.final_price - b.final_price;
        if (selectedOrder === "max") return b.final_price - a.final_price;
        return 0;
    });
    

    return (
        <div className="px-[3%] py-8">
            <div className="flex w-full items-center lg:justify-end md:justify-between mb-8">
                
                <div className="lg:hidden w-1/2">
                    <nav className="relativew-full md:text-[18.67px] 2xl:text-[23.67px] leading-[26.52px] text-[#000000]">
                        <button
                            onClick={() => setOpenMenu(!openMenu)}
                            className="font-bold text-[#000000] text-[13px] leading-[26.52px] flex justify-center items-center underline "
                        >
                            <img src="https://i.ibb.co/nqyF9D6F/f6d1287b6197d4335884bd52d40a18fa.png" className="mr-3 h-3" alt="icon" />
                            Todos los productos
                        </button>
                        {openMenu && (
                            <ul className="absolute z-[100] bg-white rounded-lg p-4 space-y-3 text-[13px] shadow-lg">
                                {categories.map((category) => (
                                    <li className="cursor-pointer" key={category.id}>
                                        <a onClick={() => handleCategoryClick(category.name)}>
                                            {category.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </nav>
                </div>
                
                <div className="w-1/2 max-w-[240px]">
                    <SelectForm
                        options={sortOptions}
                        placeholder="Ordenar por"
                        onChange={(value) => setSelectedOrder(value)}
                        labelKey="label"
                        valueKey="value"
                    />
                </div>
            </div>

            <div className="flex gap-8">
                {/* Sidebar */}
                <div className="w-[250px] 2xl:w-[300px] 3xl:w-[350px] 4xl:w-[400px] hidden lg:flex flex-col gap-4">
                    
                    <div className="flex flex-row">
                        {/* Contenedor relative para poder posicionar el icono de alerta */}
                        <div className="relative inline-block">
                            <button 
                                onClick={clearFilters}
                                className={`text-left font-dmsans text-sm sm:text-base 3xlm:text-lg 4xl:text-xl font-semibold transition p-2 border rounded-md ${
                                    hasActiveFilters 
                                        ? "text-[#FF9900] border-[#FF9900]" 
                                        : "text-gray-500 border-gray-300 hover:text-[#FF9900] hover:border-[#FF9900]"
                                }`}
                            >
                                Limpiar filtros
                            </button>
                            
                            {/* Icono de exclamación rojo que solo aparece si hay filtros */}
                            {hasActiveFilters && (
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 border-2 border-white shadow-sm z-10 animate-pulse">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white font-bold">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            )}
                        </div>
                    </div>
                    
                    {/* Categorías */}
                    <nav className="w-full text-base text-[#000000] border-b pb-8 border-b-gray-200">
                        <h2 className="font-sora font-semibold text-[#000000] text-base md:text-base 3xlm:text-lg 4xl:text-xl mb-4">
                            Categorías
                        </h2>
                        <ul className="space-y-4">
                            {categories.map((category) => {
                                const isExpanded = expandedCategories.includes(category.name);
                                const isChecked = filters.categories.includes(category.name);

                                return (
                                    <li key={category.id} className="flex flex-col">
                                        {/* Contenedor Nivel Categoría Padre y Flecha */}
                                        <div className="flex items-center justify-between w-full">
                                            
                                            <label className={`flex items-center gap-3 cursor-pointer hover:text-[#000000] ${isChecked ? 'font-bold' : ''}`}>
                                                <input 
                                                    type="checkbox"
                                                    checked={isChecked}
                                                    onChange={() => handleCategoryChange(category.name)}
                                                    className="w-4 h-4 accent-[#000000] cursor-pointer rounded border-gray-300 focus:ring-black"
                                                />
                                                <span className="text-xs md:text-sm 3xl:text-base 4xl:text-lg font-sora line-clamp-1">
                                                    {category.name}
                                                </span>
                                            </label>

                                            {/* Flecha Condicional (Solo se muestra si hay subcategorías) */}
                                            {category.subcategories && category.subcategories.length > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        // Permite abrir/cerrar la lista manualmente tocando la flecha
                                                        setExpandedCategories(prev => 
                                                            prev.includes(category.name) 
                                                                ? prev.filter(c => c !== category.name) 
                                                                : [...prev, category.name]
                                                        );
                                                    }}
                                                    className="p-1 ml-2 text-gray-400 hover:text-black transition-colors focus:outline-none"
                                                >
                                                    <svg 
                                                        className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24" 
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>

                                        {/* Nivel Subcategoría (Esta es la lista que faltaba en tu código) */}
                                        {isExpanded && category.subcategories && category.subcategories.length > 0 && (
                                            <ul className="mt-3 ml-3 pl-3 space-y-3 border-l border-gray-300">
                                                {category.subcategories.map((sub) => (
                                                    <li key={sub.id}>
                                                        <label className="flex items-start justify-start gap-2 cursor-pointer text-gray-600 hover:text-black transition-colors">
                                                            <div className="flex flex-col items-start justify-start">
                                                                <input 
                                                                    type="checkbox"
                                                                    checked={filters.subcategories.includes(sub.name)}
                                                                    onChange={() => handleSubcategoryChange(sub.name)}
                                                                    className="w-3.5 h-3.5 3xlm:h-4 3xlm:w-4 accent-[#000000] cursor-pointer rounded border-gray-300 focus:ring-black"
                                                                />
                                                            </div>
                                                            <span className="text-xs md:text-[13px] 3xlm:text-base 4xl:text-lg font-sora ">
                                                                {sub.name}
                                                            </span>
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Controles de Rango */}
                    <div className="pr-4">
                        <DualRangeSlider 
                            label="Altura (mm)" 
                            field="height" 
                            minLimit={0} 
                            maxLimit={500} 
                            filters={filters} // <-- Faltaba esto
                            handleRangeChange={handleRangeChange} // <-- Faltaba esto
                        />
                        <DualRangeSlider 
                            label="Peso (g)" 
                            field="weight" 
                            minLimit={0} 
                            maxLimit={2000} 
                            filters={filters} // <-- Faltaba esto
                            handleRangeChange={handleRangeChange} // <-- Faltaba esto
                        />
                        <DualRangeSlider 
                            label="Capacidad (ml)" 
                            field="capacity" 
                            minLimit={0} 
                            maxLimit={5000} 
                            filters={filters} // <-- Faltaba esto
                            handleRangeChange={handleRangeChange} // <-- Faltaba esto
                        />
                        <DualRangeSlider 
                            label="Diámetro (mm)" 
                            field="diameter" 
                            minLimit={0} 
                            maxLimit={300} 
                            filters={filters} // <-- Faltaba esto
                            handleRangeChange={handleRangeChange} // <-- Faltaba esto
                        />
                    </div>

                </div>

                {/* Grid de productos */}
                <div className="w-full grid grid-cols-2 xl:grid-cols-3 xl4m:grid-cols-3 gap-4 gap-y-8 h-fit">
                    {filteredProducts && filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-3 flex flex-col items-center justify-center h-full w-full p-10 space-y-4">
                            <p className="text-center text-gray-500 text-lg">
                                No se encontraron resultados con estos filtros.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;