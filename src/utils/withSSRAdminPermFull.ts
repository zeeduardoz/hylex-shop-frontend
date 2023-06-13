import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { parseCookies } from 'nookies'
import decode from 'jwt-decode'

export function withSSRAdminPermFull<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const { '@hylex/token': token } = parseCookies(ctx)

    if (!token) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false
        }
      }
    } else {
      const user = decode<{ roles: string[] }>(token)

      if (!user?.roles.includes('Master')) {
        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }
    }

    return await fn(ctx)
  }
}
