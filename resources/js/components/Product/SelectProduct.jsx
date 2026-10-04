import React, { useEffect, useState } from "react"
import Number2Currency from "../../Utils/Number2Currency";
import { Local } from "sode-extend-react";
import Aos from "aos";

const SelectProduct = ({ goToNextPage, items = [], bundles = [] }) => {

  const vua_cart = Local.get('vua_cart') ?? items.map(x => {
    if (!x.is_default) return
    x.quantity = 1;
    return x;
  }).filter(Boolean)
  const [cart, setCart] = useState(vua_cart.filter(x => !!items.find(y => x.id == y.id)) ?? []);

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckbox = (e, item) => {
    const checked = e.target.checked
    if (checked) {
      setCart(old => ([...old, { ...item, quantity: 1 }]))
    } else {
      setCart(old => {
        return old.filter(x => x.id != item.id)
      })
    }
  }

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
  const restBundles = bundles.filter(x => {
    switch (x.comparator) {
      case '<':
        return totalQuantity < x.items_quantity
      case '>':
        return totalQuantity > x.items_quantity
      default:
        return totalQuantity == x.items_quantity
    }
  }).sort((a, b) => b.percentage - a.percentage)

  const bundle = restBundles?.[0] ?? null

  const finalPrice = totalPrice * (1 - (bundle?.percentage || 0))

  const onPlusClicked = (item) => {
    if (cart.find(x => x.id == item.id)) {
      setCart(old => {
        return old.map(x => {
          if (x.id == item.id) x.quantity++
          return x
        })
      })
    } else {
      document.getElementById(`item-${item.id}`).checked = true
      setCart(old => ([...old, { ...item, quantity: 1 }]))
    }
  }

  const onMinusClicked = (item) => {
    setCart(old => {
      return old.map(x => {
        if (x.id == item.id) x.quantity--
        if (x.quantity <= 0) return document.getElementById(`item-${item.id}`).checked = false
        return x
      }).filter(Boolean)
    })
  }

  useEffect(() => {
    Local.set('vua_cart', cart)
  }, [cart])

  useEffect(() => {
    Aos.init()
  }, [null])

  return <form className='px-[3%] lg:px-[10%] py-[10%] md:py-[7.5%] lg:py-[5%] bg-[#F9F3EF] text-center text-[#404040]'>
    <div className='max-w-2xl mx-auto '>
      <h1 className="text-2xl font-bold mb-2">¡Selecciona tus productos personalizados!</h1>
      <p className="mb-8 text-sm font-extralight">
        <span>Para mejores resultados arma una rutina completa</span>
        <img className="w-4 inline-block ms-2" src="/assets/img/emojis/stars.png" alt="Para mejores resultados arma una rutina completa" />
      </p>
    </div>

    <div className="max-w-4xl mx-auto mb-8">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {
          items.map((item, index) => {
            const selected = cart.find(x => x.id == item.id)
            const quantity = selected?.quantity ?? 0
            return <div key={index} className="flex flex-col w-[180px] whitespace-nowrap" data-aos="fade-up">
              <input type="checkbox" name="" id={`item-${item.id}`} className="peer hidden" onChange={(e) => handleCheckbox(e, item)} checked={!!selected} required />
              <label htmlFor={`item-${item.id}`} className="flex overflow-hidden flex-col tracking-normal leading-none text-center bg-white rounded-xl border peer-checked:border-[#808080] peer-checked:shadow-md text-[#404040] cursor-pointer mb-3 transition-all">
                <img loading="lazy" src={`/api/items/media/${item.image}`} className="object-cover object-center aspect-[3/4] w-full border-b" alt="Shampoo product image" onError={e => e.target.src = '/assets/img/routine/conditioner.png'} />
                <h2 className="self-center px-4 py-3">{item.name}</h2>
              </label>
              <div className="flex gap-5 justify-between items-center self-center py-1 text-sm bg-transparent rounded-lg border border-[#808080] w-[70%] px-4 font-bold">
                <button type="button" className="disabled:cursor-not-allowed" onClick={() => onMinusClicked(item)} disabled={quantity <= 0}>-</button>
                <span>{quantity}</span>
                <button type="button" className="disabled:cursor-not-allowed" onClick={() => onPlusClicked(item)}>+</button>
              </div>
            </div>
          })
        }
      </div>
    </div>

    <div className='max-w-2xl mx-auto mt-5 sm:mt-8 lg:mt-10 px-[3%]'>

      <p className='text-md'>
        Agrega más de un producto y <b>obtén nuestros descuentos</b> por packs.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#EFBEC1] text-white rounded-3xl mt-4 py-4 px-[5%] font-extrabold shadow-lg">
        <div className="text-xl text-start">
          Elegiste {
            bundle
              ? bundle.name
              : <>{totalQuantity} {totalQuantity == 1 ? 'producto' : 'productos'}</>
          }
          {bundle && <span className="block text-xs font-light">{bundle.description}</span>}
        </div>
        <div className="flex flex-row text-white items-center gap-4">
          {
            totalPrice != finalPrice &&
            <p className="text-sm font-light line-through">Antes: S/{Number2Currency(totalPrice)}</p>
          }
          <h2 className="text-xl">S/{Number2Currency(finalPrice)}</h2>
        </div>
      </div>
    </div>

    <div className="flex flex-wrap items-center justify-center gap-2 mx-auto md:mx-[12.5%] mt-5 sm:mt-10">
      <button onClick={goToNextPage} className='bg-[#C5B8D4] text-white text-sm px-16 py-3 tracking-widest rounded mt-4 disabled:cursor-not-allowed leadin' disabled={totalQuantity == 0}>SIGUIENTE</button>
    </div>

  </form>
}

export default SelectProduct 