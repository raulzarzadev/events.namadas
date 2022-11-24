import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../store';
import Layout from '@comps/layout';
import Head from 'next/head';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>events - nadamas</title>
        <meta
          name="description"
          content="All sports events and more. Organize your own event, easy, cheap and fast"
        />

        {/* ---- icons ----- */}

        <link rel="icon" href="/icons/icon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/icon.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/icon.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/icons/icon.png"></link>

        {/* ---- meta tags ----- */}

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />

        {/* ---- pwa default theme ----- */}

        <meta name="theme-color" content="#fff" />

        {/* ---- scripts ----- */}
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
