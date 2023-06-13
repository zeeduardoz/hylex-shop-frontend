import { Layout } from '@components/auth/layout'
import { LoginForm } from '@components/auth/login'
import { withSSRGuest } from '@utils/withSSRGuest'

export default function Login() {
  return (
    <Layout title="Entrar">
      <LoginForm />
    </Layout>
  )
}

export const getServerSideProps = withSSRGuest(async () => {
  return { props: {} }
})
