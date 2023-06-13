import Router from 'next/router'
import { parseCookies } from 'nookies'
import { createContext, useEffect, useState } from 'react'

import { api } from '@services/apiClient'
import { AlertError, AlertSuccess, AlertWarn } from '@hooks/useAlert'

type Product = {
  id: number
  uuid: string
  name: string
  category: string
  oldPrice: string
  newPrice: string
  highlight: string
  position: string
  images: string[]
}

interface CartInterface {
  products: Product[]
  finance: {
    price: {
      total: number
      subTotal: number
      totalDiscounts: string
    }
    influencer: string
    discountCoupon: string
  }
}

type CartContextType = {
  useLoading: boolean
  useCart: CartInterface

  refresh: () => void
  checkout: (data: any) => void
  addCart: (uuid: string) => void
  addInfluencer: (influencer: string) => void
  addCoupon: (coupon: string) => void
  removeCart: (uuid: string) => void
  removeInfluencer: (influencer: string) => void
  removeCoupon: (coupon: string) => void
}

export const CartContext = createContext({} as CartContextType)

export const CartProvider: React.FC = ({ children }: any) => {
  const [useLoading, setLoading] = useState(false)
  const [useCart, setCart] = useState<CartInterface | any>(null)
  const [useUpdate, setUpdate] = useState(0)

  useEffect(() => {
    const { '@hylex/token': token } = parseCookies()

    if (token) {
      setLoading(true)
      api
        .get('/shopping/cart', {
          headers: { Authorization: 'Bearer ' + token }
        })
        .then(response => {
          setCart(response.data.data)
          setLoading(false)
        })
    }
  }, [useUpdate])

  function refresh() {
    setUpdate(Math.random() * 1000)
  }

  async function checkout(data: any) {
    const { '@hylex/token': token } = parseCookies()
    setLoading(true)

    try {
      const response = await api.post(
        '/shopping/checkout',
        { gateway: data.gateway, cpf: data.cpf, email: data.email },
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      )
      if (response.data.status === 200) {
        Router.push(response.data.data)
      } else {
        AlertWarn(response.data.message)
      }
      setLoading(false)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
      setLoading(false)
    }
  }

  async function addCart(uuid: string) {
    const { '@hylex/token': token } = parseCookies()
    if (!token) {
      Router.push('/auth/login')
    } else {
      try {
        setLoading(true)
        const response = await api.post(
          '/shopping/cart/insert',
          { product: uuid },
          {
            headers: { Authorization: 'Bearer ' + token }
          }
        )
        if (response.data.status === 200) {
          AlertSuccess(response.data.message)
          refresh()
        } else {
          AlertWarn(response.data.message)
        }
      } catch (err) {
        AlertError('Ocorreu um erro na requisição!')
      }
      setLoading(false)
    }
  }

  async function addInfluencer(influencer: string) {
    const { '@hylex/token': token } = parseCookies()
    setLoading(true)

    try {
      const response = await api.post(
        '/shopping/influencer/add',
        { influencerName: influencer },
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      )
      if (response.data.status === 200) {
        AlertSuccess(response.data.message)
        refresh()
      } else if (response.data.status === 403) {
        AlertWarn(response.data.message)
      } else {
        AlertError(response.data.message)
      }
      setLoading(false)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
      setLoading(false)
    }
  }

  async function addCoupon(coupon: string) {
    const { '@hylex/token': token } = parseCookies()
    setLoading(true)

    try {
      const response = await api.post(
        '/shopping/coupon/add',
        { couponName: coupon },
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      )
      if (response.data.status === 200) {
        AlertSuccess(response.data.message)
        refresh()
      } else if (response.data.status === 403) {
        AlertWarn(response.data.message)
      } else {
        AlertError(response.data.message)
      }
      setLoading(false)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
      setLoading(false)
    }
  }

  async function removeCart(uuid: string) {
    const { '@hylex/token': token } = parseCookies()
    setLoading(true)

    try {
      const response = await api.post(
        '/shopping/cart/remove',
        { product: uuid },
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      )
      if (response.data.status === 200) {
        AlertSuccess(response.data.message)
        refresh()
      } else {
        AlertWarn(response.data.message)
      }
      setLoading(false)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
      setLoading(false)
    }
  }

  async function removeInfluencer(influencer: string) {
    const { '@hylex/token': token } = parseCookies()
    setLoading(true)

    try {
      const response = await api.post(
        '/shopping/influencer/remove',
        { influencerName: influencer },
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      )
      if (response.data.status === 200) {
        AlertSuccess(response.data.message)
        refresh()
      } else if (response.data.status === 403) {
        AlertWarn(response.data.message)
      } else {
        AlertError(response.data.message)
      }
      setLoading(false)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
      setLoading(false)
    }
  }

  async function removeCoupon(coupon: string) {
    const { '@hylex/token': token } = parseCookies()
    setLoading(true)

    try {
      const response = await api.post(
        '/shopping/coupon/remove',
        { couponName: coupon },
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      )
      if (response.data.status === 200) {
        AlertSuccess(response.data.message)
        refresh()
      } else if (response.data.status === 403) {
        AlertWarn(response.data.message)
      } else {
        AlertError(response.data.message)
      }
      setLoading(false)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
      setLoading(false)
    }
  }

  return (
    <CartContext.Provider
      value={{
        refresh,
        useCart,
        useLoading,
        checkout,
        addCart,
        addInfluencer,
        addCoupon,
        removeCart,
        removeInfluencer,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
