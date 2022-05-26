import Document, { Main, Head, NextScript, Html } from 'next/document'

import Footer from '../components/Footer';
import Header from '../components/Header'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    return renderPage()
  }

  render () {    
    return (
      <Html>
        <Head>
          <title>Cadatrar</title>
          <meta name='author' content='Maycon Silva' />
        </Head>
        <body>
          <Header />
          <main className="
            flex justify-center items-center 
            bg-gradient-to-r from-blue-500 to-purple-500 
            text-white font-semibold max-w-full
          ">
            <div className="
              flex justify-center
              w-screen p-3
            ">
              <Main />
            </div>
          </main>
          <Footer />
          <NextScript />
        </body>
      </Html>
    )
  }
}
