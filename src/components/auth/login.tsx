import Link from 'next/link'
import Router from 'next/router'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaDiscord } from 'react-icons/fa'

import { AuthContext } from '@contexts/AuthContext'
import { AlertError } from '@hooks/useAlert'
import { DiscordSignIn } from '@hooks/useOauth'

export function LoginForm() {
  const { signIn } = useContext(AuthContext)
  const [useLoading, setLoading] = useState(false)
  const [useLoadingDc, setLoadingDc] = useState(false)

  const schema = Yup.object().shape({
    email: Yup.string()
      .required('Informe o email!')
      .email('Informe um email válido!'),
    password: Yup.string().required('Informe a senha!')
  })

  const initialValues = {
    email: '',
    password: ''
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  async function handleSignIn(data: any) {
    setLoading(true)
    try {
      await signIn(data)
    } catch (err) {
      AlertError('Ocorreu um erro na requisição!')
    }
    setLoading(false)
  }

  async function signInDiscord() {
    setLoadingDc(true)
    DiscordSignIn().then(url => {
      Router.push(url)
    })
    setLoadingDc(false)
  }

  return (
    <div className="w-full px-14">
      <h1 className="text-5xl font-black text-color-light">Entrar</h1>
      <p className="text-xl font-thin text-color-medium">
        Acesse sua conta, inserindo suas credenciais no servidor!
      </p>

      <form onSubmit={handleSubmit(handleSignIn)} className="mt-10 w-full">
        <div className="mt-6">
          <label htmlFor="email" className="block text-color-medium">
            E-mail
          </label>
          <input
            {...register('email')}
            defaultValue={initialValues.email}
            type="email"
            name="email"
            placeholder="nome@email.com"
            className="placeholder-gray-400 mt-1 w-full border-b-2 focus:border-blue-300 border-gray-300 bg-transparent px-4 py-3 text-sm text-color-light outline-none"
          />
          {errors.email && (
            <p className="py-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-6">
          <label htmlFor="password" className="block text-color-medium">
            Senha
          </label>
          <input
            {...register('password')}
            defaultValue={initialValues.password}
            type="password"
            name="password"
            placeholder="Insira sua senha"
            className="placeholder-gray-400 mt-1 w-full border-b-2 focus:border-blue-300 border-gray-300 bg-transparent px-4 py-3 text-sm text-color-light outline-none"
          />
          {errors.password && (
            <p className="py-1 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mt-2 text-right">
          <Link href="/auth/recover-pass-step1">
            <a className="hover:text-utils-primary focus:text-utils-primary cursor-pointer text-sm font-semibold text-color-medium">
              Esqueceu a senha?
            </a>
          </Link>
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
          {!useLoading && <span>Entrar</span>}
        </button>
        <div className="my-10 inline-flex w-full items-center justify-center">
          <hr className="w-1/3 border-hr-color" />
          <p className="px-5 text-center text-2xl tracking-wider text-color-medium">
            OU
          </p>
          <hr className="w-1/3 border-hr-color" />
        </div>
        <button
          type="button"
          onClick={() => signInDiscord()}
          className="inline-flex w-full items-center justify-center rounded bg-blue-900 hover:bg-opacity-90 px-4 py-3 text-lg font-bold tracking-wider text-white shadow-sm focus:outline-none transition duration-150 ease-in-out"
          disabled={useLoadingDc}
        >
          {useLoadingDc && (
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
          {useLoadingDc && <span>Aguarde</span>}
          {!useLoadingDc && (
            <span className="flex items-center">
              <FaDiscord className="mr-2" /> Entrar com Discord
            </span>
          )}
        </button>
      </form>
    </div>
  )
}
