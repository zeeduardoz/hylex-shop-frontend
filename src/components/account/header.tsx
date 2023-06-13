import { useContext, useEffect, useState } from 'react'
import { FaChartPie, FaFileInvoiceDollar, FaSignOutAlt } from 'react-icons/fa'
import { parseCookies } from 'nookies'

import { AuthContext } from '@contexts/AuthContext'
import { api } from '@services/apiClient'

interface InfluencerInfo {
  id: number
  uuid: string
  name: string
  percentage: number
  totalSales: number
  totalValue: number
}

export function AccountHeader() {
  const { useUser, useLoading, signOut } = useContext(AuthContext)
  const [influencer, setInfluencer] = useState<InfluencerInfo>()

  const influencers = [
    'Master',
    'Gerente',
    'Desenvolvedor',
    'Coordenador',
    'Administrador',
    'Moderador',
    'Ajudante',
    'Builder',
    'Youtuber',
    'Streamer',
    'MiniYoutuber'
  ]

  useEffect(() => {
    const { '@hylex/token': token } = parseCookies()
    if (useUser !== null) {
      influencers.map(i => {
        return useUser?.tag.includes(i)
          ? api
              .get('/user/getInfluencerInfo', {
                headers: { Authorization: 'Bearer ' + token }
              })
              .then(response => {
                setInfluencer(response.data.data[0])
              })
          : setInfluencer(undefined)
      })
    }
  }, [useUser])

  return (
    <div className="items-center bg-primary rounded-md flex flex-col justify-between p-8 space-y-10 w-full lg:flex-row lg:space-y-0">
      {useLoading ? (
        <>
          <div className="items-center flex space-x-5 w-full lg:w-1/3">
            <div className="animate-pulse bg-blue-300 rounded-full h-32 w-32"></div>
            <div>
              <div className="animate-pulse bg-gray-300 rounded my-2 py-3 w-32"></div>
              <div className="animate-pulse bg-gray-300 rounded my-2 py-3 w-32"></div>
            </div>
          </div>
          <div className="w-auto">
            <div className="animate-pulse bg-gray-300 rounded my-2 py-3 w-32"></div>
            <div className="animate-pulse bg-gray-300 rounded my-2 py-3 w-32"></div>
          </div>
          <div className="flex flex-col justify-start w-full lg:w-1/5">
            <div className="animate-pulse bg-blue-300 rounded my-2 py-3 w-32"></div>
            <div className="animate-pulse bg-blue-300 rounded my-2 py-3 w-32"></div>
            <div className="animate-pulse bg-blue-300 rounded my-2 py-3 w-32"></div>
          </div>
        </>
      ) : (
        <>
          <div className="items-center flex flex-col w-full lg:flex-row lg:space-x-5 lg:w-1/3">
            <img
              src={
                useUser?.name.includes('*')
                  ? `https://minotar.net/avatar/steve.png`
                  : `https://minotar.net/avatar/${useUser?.name}.png`
              }
              alt="Avatar"
              className="rounded-full w-32"
            />
            <div className="mt-3 text-center lg:mt-0 lg:text-left">
              <p className="text-lg font-semibold text-color-light">
                {useUser?.name}
              </p>
              <p className="font-light text-color-medium">{useUser?.email}</p>
            </div>
          </div>
          <div className="w-auto">
            <div>
              <p className="font-semibold text-color-warning">
                Coins:
                <b className="font-light ml-2">
                  {new Intl.NumberFormat('de-DE').format(
                    parseInt(useUser?.coins)
                  )}
                </b>
              </p>
              <p className="font-semibold text-color-warning">
                Cash:
                <b className="font-light ml-2">
                  {new Intl.NumberFormat('de-DE').format(
                    parseInt(useUser?.cash)
                  )}
                </b>
              </p>
            </div>
            {influencer ? (
              <div className="mt-5">
                <p className="font-semibold text-color-success">
                  Ganhos Influenciador:
                  <b className="font-light ml-2">R$ {influencer.totalValue}</b>
                </p>
                <p className="font-semibold text-color-success">
                  Vendas Influenciador:
                  <b className="font-light ml-2">{influencer.totalSales}x</b>
                </p>
              </div>
            ) : (
              <div className="mt-5">
                <div className="animate-pulse bg-blue-300 rounded my-2 py-3 w-32"></div>
                <div className="animate-pulse bg-blue-300 rounded my-2 py-3 w-32"></div>
              </div>
            )}
          </div>
          <div className="items-center flex flex-col w-full lg:items-start lg:w-1/5">
            <a
              href="/account/perfil"
              className="items-center flex my-1 hover:opacity-75 text-color-light hover:underline"
            >
              <FaChartPie className="mr-2" />
              Meu perfil
            </a>
            <a
              href="/account/orders"
              className="items-center flex my-1 hover:opacity-75 text-color-light hover:underline"
            >
              <FaFileInvoiceDollar className="mr-2" />
              Minhas compras
            </a>
            <a
              onClick={() => signOut()}
              className="items-center cursor-pointer flex my-1 hover:opacity-75 text-color-light hover:underline"
            >
              <FaSignOutAlt className="mr-2" />
              Deslogar
            </a>
          </div>
        </>
      )}
    </div>
  )
}
