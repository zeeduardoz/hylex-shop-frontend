import Head from 'next/head'

import { Header } from '@components/utils/header'
import { Footer } from '@components/utils/footer'
import { Cookies } from '@components/utils/cookies'

interface Data {
  children: JSX.Element
  title: string
  header: {
    page: string
    description: string
  }
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

      <Cookies />

      <Header info={props.header} />

      <div className="bg-foreground py-16">{props.children}</div>

      <Footer />
    </>
  )
}
