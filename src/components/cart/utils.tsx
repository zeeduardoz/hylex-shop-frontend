import { useContext, useState } from 'react'

import { CartContext } from '@contexts/CartContext'
import { AlertError } from '@hooks/useAlert'

export function UtilsCart() {
  const {
    useCart,
    useLoading,
    addCoupon,
    removeCoupon,
    addInfluencer,
    removeInfluencer
  } = useContext(CartContext)

  const [coupon, setCoupon] = useState(useCart?.finance.discountCoupon)
  const [influencer, setInfluencer] = useState(useCart?.finance.influencer)

  async function handleAddCoupon() {
    try {
      await addCoupon(coupon)
    } catch (e) {
      AlertError('Ocorreu um erro na requisição!')
      console.log(e)
    }
  }

  async function handleRemoveCoupon() {
    try {
      await removeCoupon(coupon || useCart?.finance.discountCoupon)
    } catch (e) {
      AlertError('Ocorreu um erro na requisição!')
      console.log(e)
    }
  }

  async function handleAddInfluencer() {
    try {
      await addInfluencer(influencer)
    } catch (e) {
      AlertError('Ocorreu um erro na requisição!')
      console.log(e)
    }
  }

  async function handleRemoveInfluencer() {
    try {
      await removeInfluencer(influencer)
    } catch (e) {
      AlertError('Ocorreu um erro na requisição!')
      console.log(e)
    }
  }

  return (
    <div className="border-hr-color border-b py-10">
      <h1 className="text-2xl font-bold text-color-light">Cupom & Apoiar</h1>
      <div className="items-center justify-between mt-10 space-y-10 lg:flex lg:space-x-10 lg:space-y-0">
        <form className="w-full lg:w-1/2">
          <h2 className="text-lg font-light text-color-medium">
            Cupom de Desconto
          </h2>
          <input
            type="text"
            name="coupon"
            onChange={e => setCoupon(e.target.value)}
            defaultValue={useCart?.finance.discountCoupon}
            placeholder="Algum cupom?"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-3 outline-none px-4 py-3 text-color-light w-full"
            disabled={!!useLoading}
          />
          <div className="items-center flex mt-5 w-full lg:justify-end">
            <button
              disabled={
                !!(useLoading || useCart?.finance.discountCoupon === '')
              }
              onClick={() => handleRemoveCoupon()}
              className={
                useLoading || useCart?.finance.discountCoupon === ''
                  ? 'rounded font-semibold cursor-not-allowed opacity-75 focus:outline-none px-5 py-2 text-color-light'
                  : 'rounded font-semibold cursor-pointer hover:opacity-75 focus:outline-none px-5 py-2 text-color-light'
              }
            >
              Cancelar
            </button>
            <button
              disabled={
                !!(useLoading || useCart?.finance.discountCoupon !== '')
              }
              onClick={() => handleAddCoupon()}
              className={
                useLoading || useCart?.finance.discountCoupon !== ''
                  ? 'bg-color-info rounded font-semibold ml-5 cursor-not-allowed opacity-75 focus:outline-none px-8 py-2 text-white'
                  : 'bg-color-info rounded font-semibold ml-5 cursor-pointer hover:opacity-75 focus:outline-none px-8 py-2 text-white'
              }
            >
              Utilizar
            </button>
          </div>
        </form>
        <form className="w-full lg:w-1/2">
          <h2 className="text-lg font-light text-color-medium">
            Apoiar Influenciador
          </h2>
          <input
            type="text"
            name="influencer"
            defaultValue={useCart?.finance.influencer}
            onChange={e => setInfluencer(e.target.value)}
            placeholder="Algum código de apoiador?"
            className="placeholder-gray-400 bg-transparent focus:border-blue-300 border-gray-300 border-b-2 text-sm mt-3 outline-none px-4 py-3 text-color-light w-full"
            disabled={!!useLoading}
          />
          <div className="items-center flex mt-5 w-full lg:justify-end">
            <button
              onClick={() => handleRemoveInfluencer()}
              disabled={!!(useLoading || useCart?.finance.influencer === '')}
              className={
                useLoading || useCart?.finance.influencer === ''
                  ? 'rounded font-semibold cursor-not-allowed opacity-75 focus:outline-none px-5 py-2 text-color-light'
                  : 'rounded font-semibold cursor-pointer hover:opacity-75 focus:outline-none px-5 py-2 text-color-light'
              }
            >
              Cancelar
            </button>
            <button
              onClick={() => handleAddInfluencer()}
              disabled={!!(useLoading || useCart?.finance.influencer !== '')}
              className={
                useLoading || useCart?.finance.influencer !== ''
                  ? 'bg-color-info rounded font-semibold ml-5 cursor-not-allowed opacity-75 focus:outline-none px-8 py-2 text-white'
                  : 'bg-color-info rounded font-semibold ml-5 cursor-pointer hover:opacity-75 focus:outline-none px-8 py-2 text-white'
              }
            >
              Apoiar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
