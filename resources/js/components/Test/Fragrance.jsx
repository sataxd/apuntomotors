import Tippy from "@tippyjs/react"
import React from "react"

const Fragrance = ({ test, setTest, values }) => {
  const onFragranceClicked = (fragrance) => {
    setTest(old => ({ ...old, fragrance }))
  }

  return <section className="p-[5%] py-[15%] md:py-[10%] lg:py-[5%] bg-white text-center text-[#404040]">
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl mb-8">Elige la <b className="font-bold text-[#303030]">fragancia</b> de tu rutina</h1>
      <div className="flex flex-wrap justify-center text-sm w-full mb-4 gap-4">
        {
          values.map((value, index) => {
            const button = <button key={index} className="border border-1-[#C5B8D4] rounded-lg bg-white text-[#9577B9] font-bold w-40"
              onClick={() => onFragranceClicked(value.id)}>
              <img className="aspect-[5/3] rounded w-full object-cover object-center hover:scale-105 transition-all" src={`/api/fragrances/media/${value.image}`} alt="Crespo" />
              <p className="p-2 truncate uppercase text-center tracking-widest text-sm">{value.name}</p>
            </button>

            if (value.note) return <Tippy allowHTML content={<img className="w-full h-full max-w-48 max-h-48" src={`/api/fragrances/media/${value.note}`} />}>
              {button}
            </Tippy>
            else return button
          })
        }
      </div>
    </div>
  </section>
}

export default Fragrance