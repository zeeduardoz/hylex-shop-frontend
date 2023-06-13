import { useEffect, useState } from 'react'
import Image from 'next/image'

import { api } from '@services/apiClient'
import { Layout } from '@components/utils/layout'
import {
  FaClock,
  FaScroll,
  FaCreditCard,
  FaShieldAlt,
  FaStar,
  FaList
} from 'react-icons/fa'
import { userInfo } from 'os'

type UtilsInfo = {
  storeHeaderLine: string
  storeImageOne: string
  storeLinkImageOne: string
  storeImageTwo: string
  storeLinkImageTwo: string
  storeImageThree: string
  storeLinkImageThree: string
}

type SaleInfo = {
  name: string
}

type BuyerInfo = {
  name: string
  amount: number
}

const info = {
  page: 'Bem-vindo(a) à loja do Hylex!',
  description:
    'Apoie o servidor e adquira diversas vantagens exclusivas comprando nossos produtos.'
}

export default function Shop() {
  const [useLoading, setLoading] = useState(true)
  const [useInfo, setInfo] = useState<UtilsInfo>()
  const [topBuyer, setTopBuyer] = useState<BuyerInfo>()
  const [sales, setSales] = useState<SaleInfo[]>([])

  useEffect(() => {
    try {
      api.get(`/shopping/utils/getInfo`).then(response => {
        setInfo(response.data.data)
      })

      api.get(`/shopping/getLastTenSales`).then(response => {
        setSales(response.data.data)
      })

      api.get(`/shopping/getTopBuyer`).then(response => {
        setTopBuyer(response.data.data)
      })

      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <Layout title="Loja" header={info}>
      <div className="container w-full">
        {useLoading || !userInfo ? (
          <>
            <div className="flex h-56 w-full animate-pulse items-center justify-center rounded-md bg-blue-200"></div>
            <div className="mt-5 block w-full items-center justify-between space-y-5 lg:flex lg:space-x-10 lg:space-y-0">
              <div className="h-56 w-full animate-pulse rounded-md bg-blue-200 lg:w-1/2"></div>
              <div className="h-56 w-full animate-pulse rounded-md bg-blue-200 lg:w-1/2"></div>
            </div>
          </>
        ) : (
          <>
            <div className="flex w-full items-center justify-center rounded-md">
              <a className="rounded-md" href={useInfo?.storeLinkImageOne}>
                {useInfo?.storeImageOne ? (
                  <Image
                    className="w-full hover:scale-105 transform rounded-md transition delay-150 duration-300"
                    src={useInfo?.storeImageOne}
                    alt="Image One to Shopping"
                    width={1280}
                    height={400}
                  />
                ) : (
                  <div className="flex h-56 w-full animate-pulse items-center justify-center rounded-md bg-blue-200"></div>
                )}
              </a>
            </div>
            <div className="mt-5 block w-full items-center justify-between space-y-5 rounded-md lg:flex lg:space-x-10 lg:space-y-0">
              <a className="rounded-md" href={useInfo?.storeLinkImageTwo}>
                {useInfo?.storeImageTwo ? (
                  <Image
                    className="w-full hover:scale-105 transform rounded-md transition delay-150 duration-300"
                    src={useInfo?.storeImageTwo}
                    alt="Image Two to Shopping"
                    width={1280}
                    height={500}
                  />
                ) : (
                  <div className="h-56 w-full animate-pulse rounded-md bg-blue-200 lg:w-1/2"></div>
                )}
              </a>
              <a className="rounded-md" href={useInfo?.storeLinkImageThree}>
                {useInfo?.storeImageThree ? (
                  <Image
                    className="w-full hover:scale-105 transform rounded-md transition delay-150 duration-300"
                    src={useInfo?.storeImageThree}
                    alt="Image Three to Shopping"
                    width={1280}
                    height={500}
                  />
                ) : (
                  <div className="h-56 w-full animate-pulse rounded-md bg-blue-200 lg:w-1/2"></div>
                )}
              </a>
            </div>
          </>
        )}
        <div className="mt-10 block w-full items-center justify-between space-y-5 lg:flex lg:space-x-3 lg:space-y-0">
          <div className="flex h-52 w-full flex-col items-center justify-center rounded-md bg-primary p-5 lg:w-1/4">
            <p className="flex items-center justify-between text-lg">
              <FaClock className="mr-2" /> Ativação Automática
            </p>
            <p className="mt-3 text-center text-sm font-light text-color-medium">
              Os seus produtos são ativados automaticamente após a confirmação
              do pagamento.
            </p>
          </div>
          <div className="flex h-52 w-full flex-col items-center justify-center rounded-md bg-primary p-5 lg:w-1/4">
            <p className="flex items-center justify-between text-lg">
              <FaCreditCard className="mr-2" /> Formas de Pagamento
            </p>
            <p className="mt-3 text-center text-sm font-light text-color-medium">
              Pague via cartão de crédito, débito online, boleto bancário, PIX,
              pagamento em lotérica e Paypal.
            </p>
          </div>
          <div className="flex h-52 w-full flex-col items-center justify-center rounded-md bg-primary p-5 lg:w-1/4">
            <p className="flex items-center justify-between text-lg">
              <FaScroll className="mr-2" /> Termos e Condições
            </p>
            <p className="mt-3 text-center text-sm font-light text-color-medium">
              Antes de efetuar sua compra, leia nossos termos e condições.
              Pedimos que leia atentamente.
            </p>
          </div>
          <div className="flex h-52 w-full flex-col items-center justify-center rounded-md bg-primary p-5 lg:w-1/4">
            <p className="flex items-center justify-between text-lg">
              <FaShieldAlt className="mr-2" /> Segurança e Criptografia
            </p>
            <p className="mt-3 text-center text-sm font-light text-color-medium">
              Utilizamos meios de pagamento extremamente seguros. Seus dados são
              criptografados de ponta a ponta.
            </p>
          </div>
        </div>
        <div className="mt-10 block w-full items-start justify-between space-y-5 lg:flex lg:space-x-10 lg:space-y-0">
          <div className="flex w-full flex-col items-center justify-center rounded-md bg-primary px-5 py-10 lg:w-3/12">
            <h1 className="flex items-center text-xl font-semibold">
              <FaStar className="mr-2 text-yellow-400" /> Comprador do Mês
            </h1>
            {useLoading ? (
              <>
                <div className="mt-10 h-7 w-32 animate-pulse rounded bg-blue-200"></div>
                <div className="mt-3 h-7 w-32 animate-pulse rounded bg-blue-200"></div>
              </>
            ) : topBuyer ? (
              <>
                <p className="mt-10 font-light text-color-medium">
                  {topBuyer?.name}
                </p>
                <p className="font-light text-color-success">
                  R$ {topBuyer?.amount}
                </p>
                <img
                  className="mt-5"
                  src={
                    topBuyer?.name.includes('*')
                      ? 'https://minotar.net/armor/body/Alex/100.png'
                      : `https://minotar.net/armor/body/${topBuyer?.name}/100.png`
                  }
                  alt="Avatar"
                />
              </>
            ) : (
              <>
                <p className="mt-10 text-lg font-bold text-color-light">
                  Nenhum
                </p>
                <p className="font-light text-color-medium">R$ 0,00</p>
                <img
                  className="mt-5"
                  src="https://minotar.net/armor/body/Alex/100.png"
                  alt="Avatar"
                />
              </>
            )}
          </div>
          <div className="w-full rounded-md bg-primary p-10 lg:w-9/12">
            <h1 className="flex items-center text-xl font-semibold">
              <FaList className="mr-2 text-yellow-400" /> Compradores Recentes
            </h1>
            {useLoading ? (
              <div className="mt-5 grid grid-cols-5">
                <div className="flex flex-col items-center py-5">
                  <div className="h-28 w-28 animate-pulse rounded-md bg-blue-200"></div>
                  <div className="mt-3 h-5 w-28 animate-pulse rounded bg-gray-300"></div>
                </div>
                <div className="flex flex-col items-center py-5">
                  <div className="h-28 w-28 animate-pulse rounded-md bg-blue-200"></div>
                  <div className="mt-3 h-5 w-28 animate-pulse rounded bg-gray-300"></div>
                </div>
                <div className="flex flex-col items-center py-5">
                  <div className="h-28 w-28 animate-pulse rounded-md bg-blue-200"></div>
                  <div className="mt-3 h-5 w-28 animate-pulse rounded bg-gray-300"></div>
                </div>
                <div className="flex flex-col items-center py-5">
                  <div className="h-28 w-28 animate-pulse rounded-md bg-blue-200"></div>
                  <div className="mt-3 h-5 w-28 animate-pulse rounded bg-gray-300"></div>
                </div>
                <div className="flex flex-col items-center py-5">
                  <div className="h-28 w-28 animate-pulse rounded-md bg-blue-200"></div>
                  <div className="mt-3 h-5 w-28 animate-pulse rounded bg-gray-300"></div>
                </div>
                <div className="flex flex-col items-center py-5">
                  <div className="h-28 w-28 animate-pulse rounded-md bg-blue-200"></div>
                  <div className="mt-3 h-5 w-28 animate-pulse rounded bg-gray-300"></div>
                </div>
                <div className="flex flex-col items-center py-5">
                  <div className="h-28 w-28 animate-pulse rounded-md bg-blue-200"></div>
                  <div className="mt-3 h-5 w-28 animate-pulse rounded bg-gray-300"></div>
                </div>
                <div className="flex flex-col items-center py-5">
                  <div className="h-28 w-28 animate-pulse rounded-md bg-blue-200"></div>
                  <div className="mt-3 h-5 w-28 animate-pulse rounded bg-gray-300"></div>
                </div>
                <div className="flex flex-col items-center py-5">
                  <div className="h-28 w-28 animate-pulse rounded-md bg-blue-200"></div>
                  <div className="mt-3 h-5 w-28 animate-pulse rounded bg-gray-300"></div>
                </div>
                <div className="flex flex-col items-center py-5">
                  <div className="h-28 w-28 animate-pulse rounded-md bg-blue-200"></div>
                  <div className="mt-3 h-5 w-28 animate-pulse rounded bg-gray-300"></div>
                </div>
              </div>
            ) : sales && sales.length >= 1 ? (
              <div className="mt-5 grid grid-cols-5 gap-5">
                {sales.map(sale => {
                  return (
                    <div className="flex flex-col items-center py-5">
                      <img
                        className="h-28 w-28 rounded-md"
                        src={
                          sale.name.includes('*')
                            ? `https://minotar.net/avatar/steve.png`
                            : `https://minotar.net/avatar/${sale.name}.png`
                        }
                        alt="Avatar Buyer"
                      />
                      <p className="mt-3 font-light text-color-medium">
                        {sale.name}
                      </p>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="flex w-full items-center justify-center rounded bg-primary px-8 py-10">
                <p className="font-light text-color-medium">
                  Nenhuma compra recente encontrada!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
