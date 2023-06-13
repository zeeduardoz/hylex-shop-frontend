import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import { BiError } from 'react-icons/bi'
import { FaChevronLeft } from 'react-icons/fa'

function Error({ statusCode }: any) {
  return (
    <ThemeProvider enableSystem={false}>
      <Head>
        <title>Error {statusCode} - Hylex</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <div className="bg-background">
        <div className="container items-center flex h-screen justify-between w-screen">
          <div className="text-center w-full lg:text-left lg:w-1/2">
            <h1 className="items-center flex text-7xl font-black justify-center text-red-500 lg:justify-start">
              <BiError className="mr-3 mt-2" />
              {statusCode}
            </h1>
            <p className="text-2xl text-red-500">
              {statusCode === 404
                ? 'Desculpe, não conseguimos encontrar esta página.'
                : 'Desculpe, não conseguimos renderizar está página.'}
            </p>
            <p className="text-xl mt-10 text-gray-400">
              Mas não se preocupe, você pode encontrar muitas outras coisas em
              nossa página inicial.{' '}
            </p>

            <Link href="/">
              <a className="text-utils-primary items-center rounded block text-lg mt-10 py-3 underline lg:flex">
                <FaChevronLeft className="hidden mr-2 lg:block" />
                Voltar à página inicial
              </a>
            </Link>
          </div>
          <div className="hidden lg:block">
            <Image
              src="/error.png"
              alt="error image"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
