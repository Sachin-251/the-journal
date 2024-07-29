import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import { ThemeContextProvider } from '@/context/ThemeContext'
import ThemeProvider from '@/providers/ThemeProvider'
import AuthProvider from '@/providers/AuthProvider'
import { WebVitals } from '@/utils/web-vitals'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Journal',
  description: 'A Place to Express Yourself. One Stop for your Writing and Blogging Passion.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/featured.jpg" as='image' />
      </head>
      <body className={inter.className}>
        <WebVitals />
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <Toaster />
              <div className='container'>
                <div className='wrapper'>
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
        
        
      </body>
    </html>
  )
}
