import React, { useEffect, useState } from "react"
import { Local } from "sode-extend-react"
import ItemContainer from "./components/ItemContainer"
import Tippy from "@tippyjs/react"
import Aos from "aos"

const SelectColor = ({ goToNextPage, goToPrevPage, items = [] }) => {
  const [cart, setCart] = useState(Local.get('vua_cart') ?? [])

  useEffect(() => {
    setCart(old => {
      return old.map(item => {
        const colors = items.find(x => x.id == item.id)?.colors ?? []
        const currentColors = item.colors ?? []
        const quantity = item.quantity
        const leftColorsCount = quantity - currentColors.length
        const leftColor = new Array(leftColorsCount > 0 ? leftColorsCount : 0).fill(colors?.[0] ?? null)

        if (currentColors.length < quantity) item.colors = [...currentColors, ...leftColor].filter(Boolean)
        else item.colors = currentColors.slice(0, quantity).filter(Boolean)
        return item
      })
    })
  }, [null])

  const onSelectColor = (itemId, colorIndex, color) => {
    setCart(old => {
      return old.map(item => {
        if (item.id == itemId) item.colors[colorIndex] = color
        return item
      })
    })
  }

  useEffect(() => {
    Local.set('vua_cart', cart)
  }, [cart])

  useEffect(() => {
    Aos.init()
  }, [null])

  return <section className='px-[3%] lg:px-[10%] py-[10%] md:py-[7.5%] lg:py-[5%] bg-[#F9F3EF] text-center text-[#404040]'>

    <div className='max-w-2xl mx-auto '>
      <h1 className="text-2xl font-bold mb-2">¡Ahora selecciona el color!</h1>
      <p className="mb-8 text-sm font-extralight">
        <span>Elije tus colores favoritos para tu rutina</span>
        <img className="w-4 inline-block ms-2" src="/assets/img/emojis/stars.png" alt="Elije tus colores favoritos para tu rutina" />
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 sm:mt-8 lg:mt-10">

      {
        cart.map((item, i) => {
          const colors = items.find(x => x.id == item.id)?.colors ?? []
          if (colors.length == 0) return null
          return item.colors?.map((existence, j) => {
            return <div key={`existence-${i}-${j}`} className="overflow-hidden w-full bg-white rounded-2xl shadow-md" data-aos='fade-down'>
              <div className="flex flex-row gap-2 items-center p-2">
                <div className="">
                  {/* <ItemContainer color={existence.hex} /> */}
                  <img className="h-[120px] aspect-[3/4] object-cover object-center rounded-md" src={`/api/colors/media/${existence?.image}`} alt={item.name} />
                </div>
                <div className="">
                  <div className="flex flex-wrap gap-3 items-end self-stretch my-auto ">
                    <div className="flex flex-col items-start self-stretch">
                      <h2 className="text-lg font-semibold tracking-normal leading-none text-neutral-700 mb-1">{item.name} {j + 1}</h2>
                      <p className=" text-sm font-light tracking-normal leading-none text-neutral-700 mb-4">Selecciona tu color:</p>
                      <div className="flex gap-2 flex-wrap">
                        {
                          colors.map((color, index) => {
                            const isSelected = existence?.id == color.id
                            return <Tippy key={index} content={color.name}>
                              <button className={`flex shrink-0 w-8 aspect-square rounded-full border ${isSelected ? 'shadow-md border-[#000000]' : ''}`} style={{
                                backgroundColor: color.hex || '#fff'
                              }} onClick={() => onSelectColor(item.id, j, color)} />
                            </Tippy>
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          })
        }).filter(Boolean)
      }
    </div>


    <div className="flex flex-wrap items-center justify-center gap-2 mx-auto md:mx-[12.5%] mt-5 sm:mt-10">
      <button onClick={goToPrevPage} className='bg-[#C5B8D4] text-white text-sm px-8 py-3 rounded mt-4'>
        <i className="mdi mdi-arrow-left me-1"></i>
        VOLVER
      </button>
      <button onClick={goToNextPage} className='bg-[#C5B8D4] text-white text-sm px-8 py-3 rounded mt-4'>
        SIGUIENTE
        <i className="mdi mdi-arrow-right ms-1"></i>
      </button>
    </div>

  </section>
}

export default SelectColor 