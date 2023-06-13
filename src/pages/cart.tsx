import { Layout } from '@components/utils/layout'
import { ProductsCart } from '@components/cart/products'
import { UtilsCart } from '@components/cart/utils'
import { CheckoutCart } from '@components/cart/checkout'
import { withSSRAuth } from '@utils/withSSRAuth'

const info = {
  page: 'Carrinho',
  description:
    'Aqui está seu carrinho de compras, utilize um cupom e ganhe desconto na compra!'
}

export default function Cart() {
  return (
    <Layout title="Carrinho" header={info}>
      <div className="container w-full">
        <div className="bg-primary rounded-md p-10 w-full">
          <ProductsCart />
          <UtilsCart />
          <CheckoutCart />
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAuth(async () => {
  return { props: {} }
})
