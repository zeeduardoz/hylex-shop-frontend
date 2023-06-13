import { Layout } from '@components/auth/layout'
import { LoginForm } from '@components/auth/login'
import { AlertError, AlertSuccess } from '@hooks/useAlert'
import { DiscordCallback } from '@hooks/useOauth'
import { withSSRGuest } from '@utils/withSSRGuest'
import { setCookie } from 'nookies'

export default function Login() {
  return (
    <Layout title="Entrar">
      <LoginForm />
    </Layout>
  )
}

export const getServerSideProps = withSSRGuest(async ctx => {
  const { code } = ctx.query

  const response = await DiscordCallback(code)

  if (response.status === 200) {
    AlertSuccess(response.data.message)

    setCookie(ctx, '@hylex/token', response.data.token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    })

    setCookie(ctx, '@hylex/refreshToken', response.data.refreshToken, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    })

    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  } else {
    AlertError('Ocorreu um erro na requisição!')
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }
})
