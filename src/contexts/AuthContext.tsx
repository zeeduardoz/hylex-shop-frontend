import Router from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { createContext, useEffect, useState } from 'react'

import { api } from '@services/apiClient'
import { AlertSuccess, AlertError, AlertWarn } from '@hooks/useAlert'

type UserType = {
  id: number
  name: string
  email: string
  discord: string
  cash: string
  coins: string
  tag: string
  friendlist: []
}

type signInType = {
  email: string
  password: string
}

type AuthCotextType = {
  useLoading: boolean
  useUser: UserType

  signIn: (data: signInType) => Promise<any>
  signOut: () => void
  refresh: () => void
}

export const AuthContext = createContext({} as AuthCotextType)

export function signOut() {
  destroyCookie(undefined, '@hylex/token', {
    path: '/'
  })
  destroyCookie(undefined, '@hylex/refreshToken', {
    path: '/'
  })

  Router.push('/')
}

export const AuthProvider: React.FC = ({ children }: any) => {
  const [useLoading, setLoading] = useState(false)
  const [useUser, setUser] = useState<UserType | any>(null)
  const [useUpdate, setUpdate] = useState(0)

  useEffect(() => {
    const { '@hylex/token': token } = parseCookies()

    if (token) {
      setLoading(true)
      api
        .get('/user/getInfo', { headers: { Authorization: 'Bearer ' + token } })
        .then(response => {
          setUser(response.data.data)
          setLoading(false)
        })
        .catch(() => {
          signOut()
        })
    }
  }, [useUpdate])

  function signOut() {
    destroyCookie(undefined, '@hylex/token', {
      path: '/'
    })
    destroyCookie(undefined, '@hylex/refreshToken', {
      path: '/'
    })

    setUser(null)

    Router.push('/')
  }

  async function signIn(data: signInType) {
    const response = await api.post('/auth/login', {
      email: data.email,
      password: data.password
    })

    if (response.data.status === 401) AlertWarn(response.data.message)
    if (response.data.status === 403) AlertWarn(response.data.message)
    if (response.data.status === 404) AlertError(response.data.message)

    if (response.data.status === 200) {
      AlertSuccess(response.data.message)

      const { token, refreshToken } = response.data.data

      setCookie(undefined, '@hylex/token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setCookie(undefined, '@hylex/refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      if (token) {
        setLoading(true)
        api
          .get('/user/getInfo', {
            headers: { Authorization: 'Bearer ' + token }
          })
          .then(response => {
            setUser(response.data.data)
            setLoading(false)
          })
      }

      Router.push('/')
    }
  }

  function refresh() {
    setUpdate(Math.random() * 1000)
  }

  return (
    <AuthContext.Provider
      value={{
        useLoading,
        useUser,
        signIn,
        refresh,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
