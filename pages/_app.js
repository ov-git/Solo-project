import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { AuthProvider } from '../src/contexts/AuthContext'
import Head from 'next/head'

function MyApp({ Component, pageProps, session }) {
  return (
    <>
      <Head>
        <title>Drinkzz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SessionProvider session={session}>
        <AuthProvider >
        <Component {...pageProps} />
        </AuthProvider >
      </SessionProvider>
    </>
  )
}

export default MyApp
