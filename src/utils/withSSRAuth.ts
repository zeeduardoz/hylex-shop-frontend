import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'
import { parseCookies } from 'nookies'

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
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
    }

    return await fn(ctx)
  }
}
