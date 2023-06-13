import { useContext } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

import { CartContext } from '@contexts/CartContext'
import { AlertError } from '@hooks/useAlert'

export function ProductsCart() {
  const { useCart, useLoading, addCart, removeCart } = useContext(CartContext)

  async function handleAddCart(uuid: string) {
    try {
      await addCart(uuid)
    } catch (e) {
      AlertError('Ocorreu um erro na requisição!')
      console.log(e)
    }
  }

  async function handleRemoveCart(uuid: string) {
    try {
      await removeCart(uuid)
    } catch (e) {
      AlertError('Ocorreu um erro na requisição!')
      console.log(e)
    }
  }

  return (
    <div className="border-hr-color border-b pb-10">
      <h1 className="text-2xl font-bold text-color-light">
        Produtos ({useCart ? useCart?.products.length : 0})
      </h1>
      <div className="mt-10">
        {useLoading ? (
          <>
            <div className="items-center animate-pulse bg-blue-300 rounded flex justify-between my-2 p-8 w-full"></div>
            <div className="items-center animate-pulse bg-blue-300 rounded flex justify-between my-2 p-8 w-full"></div>
          </>
        ) : useCart?.products && useCart?.products.length > 0 ? (
          <>
            {useCart?.products.map((product: any, index: any) => {
              return (
                <div
                  key={index}
                  className="items-center flex flex-col justify-between p-5 space-y-5 lg:flex-row"
                >
                  <div className="items-center flex w-full lg:w-1/3">
                    <img
                      src={product.images[0]}
                      alt="Product Image"
                      className="rounded-full h-20 w-20"
                    />
                    <span className="ml-5">
                      <p className="font-lg font-semibold text-color-light">
                        {product.name}
                      </p>
                      <p className="font-light text-color-medium">
                        Categoria: {product.category}
                      </p>
                    </span>
                  </div>
                  <div className="items-center flex">
                    <FaPlus
                      onClick={() => handleAddCart(product.uuid)}
                      className="cursor-pointer mx-3 hover:opacity-75 text-color-medium"
                    />
                    <p className="bg-color-light rounded px-4 py-2 text-color-dark">
                      {product.quantity}
                    </p>
                    <FaMinus
                      onClick={() => handleRemoveCart(product.uuid)}
                      className="cursor-pointer mx-3 hover:opacity-75 text-color-medium"
                    />
                  </div>
                  <div className="items-center flex w-full lg:w-1/3">
                    <span className="mr-5">
                      <p className="text-sm font-semibold text-color-medium">
                        Preço unitário
                      </p>
                      <p className="text-lg font-light text-color-light">
                        R$ {product.price}
                      </p>
                    </span>
                    <span className="ml-10">
                      <p className="text-sm font-semibold text-color-medium">
                        Preço total
                      </p>
                      <p className="text-lg font-light text-color-light">
                        R$ {product.totalPrice}
                      </p>
                    </span>
                  </div>
                </div>
              )
            })}
          </>
        ) : (
          <div className="items-center flex p-5 w-full">
            <p className="text-xl font-light text-color-medium">
              Seu carrinho está vazio!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
