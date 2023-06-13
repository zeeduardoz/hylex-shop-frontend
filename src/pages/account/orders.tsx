import { useContext, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { Layout } from '@components/utils/layout'
import { AccountHeader } from '@components/account/header'
import { Modal } from '@components/account/order'
import { OrdersContext } from '@contexts/OrdersContext'
import { withSSRAuth } from '@utils/withSSRAuth'

const info = {
  page: 'Minhas compras',
  description: 'Tenha acesso a todas as suas compras realizadas no site!'
}

export interface Purchases {
  id: number
  uuid: string
  user: string
  items: []
  paymentType: string
  status: string
  gateway: string
  totalAmount: number
  totalDiscounts: number
  subTotal: number
  orderId: number
  influencer: number
  discountCoupon: string
  approvedAt: Date
  createdAt: Date
}

export default function Orders() {
  const {
    useLoading,
    orders,
    GetOrders,
    page,
    totalPage,
    nextPage,
    previousPage,
    FromToTotal
  } = useContext(OrdersContext)

  useEffect(() => {
    GetOrders()
  }, [])

  return (
    <Layout title="Minhas compras" header={info}>
      <div className="container w-full">
        <AccountHeader />

        <div className="mt-10">
          {useLoading ? (
            <div className="flex flex-col mt-2 space-y-2">
              <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
              <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
              <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
              <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
              <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
              <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
              <div className="animate-pulse bg-gray-300 rounded p-8 w-full"></div>
            </div>
          ) : orders && orders.length >= 1 ? (
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden sm:rounded-lg">
                    <table className="divide-foreground divide-y-8 min-w-full">
                      <thead className="bg-primary">
                        <tr>
                          <th
                            scope="col"
                            className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                          >
                            Compra
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                          >
                            Gateway
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="text-sm font-light tracking-wider p-5 text-left text-color-medium"
                          >
                            Valor
                          </th>
                          <th scope="col" className="p-5 relative">
                            <span className="sr-only">Funções</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-foreground rounded-lg divide-foreground divide-y-8">
                        {orders.map((order: Purchases, index: number) => {
                          return (
                            <tr key={index} className="bg-primary">
                              <td className="px-6 py-5 whitespace-nowrap">
                                <p className="font-lg font-semibold text-color-light">
                                  {order.items.map((p: any) => {
                                    return `${p.quantity}x ${p.product}`
                                  })}
                                </p>
                                <p className="font-light text-color-medium">
                                  {order.orderId}
                                </p>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <p className="font-light text-color-light">
                                  {order.gateway}
                                </p>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <p className="font-light text-color-light">
                                  {order.status}
                                </p>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <p className="text-lg font-light text-color-success">
                                  R$ {order.totalAmount}
                                </p>
                              </td>
                              <td className="px-6 py-5 whitespace-nowrap">
                                <Modal order={order} />
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="items-center flex justify-center mt-5 space-x-10 lg:justify-end">
                <div className="text-sm font-light text-color-medium">
                  <p>Página atual: {page}</p>
                  <p>{FromToTotal}</p>
                </div>
                <div className="items-center flex justify-end">
                  {page === 1 ? (
                    page === totalPage ? (
                      <>
                        <button
                          className="shadown-md bg-primary rounded-l-md focus:outline-none p-3 text-white"
                          disabled
                        >
                          <FaChevronLeft />
                        </button>
                        <button
                          disabled
                          className="shadown-md bg-primary rounded-r-md focus:outline-none p-3 text-white"
                        >
                          <FaChevronRight />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="shadown-md bg-primary rounded-l-md focus:outline-none p-3 text-white"
                          disabled
                        >
                          <FaChevronLeft />
                        </button>
                        <button
                          onClick={() => nextPage(page + 1)}
                          className="shadown-md bg-primary rounded-r-md focus:outline-none p-3 text-white"
                        >
                          <FaChevronRight />
                        </button>
                      </>
                    )
                  ) : page === totalPage ? (
                    <>
                      <button
                        onClick={() => previousPage(page - 1)}
                        className="shadown-md bg-primary rounded-l-md focus:outline-none p-3 text-white"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        className="shadown-md bg-primary rounded-r-md focus:outline-none p-3 text-white"
                        disabled
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => previousPage(page - 1)}
                        className="shadown-md bg-primary rounded-l-md focus:outline-none p-3 text-white"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={() => nextPage(page + 1)}
                        className="shadown-md bg-primary rounded-r-md focus:outline-none p-3 text-white"
                      >
                        <FaChevronRight />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="items-center bg-primary rounded flex justify-center px-8 py-5 w-full">
              <p className="font-light text-color-medium">
                Nenhuma compra encontrada!
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAuth(async () => {
  return { props: {} }
})
