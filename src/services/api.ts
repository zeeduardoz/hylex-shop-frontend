import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'

import { signOut } from '@contexts/AuthContext'
import { AuthTokenError } from './error/AuthTokenError'

let isRefreshing = false
let failedRequestsQueue = [] as any

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)
  const { '@hylex/token': token } = cookies

  const api = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  api.interceptors.response.use(
    response => {
      return response
    },
    (error: AxiosError | any) => {
      if (error.response.status === 401) {
        if (error.response.data?.code === 'token.expired') {
          cookies = parseCookies(ctx)

          const { '@hylex/refreshToken': refreshToken, '@hylex/token': token } =
            cookies
          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true

            api
              .post(
                '/auth/refreshToken',
                {
                  refreshToken
                },
                { headers: { Authorization: 'Bearer ' + token } }
              )
              .then(response => {
                const { token, refreshToken } = response.data

                setCookie(ctx, '@hylex/token', token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/'
                })

                setCookie(ctx, '@hylex/refreshToken', refreshToken, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/'
                })

                api.defaults.headers.Authorization = `Bearer ${token}`

                failedRequestsQueue.forEach((request: any) =>
                  request.onSuccess(token)
                )
                failedRequestsQueue = []
              })
              .catch(err => {
                failedRequestsQueue.forEach((request: any) =>
                  request.onFailure(err)
                )
                failedRequestsQueue = []

                if (process.browser) {
                  signOut()
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers.Authorization = `Bearer ${token}`

                resolve(api(originalConfig))
              },
              onFailure: (err: AxiosError) => {
                reject(err)
              }
            })
          })
        } else {
          if (process.browser) {
            signOut()
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      return Promise.reject(error)
    }
  )

  return api
}
