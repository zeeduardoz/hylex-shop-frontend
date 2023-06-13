import { Layout } from '@components/auth/layout'
import { RecoverPassStep1Form } from '@components/auth/recover-pass-step1'
import { withSSRGuest } from '@utils/withSSRGuest'

export default function RecoverPassStep2() {
  return (
    <Layout title="Recuperar senha">
      <RecoverPassStep1Form />
    </Layout>
  )
}

export const getServerSideProps = withSSRGuest(async () => {
  return { props: {} }
})
