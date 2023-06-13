import { useContext, useEffect, useState } from 'react'
import {
  FaGlobe,
  FaBars,
  FaTimes,
  FaUser,
  FaShoppingBag,
  FaSignOutAlt
} from 'react-icons/fa'
import axios from 'axios'
import copy from 'copy-to-clipboard'

import { AuthContext } from '@contexts/AuthContext'
import { Theme } from '@components/utils/theme'
import { api } from '@services/apiClient'
import { CartContext } from '@contexts/CartContext'

export function Header(props: any) {
  const { useUser, useLoading, signOut } = useContext(AuthContext)
  const { useCart } = useContext(CartContext)
  const [useNav, setNav] = useState(false)
  const [useOnline, setOnline] = useState(0)

  const [strHead, setStrHead] = useState('Carregando...')

  useEffect(() => {
    axios
      .get(`https://api.mcsrvstat.us/2/hylex.net`)
      .then(response => {
        if (response.data.players) {
          setOnline(response.data.players.online)
        } else {
          setOnline(0)
        }
      })
      .catch(err => {
        console.log(err)
        setOnline(0)
      })
    api.get(`/shopping/utils/getInfo`).then(response => {
      setStrHead(response.data.data.storeHeaderLine)
    })
  }, [])

  const copyToClipboard = () => {
    copy('hylex.net')
  }

  return (
    <header className="bg-header bg-cover h-1/2">
      <nav>
        <div className="bg-color-info p-5">
          <p className="italic text-center text-white">{strHead}</p>
        </div>
        <div className="bg-secondary">
          <div className="items-center flex justify-between">
            <a
              href="/"
              className="items-center flex hover:opacity-80 px-10 delay-100 transition"
            >
              <img src="/logo.png" alt="Logo" width="50" />
              <hr className="bg-gray-300 hidden px-10 rotate-90 transform xl:block" />
              <p className="hidden text-4xl font-black tracking-wider text-white uppercase xl:block">
                hylex.net
              </p>
            </a>
            <div className="items-center flex justify-between">
              <div className="group items-center flex flex-col relative">
                <a
                  onClick={() => copyToClipboard()}
                  className="items-center cursor-pointer hidden text-xl font-thin mr-5 hover:opacity-90 p-10 text-color-success delay-100 transition lg:flex"
                >
                  <FaGlobe className="mr-2" /> {useOnline} Jogadores online.
                </a>
                <div className="items-center group-hover:flex hidden flex-col bottom-2 absolute">
                  <span className="whitespace-no-wrap bg-black shadow-lg text-xs italic leading-none p-2 relative text-white z-10">
                    Clique para copiar!
                  </span>
                </div>
              </div>
              <Theme />
              {useLoading ? (
                <div className="animate-pulse bg-color-info cursor-pointer hidden p-14 px-28 lg:block"></div>
              ) : (
                <>
                  {useUser ? (
                    <div className="items-center hidden justify-between lg:flex">
                      <a
                        href="/cart"
                        className="text-3xl font-black tracking-wider hover:opacity-90 px-10 relative text-white uppercase delay-100 transition lg:block"
                      >
                        <FaShoppingBag />
                        <p className="bg-color-danger rounded-full text-sm -top-3 right-5 px-1 absolute text-white">
                          {useCart?.products.length}
                        </p>
                      </a>
                      <a
                        href="/account/perfil"
                        className="bg-color-info hidden text-2xl font-black tracking-wider hover:opacity-90 p-11 text-white uppercase delay-100 transition lg:block"
                      >
                        <FaUser />
                      </a>
                      <a
                        onClick={() => signOut()}
                        className="bg-color-info cursor-pointer hidden text-2xl font-black tracking-wider hover:opacity-90 p-11 text-white uppercase delay-100 transition lg:block"
                      >
                        <FaSignOutAlt />
                      </a>
                    </div>
                  ) : (
                    <a
                      href="/auth/login"
                      className="bg-color-info hidden text-2xl font-black tracking-wider hover:opacity-90 p-10 text-white uppercase delay-100 transition lg:block"
                    >
                      Minha conta
                    </a>
                  )}
                </>
              )}
              <a
                onClick={() => setNav(!useNav)}
                className="bg-color-info block text-4xl font-black tracking-wider hover:opacity-90 p-8 text-white uppercase delay-100 transition lg:hidden"
              >
                {useNav ? <FaTimes /> : <FaBars />}
              </a>
            </div>
          </div>
        </div>
        <div
          className={
            useNav
              ? 'bg-black h-auto absolute w-screen py-12 space-y-10 z-50'
              : 'hidden'
          }
        >
          <div className="items-center flex justify-center">
            <a
              href="/account/perfil"
              className="block text-3xl font-bold hover:opacity-70 px-8 text-center text-white uppercase delay-100 transition"
            >
              <FaUser />
            </a>
            <a
              href="/cart"
              className="0 block text-3xl font-bold hover:opacity-70 px-8 text-center text-white uppercase delay-100 transition"
            >
              <FaShoppingBag />
            </a>
            <a
              onClick={() => signOut()}
              className="block text-3xl font-bold hover:opacity-70 px-8 text-center text-white uppercase delay-100 transition"
            >
              <FaSignOutAlt />
            </a>
          </div>
          <hr className="border-hr-color mx-auto pb-5 w-1/3" />
          <a
            href="/"
            className="2xl:text-base text-sm font-bold hover:opacity-70 text-white uppercase delay-100 transition"
          >
            Início
          </a>
          <a
            href="/vips"
            className="2xl:text-base text-sm font-bold hover:opacity-70 text-white uppercase delay-100 transition"
          >
            Vips
          </a>
          <a
            href="/haven"
            className="2xl:text-base text-sm font-bold hover:opacity-70 text-white uppercase delay-100 transition"
          >
            Haven
          </a>
          <a
            href="/packages"
            className="2xl:text-base text-sm font-bold hover:opacity-70 text-white uppercase delay-100 transition"
          >
            Pacotes
          </a>
          <a
            href="/cash"
            className="2xl:text-base text-sm font-bold hover:opacity-70 text-white uppercase delay-100 transition"
          >
            Cash
          </a>
          <a
            href="/battle-pass"
            className="2xl:text-base text-sm font-bold hover:opacity-70 text-white uppercase delay-100 transition"
          >
            Passe de batalha
          </a>
          <a
            href="/companions"
            className="2xl:text-base text-sm font-bold hover:opacity-70 text-white uppercase delay-100 transition"
          >
            Companheiros
          </a>
        </div>
        <div className="backdrop-blur-sm backdrop-filter bg-black bg-opacity-50">
          <div className="items-center hidden justify-center py-5 space-x-10 lg:flex">
            <a
              href="/"
              className="2xl:text-base text-sm font-bold hover:opacity-70 text-white uppercase delay-100 transition"
            >
              Início
            </a>
            <a
              href="/vips"
              className="2xl:text-base text-sm font-bold hover:opacity-70 text-white uppercase delay-100 transition"
            >
              Vips
            </a>
            <a
              href="/haven"
              className="2xl:text-base text-sm font-bold hover:opacity-70 text-white uppercase delay-100 transition"
            >
              Haven
            </a>
            <a
              href="/packages"
              className="2xl:text-base text-sm font-bold hover:opacity-70 text-white uppercase delay-100 transition"
            >
              Pacotes
            </a>
            <a
              href="/cash"
              className="2xl:text-base text-sm font-bold hover:opacity-70 text-white uppercase delay-100 transition"
            >
              Cash
            </a>
            <a
              href="/battle-pass"
              className="2xl:text-base text-sm font-bold hover:opacity-70 text-white uppercase delay-100 transition"
            >
              Passe de batalha
            </a>
            <a
              href="/companions"
              className="2xl:text-base text-sm font-bold hover:opacity-70 text-white uppercase delay-100 transition"
            >
              Companheiros
            </a>
          </div>
          <div className="items-center flex justify-center py-5 space-x-16 lg:hidden">
            <a
              onClick={() => copyToClipboard()}
              className="items-center flex text-lg font-thin mr-5 hover:opacity-90 text-color-success delay-100 transition lg:hidden"
            >
              <FaGlobe className="mr-2" /> {useOnline} Jogadores online.
            </a>
          </div>
        </div>
      </nav>

      <div className="items-center backdrop-blur-sm backdrop-filter flex justify-center w-full">
        <div className="px-5 py-36">
          <h1 className="text-4xl font-black text-center text-white">
            {props.info.page}
          </h1>
          <p className="brightness-125 filter text-xl font-light text-center text-color-medium">
            {props.info.description}
          </p>
        </div>
      </div>
    </header>
  )
}
