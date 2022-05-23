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
          <main>
            <Main />
          </main>
          <Footer />
          <NextScript />
        </body>
      </Html>
    )
  }
}
