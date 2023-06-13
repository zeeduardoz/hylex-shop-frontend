import { createContext, useState } from 'react'
import { parseCookies } from 'nookies'

import { api } from '@services/apiClient'

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

type OrdersContextType = {
  orders: Purchases[]
  page: number
  totalPage: number
  useLoading: boolean
  FromToTotal: string

  nextPage: (page: number) => void
  previousPage: (page: number) => void
  GetOrders: () => Promise<any>
}

export const OrdersContext = createContext({} as OrdersContextType)

export const OrdersProvider: React.FC = ({ children }: any) => {
  const [useLoading, setLoading] = useState(false)
  const [orders, setOrders] = useState<Purchases[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const [totalOrders, setTotalOrders] = useState<number>(0)
  const [FromToTotal, setFromToTotal] = useState<string>('')

  function nextPage(page: number) {
    setPage(page)
    GetOrdersNext()
  }

  function previousPage(page: number) {
    setPage(page)
    GetOrdersPrev()
  }

  async function GetOrders() {
    const { '@hylex/token': token } = parseCookies()

    setLoading(true)

    const response = await api.get(
      `/user/getPurchases?perPage=${5}&currentPage=${page}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalOrders(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalOrders}`
        )
      }
    }

    setOrders(response.data.data)
    setLoading(false)
  }

  async function GetOrdersNext() {
    const { '@hylex/token': token } = parseCookies()

    setLoading(true)

    const response = await api.get(
      `/user/getPurchases?perPage=${5}&currentPage=${page + 1}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page + 1 === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalOrders(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalOrders}`
        )
      }
    }

    setOrders(response.data.data)
    setLoading(false)
  }

  async function GetOrdersPrev() {
    const { '@hylex/token': token } = parseCookies()

    setLoading(true)

    const response = await api.get(
      `/user/getPurchases?perPage=${5}&currentPage=${page - 1}`,
      { headers: { Authorization: 'Bearer ' + token } }
    )

    if (response.data.pagination) {
      if (page - 1 === 1) {
        setTotalPage(Math.ceil(response.data.pagination.total / 5))
        setTotalOrders(response.data.pagination.total)
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${response.data.pagination.total}`
        )
      } else {
        setFromToTotal(
          `Items ${response.data.pagination.from} á ${response.data.pagination.to} de ${totalOrders}`
        )
      }
    }

    setOrders(response.data.data)
    setLoading(false)
  }

  return (
    <OrdersContext.Provider
      value={{
        useLoading,
        FromToTotal,
        orders,
        GetOrders,
        page,
        totalPage,
        nextPage,
        previousPage
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
