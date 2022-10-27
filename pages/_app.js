import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

function MyApp({ Component, pageProps, session }) {
  return (
    <div>
      <Head>
        <title>Drinkzz</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  )
}

export default MyApp
