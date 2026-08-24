import React from "react"

const Filter = ({ categories, filter, setFilter }) => {
  return <section className="p-[5%] mt-[70px]">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-8 items-center">
      
      <div className="col-span-1 md:col-span-2 lg:col-span-4 text-center lg:text-left">
        <h2 className="font-sora text-black text-3xl sm:text-4xl 4xl:text-5xl font-semibold tracking-tight mb-4 !leading-tight max-w-2xl">
          Todas las publicaciones de nuestro boletín informativo
        </h2>
      </div>

      <button className="col-span-1 md:col-span-1 lg:col-span-2 text-base sm:text-lg text-end font-dmsans font-semibold leading-snug text-[#dd0613] flex flex-row justify-end md:justify-center xl:justify-end transition-all" onClick={() => setFilter(old => ({
          ...old,
          sortOrder: old.sortOrder == 'desc' ? 'asc' : 'desc'
        }))}>
          <div className="flex flex-row max-w-sm bg-black bg-opacity-5 w-auto px-6 py-2.5 rounded-lg">
            Ordenar por Mes
            <i className={`ml-2 mdi ${filter.sortOrder == 'asc' ? 'mdi-arrow-down' : 'mdi-arrow-up'}`}></i>
          </div>
      </button>

      <label htmlFor="txt-search" className="col-span-1 md:col-span-1 lg:col-span-2 px-6 py-4 flex items-center rounded-3xl bg-slate-100">
        <i className="fas fa-search text-slate-500 mr-2"></i>
        <input
          id="txt-search"
          type="text"
          placeholder="Buscar publicación"
          className="w-full bg-transparent border-none outline-none text-slate-800 text-sm sm:text-base 4xl:text-xl font-dmsans"
          onChange={(e) => setFilter(old => ({
            ...old,
            search: e.target.value
          }))}
        />
      </label>

      <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-wrap gap-3 justify-center lg:justify-start">
        {
          categories.map((item, index) => {
            return <button key={index} className={`transition-all px-6 py-4 rounded-3xl text-sm sm:text-base 4xl:text-xl font-dmsans ${item.id == filter.category ? 'bg-black text-slate-100' : 'bg-slate-100 text-slate-900'}`} onClick={() => setFilter(old => ({
              ...old,
              category: item.id == filter.category ? null : item.id
            }))}>
              {item.name}
            </button>
          })
        }
      </div>
    </div>
  </section>
}

export default Filter