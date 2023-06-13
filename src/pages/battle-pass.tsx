import Router from 'next/router'
import { useEffect, useState, useContext } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { Layout } from '@components/utils/layout'
import { Modal } from '@components/products/modal'
import { api } from '@services/apiClient'
import { AlertError } from '@hooks/useAlert'
import { CartContext } from '@contexts/CartContext'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Slide } = require('react-slideshow-image')

const info = {
  page: 'Passe de Batalha',
  description:
    'Compre seu Passe de Batalha para obter diversas vantagens em suas grandes lutas!'
}

export default function BattlePass() {
  const { addCart } = useContext(CartContext)
  const [useLoading, setLoading] = useState<boolean>(true)
  const [products, setProducts] = useState<[]>([])

  useEffect(() => {
    setLoading(true)
    api
      .get(
        `/shopping/getProductsByCategory?category=3&perPage=20&currentPage=1`
      )
      .then(response => {
        setProducts(response.data.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        Router.push('/vips')
      })
  }, [])

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    prevArrow: (
      <div className="cursor-pointer px-3 text-xl text-color-light hover:text-color-medium">
        <FaChevronLeft />
      </div>
    ),
    nextArrow: (
      <div className="cursor-pointer px-3 text-xl text-color-light hover:text-color-medium">
        <FaChevronRight />
      </div>
    )
  }

  async function handleAddCart(uuid: string) {
    try {
      await addCart(uuid)
    } catch (e) {
      AlertError('Ocorreu um erro na requisição!')
      console.log(e)
    }
  }

  return (
    <Layout title="Passe de Batalha" header={info}>
      <div className="container w-full">
        {useLoading ? (
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="h-96 w-full animate-pulse rounded-md bg-blue-200 shadow-sm"></div>
            <div className="h-96 w-full animate-pulse rounded-md bg-blue-200 shadow-sm"></div>
            <div className="h-96 w-full animate-pulse rounded-md bg-blue-200 shadow-sm"></div>
            <div className="h-96 w-full animate-pulse rounded-md bg-blue-200 shadow-sm"></div>
            <div className="h-96 w-full animate-pulse rounded-md bg-blue-200 shadow-sm"></div>
            <div className="h-96 w-full animate-pulse rounded-md bg-blue-200 shadow-sm"></div>
          </div>
        ) : products && products.length >= 1 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {products.map((product: any) => {
              return (
                <div
                  key={product.uuid}
                  className={product.highlight === '1' ? 'conic' : ''}
                >
                  <div className="m-3 flex flex-col items-center justify-between rounded-md bg-primary">
                    <div className="w-full">
                      {product.images.length < 2 ? (
                        <div className="mx-auto p-5">
                          <img
                            src={product.images[0]}
                            className="mx-auto h-56 w-56 object-cover"
                            alt="Product Image"
                          />
                        </div>
                      ) : (
                        <Slide {...properties}>
                          {product.images.map((img: any, index: any) => {
                            return (
                              <div
                                key={index}
                                className="each-slide mx-auto p-5"
                              >
                                <img
                                  src={img}
                                  className="mx-auto h-56 w-56 object-cover"
                                  alt="Product Image"
                                />
                              </div>
                            )
                          })}
                        </Slide>
                      )}
                      <p className="mt-5 text-center text-xl font-black text-color-light">
                        {product.name}
                      </p>
                    </div>
                    <div className="px-5 py-5">
                      {product.oldPrice === '0' ? (
                        <></>
                      ) : (
                        <p className="text-center text-xl font-bold text-red-300 line-through">
                          <small>R$</small> {product.oldPrice}
                        </p>
                      )}
                      <p className="text-center text-3xl font-black text-color-medium">
                        <small>R$</small> {product.newPrice}
                      </p>
                    </div>
                    <div className="w-full px-5 py-5">
                      {product.description ? (
                        JSON.parse(product.description).length >= 1 ? (
                          <>
                            <Modal
                              description={JSON.parse(product.description)}
                            />
                          </>
                        ) : (
                          <p className="w-full text-center text-sm text-color-medium">
                            Nenhuma descrição.
                          </p>
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="w-full px-5 py-5">
                      <button
                        onClick={() => handleAddCart(product.uuid)}
                        className="w-full rounded bg-color-success py-3 font-bold text-white hover:opacity-75 focus:outline-none"
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="w-full rounded bg-primary py-10 text-center font-light text-color-medium">
            Nenhum produto encontrado nessa categoria!
          </p>
        )}
      </div>
    </Layout>
  )
}
