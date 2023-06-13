import { useEffect, useState } from 'react'
import { parseCookies } from 'nookies'

import { AccountHeader } from '@components/account/header'
import { Layout } from '@components/utils/layout'
import { withSSRAuth } from '@utils/withSSRAuth'
import { api } from '@services/apiClient'

const info = {
  page: 'Meu perfil',
  description: 'Acesse todas as informações disponíveis sobre seu perfil!'
}

interface Stats {
  BedWars: {
    kills: number
    losses: number
    deaths: number
    wins: number
    matches: number
    kdr: number
  }
  SkyWars: {
    kills: number
    losses: number
    deaths: number
    wins: number
    matches: number
    kdr: number
  }
  Hg: {
    kills: number
    losses: number
    deaths: number
    wins: number
    matches: number
    kdr: number
  }
  Duels: {
    kills: number
    losses: number
    deaths: number
    wins: number
    matches: number
    kdr: number
  }
}

export default function Perfil() {
  const [useLoading, setLoading] = useState(true)
  const [useStats, setStats] = useState<Stats>()

  useEffect(() => {
    setLoading(true)
    const { '@hylex/token': token } = parseCookies()
    api
      .get('/user/getStatistics', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then(response => {
        setStats(response.data.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <Layout title="Meu perfil" header={info}>
      <div className="container w-full">
        <AccountHeader />
        <div className="mt-10 w-full">
          <div className="grid gap-4 w-full lg:grid-cols-3">
            {useLoading ? (
              <>
                <div className="animate-pulse bg-gray-300 rounded h-64 p-8 w-full"></div>
                <div className="animate-pulse bg-gray-300 rounded h-64 p-8 w-full"></div>
                <div className="animate-pulse bg-gray-300 rounded h-64 p-8 w-full"></div>
              </>
            ) : (
              <>
                <div className="bg-primary rounded p-8 w-full">
                  <h1 className="text-xl font-bold text-color-light">
                    Bedwars
                  </h1>
                  <div className="mt-5 pl-5">
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Kills
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.BedWars.kills}
                      </b>
                    </p>
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Mortes
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.BedWars.deaths}
                      </b>
                    </p>
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Vitórias
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.BedWars.wins}
                      </b>
                    </p>
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Derrotas
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.BedWars.losses}
                      </b>
                    </p>
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Partidas
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.BedWars.matches}
                      </b>
                    </p>
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Kdr
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.BedWars.kdr}
                      </b>
                    </p>
                  </div>
                </div>
                <div className="bg-primary rounded p-8 w-full">
                  <h1 className="text-xl font-bold text-color-light">
                    SkyWars
                  </h1>
                  <div className="mt-5 pl-5">
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Kills
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.SkyWars.kills}
                      </b>
                    </p>
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Mortes
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.SkyWars.deaths}
                      </b>
                    </p>
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Vitórias
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.SkyWars.wins}
                      </b>
                    </p>
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Derrotas
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.SkyWars.losses}
                      </b>
                    </p>
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Partidas
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.SkyWars.matches}
                      </b>
                    </p>
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Kdr
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.SkyWars.kdr}
                      </b>
                    </p>
                  </div>
                </div>
                <div className="bg-primary rounded p-8 w-full">
                  <h1 className="text-xl font-bold text-color-light">
                    HungerGames
                  </h1>
                  <div className="mt-5 pl-5">
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Kills
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.Hg.kills}
                      </b>
                    </p>
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Mortes
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.Hg.deaths}
                      </b>
                    </p>
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Vitórias
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.Hg.wins}
                      </b>
                    </p>
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Derrotas
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.Hg.losses}
                      </b>
                    </p>
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Partidas
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.Hg.matches}
                      </b>
                    </p>
                    <p className="items-center flex justify-between">
                      <b className="text-lg font-light text-color-medium">
                        Kdr
                      </b>
                      <b className="text-lg font-bold text-color-light">
                        {useStats?.Hg.kdr}
                      </b>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withSSRAuth(async () => {
  return { props: {} }
})
