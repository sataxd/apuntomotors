import React, { useState } from 'react';
import ProductInfiniteSlider from '../Products/ProductInfiniteSlider';

const Products = ({ brandData, globalSubcategories, globalTags }) => {
  const { id: brandId, name: brandName, image: brandImage, items } = brandData;
  
  // Estados de los filtros
  const [selectedSubCategory, setSelectedSubCategory] = useState('todos');
  const [selectedTag, setSelectedTag] = useState('todos');

  // --- LÓGICA DE FILTRADO DINÁMICO PARA ESTA MARCA ---
  
  const availableSubIds = [...new Set(items.map(i => i.subcategory_id).filter(Boolean))];
  const activeSubcategories = globalSubcategories.filter(sub => availableSubIds.includes(sub.id));

  const getTagsForSubcategory = (subCatId) => {
    const relevantItems = items.filter(i => i.subcategory_id === subCatId);
    const availableTagsNames = [...new Set(relevantItems.flatMap(i => i.tags || []))];
    return globalTags.filter(tag => availableTagsNames.includes(tag.name));
  };

  const filteredItems = items.filter(item => {
    if (selectedSubCategory === 'todos') {
        return true; 
    }
    const matchSub = item.subcategory_id === selectedSubCategory;
    const matchTag = selectedTag === 'todos' || (item.tags && item.tags.includes(selectedTag));
    return matchSub && matchTag;
  });

  const handleSubCategorySelect = (subId) => {
      setSelectedSubCategory(subId);
      setSelectedTag('todos'); 
  };

  // --- LÓGICA DE TEXTOS DINÁMICOS (TÍTULO Y DESCRIPCIÓN) ---
  
  // Variables por defecto (cuando está en "Todos")
  let displayTitle = brandName;
  let displayDescription = `Descubre nuestra línea de productos ${brandName}, diseñados con los más altos estándares de calidad y seguridad para tus proyectos.`;

  if (selectedSubCategory !== 'todos') {
      // Si hay una subcategoría seleccionada, buscamos su objeto completo
      const currentSub = activeSubcategories.find(s => s.id === selectedSubCategory);
      
      if (currentSub) {
          if (selectedTag === 'todos') {
              // Si no hay etiqueta específica, mostramos info de la subcategoría
              displayTitle = currentSub.name;
              displayDescription = currentSub.description;
          } else {
              // Si HAY una etiqueta seleccionada, buscamos su objeto completo
              const currentTag = globalTags.find(t => t.name === selectedTag);
              if (currentTag) {
                  displayTitle = currentTag.name;
                  displayDescription = currentTag.description;
              }
          }
      }
  }

  return (
    <section className='mx-[5%] 4xl:mx-[8%] rounded-3xl'>
      <div className="flex flex-col relative w-full pt-5 border-t border-opacity-35"
        // style={{
        //   backgroundImage: "url('/assets/img/fondoproductosf.webp')",
        //   backgroundSize: 'cover',   
        //   backgroundPosition: 'right',
        //   backgroundRepeat: 'no-repeat' 
        // }}
        >
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:gap-10">
          
          {/* Columna Izquierda: Logo y Filtros Desplegables */}
          <div className="col-span-1 xl:col-span-1 flex flex-col gap-5 sm:gap-10 justify-start items-start p-5">
            <div>
              <img
                src={`/api/core_value/media/${brandImage}`}
                alt="Itower"
                className="h-[43px] 2xl:h-[60px] 4xl:h-[75px] w-40 object-cover"
              />
            </div>

            <div className='flex flex-col gap-1 w-full max-w-sm'>
                {activeSubcategories.length > 0 && (
                    <h3 className="font-dmsans font-semibold text-lg text-black border-b border-opacity-35 pb-1 mb-2">Categorías</h3>
                )}

                {/* --- OPCIÓN GLOBAL: TODOS --- */}
                <div className="space-y-1 mb-1">
                    <label className={`
                        flex items-center gap-3 rounded-lg cursor-pointer transition-colors p-2
                        ${selectedSubCategory === 'todos' ? 'bg-gray-200' : 'hover:bg-gray-200'}
                    `}>
                        <input 
                            type="radio" 
                            name={`subcat-${brandId}`}
                            className="form-radio rounded border-black text-black focus:ring-0 focus:ring-offset-0"
                            checked={selectedSubCategory === 'todos'}
                            onChange={() => handleSubCategorySelect('todos')}
                        />
                        <span className="text-black font-medium text-sm 4xl:text-lg font-sora">
                            Todos
                        </span>
                    </label>
                </div>

                {/* --- OPCIONES DE SUBCATEGORÍAS --- */}
                {activeSubcategories.map((subCat) => {
                    const isSelected = selectedSubCategory === subCat.id;
                    const subCatTags = getTagsForSubcategory(subCat.id);

                    return (
                        <div key={subCat.id} className="space-y-1 mb-1">
                            {/* Nivel Padre: Subcategoría */}
                            <label className={`
                                flex items-center gap-3 rounded-lg cursor-pointer transition-colors p-2
                                ${isSelected ? 'bg-gray-200' : 'hover:bg-gray-200'}
                            `}>
                                <input 
                                    type="radio" 
                                    name={`subcat-${brandId}`}
                                    className="form-radio rounded border-black text-black focus:ring-0 focus:ring-offset-0"
                                    checked={isSelected}
                                    onChange={() => handleSubCategorySelect(subCat.id)}
                                />
                                <span className="text-black font-medium text-sm 4xl:text-lg font-sora">
                                    {subCat.name}
                                </span>
                            </label>
                            
                            {/* Nivel Hijo: Etiquetas */}
                            {isSelected && subCatTags.length > 0 && (
                                <div className="ml-6 flex flex-col gap-1 mt-1 border-l-2 border-gray-200 pl-2">
                                    <label className={`flex items-center gap-3 px-3 rounded-lg cursor-pointer transition-colors py-1.5 ${selectedTag === 'todos' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}>
                                        <input type="radio" name={`tag-${brandId}`} className="form-radio rounded border-black text-black focus:ring-0 w-3 h-3"
                                            checked={selectedTag === 'todos'} onChange={() => setSelectedTag('todos')} />
                                        <span className="text-black text-sm 4xl:text-base font-sora">Todas las etiquetas</span>
                                    </label>

                                    {subCatTags.map((tag) => (
                                        <label key={tag.id} className={`flex items-center gap-3 px-3 rounded-lg cursor-pointer transition-colors py-1.5 ${selectedTag === tag.name ? 'bg-gray-200' : 'hover:bg-gray-200'}`}>
                                            <input type="radio" name={`tag-${brandId}`} className="form-radio rounded border-black text-black focus:ring-0 w-3 h-3"
                                                checked={selectedTag === tag.name} onChange={() => setSelectedTag(tag.name)} />
                                            <span className="text-black text-sm 4xl:text-base font-sora">
                                                {tag.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
          </div>

          {/* Columna Derecha: Texto y Productos */}
          <div className="col-span-1 xl:col-span-3 flex flex-col gap-5 4xl:gap-8 justify-start items-start p-5">
            <div className="flex flex-col justify-start items-start gap-2">
              {/* Título Dinámico */}
              <h2 className="font-sora text-black text-2xl sm:text-3xl 2xl:text-4xl 4xl:text-5xl font-semibold tracking-tight !leading-tight">
                {displayTitle}
              </h2>
              {/* Descripción Dinámica */}
              <h2 className="font-dmsans text-black text-base 2xl:text-lg 4xl:text-xl tracking-normal font-light">
                {displayDescription}
              </h2>
            </div>

            <div className='w-full'>
             {filteredItems.length > 0 ? (
                 <ProductInfiniteSlider items={filteredItems}/> 
             ) : (
                 <p className="text-gray-500 py-10">No hay productos que coincidan con estos filtros.</p>
             )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;