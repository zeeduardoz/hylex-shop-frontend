import Head from 'next/head'

interface Data {
  children: JSX.Element
  title: string
}

export function Layout(props: Data) {
  return (
    <>
      <Head>
        <title>{props.title} - Hylex</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700;900&display=swap"
          rel="stylesheet"
        />

        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <div className="flex h-screen w-screen">
        <div className="bg-header bg-cover hidden w-8/12 lg:block" />
        <a href="/" className="hidden left-10 top-5 absolute lg:block">
          <img src="/logo.png" alt="Logo" width="100" />
        </a>
        <div className="items-center bg-primary flex h-screen justify-center overflow-y-auto overscroll-y-auto w-full lg:w-4/12">
          {props.children}
        </div>
      </div>
    </>
  )
}
