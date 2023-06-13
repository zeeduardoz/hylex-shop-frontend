import { useEffect, useState } from 'react'

export function Cookies() {
  const [useCookies, setCookies] = useState<boolean>(true)

  useEffect(() => {
    if (localStorage.getItem('accept-cookies') === null) setCookies(false)
    if (localStorage.getItem('accept-cookies') === 'true') setCookies(true)
    if (localStorage.getItem('accept-cookies') === 'false') setCookies(true)
  }, [])

  function acceptCookies() {
    localStorage.setItem('accept-cookies', 'true')
    setCookies(true)
  }

  return useCookies ? (
    <></>
  ) : (
    <div className="bg-primary border-hr-color rounded-md border shadow-2xl bottom-0 right-0 mb-4 mr-4 max-w-sm px-5 py-7 fixed duration-200 transition-all ease-in-out z-50">
      <div className="items-center flex">
        <svg
          className="fill-current text-color-light w-40"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M510.37 254.79l-12.08-76.26a132.493 132.493 0 0 0-37.16-72.95l-54.76-54.75c-19.73-19.72-45.18-32.7-72.71-37.05l-76.7-12.15c-27.51-4.36-55.69.11-80.52 12.76L107.32 49.6a132.25 132.25 0 0 0-57.79 57.8l-35.1 68.88a132.602 132.602 0 0 0-12.82 80.94l12.08 76.27a132.493 132.493 0 0 0 37.16 72.95l54.76 54.75a132.087 132.087 0 0 0 72.71 37.05l76.7 12.14c27.51 4.36 55.69-.11 80.52-12.75l69.12-35.21a132.302 132.302 0 0 0 57.79-57.8l35.1-68.87c12.71-24.96 17.2-53.3 12.82-80.96zM176 368c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm32-160c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm160 128c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z" />
        </svg>
        <p className="leading-tight ml-4 pr-2 text-color-light">
          Usamos cookies para garantir que oferecemos a melhor experiência em
          nosso site.{' '}
          <a href="/privacy-policies " className="underline">
            Políticas de privacidade.
          </a>
        </p>
      </div>

      <div className="items-center flex font-semibold justify-center mt-6 space-x-5">
        <a
          onClick={() => acceptCookies()}
          className="bg-color-info rounded hover:opacity-75 px-6 py-2 text-center text-white"
        >
          Entendi
        </a>
      </div>
    </div>
  )
}
