import { Layout } from '@components/auth/layout'
import { RecoverPassStep2Form } from '@components/auth/recover-pass-step2'
import { withSSRGuest } from '@utils/withSSRGuest'

export default function RecoverPassStep1() {
  return (
    <Layout title="Recuperar senha">
      <RecoverPassStep2Form />
    </Layout>
  )
}

export const getServerSideProps = withSSRGuest(async () => {
  return { props: {} }
})
