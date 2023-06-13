import { GetServerSideProps } from 'next'

import { Layout } from '@components/auth/layout'
import { RecoverPassStep3Form } from '@components/auth/recover-pass-step3'
import { parseCookies } from 'nookies'

export default function RecoverPassStep3() {
  return (
    <Layout title="Recuperar senha">
      <RecoverPassStep3Form />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { '@hylex/tokenRecover': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
