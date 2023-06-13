import { useContext } from 'react'
import InputMask from 'react-input-mask'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { CartContext } from '@contexts/CartContext'
import { AlertError } from '@hooks/useAlert'
import { AuthContext } from '@contexts/AuthContext'

export function CheckoutCart() {
  const { useCart, useLoading, checkout } = useContext(CartContext)
  const { useUser } = useContext(AuthContext)

  let schema

  if (useUser?.email !== undefined) {
    schema = Yup.object().shape({
      cpf: Yup.string().required('Informe o cpf!'),
      terms: Yup.boolean().oneOf([true], 'Aceite os termos para comprar!')
    })
  } else {
    schema = Yup.object().shape({
      cpf: Yup.string().required('Informe o cpf!'),
      email: Yup.string().required('Informe o e-mail!'),
      terms: Yup.boolean().oneOf([true], 'Aceite os termos para comprar!')
    })
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  async function handleCheckout(data: any) {
    try {
      await checkout(data)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
    }
  }

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold text-color-light">Passos Finais</h1>
      <form
        onSubmit={handleSubmit(handleCheckout)}
        className="mt-10 w-full items-start justify-between space-y-20 lg:flex lg:space-x-20 lg:space-y-0"
      >
        <div className="w-full lg:w-1/2">
          <span className="mb-10 flex items-start">
            <input
              {...register('terms')}
              type="checkbox"
              name="terms"
              className="-mt-7 mr-3 h-20 w-20 lg:-mt-2 lg:h-10 lg:w-10"
            />
            <p className="text-base font-light text-color-medium">
              Para prosseguir com a compra, você deve estar de acordo com nossos
              termos de compras, caso o contrario não finalize sua compra!{' '}
              <a
                className="underline"
                href="https://hylex.net/terms"
                target="_blank"
              >
                Termos de Compra.
              </a>
              {errors.terms && (
                <p className="py-1 text-sm text-red-400">
                  {errors.terms.message}
                </p>
              )}
            </p>
          </span>
          <h2 className="text-lg font-light text-color-medium">
            CPF para Pagamento
          </h2>
          <InputMask
            {...register('cpf')}
            mask="999.999.999-99"
            type="text"
            name="cpf"
            placeholder="Qual é o CPF?"
            className="placeholder-gray-400 mt-3 w-full border-b-2 focus:border-blue-300 border-gray-300 bg-transparent px-4 py-3 text-sm text-color-light outline-none"
          />
          <h2 className="mt-5 text-lg font-light text-color-medium">
            E-mail para Pagamento
          </h2>
          <input
            {...register('email')}
            type="email"
            name="email"
            defaultValue={useUser?.email}
            placeholder="Qual é o E-mail?"
            className="placeholder-gray-400 mt-3 w-full border-b-2 focus:border-blue-300 border-gray-300 bg-transparent px-4 py-3 text-sm text-color-light outline-none"
            disabled={useUser?.email?.length >= 2}
          />
          {errors.email && (
            <p className="py-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>
        <div className="w-full lg:w-1/2">
          <div className="border-b border-hr-color pb-10">
            <p className="flex w-full items-center justify-between text-xl font-light text-color-success">
              <b className="text-right font-semibold text-color-medium">
                Sub-Total:
              </b>
              R$ {useLoading ? 0 : useCart?.finance.price.subTotal}
            </p>
            <p className="flex w-full items-center justify-between text-xl font-light text-color-danger">
              <b className="text-right font-semibold text-color-medium">
                Descontos:
              </b>
              R$ -{useLoading ? 0 : useCart?.finance.price.totalDiscounts}
            </p>
            <p className="mt-5 flex w-full items-center justify-between text-2xl font-light text-color-success">
              <b className="text-right font-semibold text-color-medium">
                Total:
              </b>
              R$ {useLoading ? 0 : useCart?.finance.price.total}
            </p>
          </div>
          <div className="my-10 flex items-center justify-center space-x-10">
            <label>
              <input
                {...register('gateway')}
                type="radio"
                name="gateway"
                defaultValue="mp"
                defaultChecked
              />
              <img src="/mercado-pago.png" className="w-44" />
            </label>

            <label>
              <input
                {...register('gateway')}
                type="radio"
                name="gateway"
                defaultValue="picpay"
              />
              <img src="/picpay.png" className="w-44" />
            </label>
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded bg-color-success hover:bg-opacity-90 px-4 py-3 text-lg font-bold tracking-wider text-white shadow-sm focus:outline-none transition duration-150 ease-in-out"
            disabled={useLoading && useCart?.finance.price.total !== 0}
          >
            {useLoading && (
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {useLoading && <span>Aguarde</span>}
            {!useLoading && <span>Finalizar Compra</span>}
          </button>
        </div>
      </form>
    </div>
  )
}
