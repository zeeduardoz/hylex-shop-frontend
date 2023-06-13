import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { AlertError, AlertSuccess, AlertWarn } from '@hooks/useAlert'
import { RecoverStep3 } from '@hooks/useRecoverPass'

export function RecoverPassStep3Form() {
  const [useLoading, setLoading] = useState(false)

  const schema = Yup.object().shape({
    password: Yup.string().required('Informe a sua nova senha!'),
    rePassword: Yup.string()
      .required('Repita a sua nova senha!')
      .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais!')
  })

  const initialValues = {
    password: '',
    rePassword: ''
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  async function handleRecover(data: any) {
    setLoading(true)
    try {
      const response = await RecoverStep3(data)

      if (response.status === 200) AlertSuccess(response.message)
      if (response.status === 400) AlertWarn(response.message)
      if (response.status === 404) AlertError(response.message)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
    }
    setLoading(false)
  }

  return (
    <div className="w-full px-14">
      <h1 className="text-5xl font-black text-color-light">Recuperar</h1>
      <p className="text-xl font-thin text-color-medium">
        Informa sua nova senha nos campos abaixo!
      </p>

      <form onSubmit={handleSubmit(handleRecover)} className="mt-10 w-full">
        <div className="mt-6">
          <label htmlFor="password" className="block text-color-medium">
            Senha
          </label>
          <input
            {...register('password')}
            defaultValue={initialValues.password}
            type="password"
            name="password"
            placeholder="Insira sua nova senha"
            className="placeholder-gray-400 mt-1 w-full border-b-2 focus:border-blue-300 border-gray-300 bg-transparent px-4 py-3 text-sm text-color-light outline-none"
          />
          {errors.password && (
            <p className="py-1 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mt-6">
          <label htmlFor="rePassword" className="block text-color-medium">
            Senha
          </label>
          <input
            {...register('rePassword')}
            defaultValue={initialValues.rePassword}
            type="password"
            name="rePassword"
            placeholder="Repita sua nova senha"
            className="placeholder-gray-400 mt-1 w-full border-b-2 focus:border-blue-300 border-gray-300 bg-transparent px-4 py-3 text-sm text-color-light outline-none"
          />
          {errors.rePassword && (
            <p className="py-1 text-sm text-red-400">
              {errors.rePassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-10 inline-flex w-full items-center justify-center rounded bg-color-success hover:bg-opacity-90 px-4 py-3 text-lg font-bold uppercase tracking-wider text-white shadow-sm focus:outline-none transition duration-150 ease-in-out"
          disabled={useLoading}
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
          {!useLoading && <span>Alterar</span>}
        </button>
      </form>
    </div>
  )
}
