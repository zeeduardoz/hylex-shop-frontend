/* eslint-disable import/extensions */
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'

import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'react-slideshow-image/dist/styles.css'

import { AuthProvider } from '@contexts/AuthContext'
import { UtilsProvider } from '@contexts/UtilsContext'
import { CartProvider } from '@contexts/CartContext'
import { OrdersProvider } from '@contexts/OrdersContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UtilsProvider>
        <ThemeProvider enableSystem={false}>
          <ToastContainer
            autoClose={3000}
            position="top-right"
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
          />

          <CartProvider>
            <OrdersProvider>
              <Component {...pageProps} />
            </OrdersProvider>
          </CartProvider>
        </ThemeProvider>
      </UtilsProvider>
    </AuthProvider>
  )
}
export default MyApp
