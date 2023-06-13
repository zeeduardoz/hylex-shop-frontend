import Router from 'next/router'
import { destroyCookie, setCookie, parseCookies } from 'nookies'

import { api } from '@services/apiClient'

type Recover = {
  email: string
  cpf: string
}

type ChangePassword = {
  password: string
  rePassword: string
}

type Code = {
  one: string
  two: string
  three: string
  four: string
  five: string
}

export async function RecoverStep1(data: Recover) {
  const response = await api.post('/auth/recover/step1', { email: data.email })

  if (response.data.status === 200) Router.push('/auth/recover-pass-step2')
  return response.data
}

export async function RecoverStep2(data: Code) {
  const response = await api.post('/auth/recover/step2', {
    code: data.one + data.two + data.three + data.four + data.five
  })

  if (response.data.status === 200) {
    api.defaults.headers.Authorization = `Bearer ${response.data.data}`
    setCookie(undefined, '@hylex/tokenRecover', response.data.data.user.token, {
      maxAge: 60 * 60 * 24 * 1, // 30 days
      path: '/'
    })

    Router.push('/auth/recover-pass-step3')
  }

  return response.data
}

export async function RecoverStep3(data: ChangePassword) {
  const { '@hylex/tokenRecover': token } = parseCookies()

  const response = await api.post(
    '/auth/changePass',
    { password: data.password },
    { headers: { Authorization: 'Bearer ' + token } }
  )

  destroyCookie(undefined, '@hylex/tokenRecover', {
    path: '/'
  })

  if (response.data.status === 200) {
    Router.push('/auth/login')
  }

  return response.data
}
