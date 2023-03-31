import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>당직근무표 자동화앱</title>
        <meta
          name='description'
          content='당직근무표를 간단하게 작성해주는 사이트!'
        />
        <meta
          name='keywords'
          content='당직근무표, 근무표 자동화, 당직근무표 자동화'
        />
        <link
          rel='icon'
          href='/image/favicon.ico'
          type='image/x-icon'
          sizes='16x16'
        ></link>
        <meta
          name='google-site-verification'
          content='_xBXEsyZiVne4Qy-DQmvMRagBaC2NBwbtyWlnvL0vOQ'
        />
      </Head>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICSID}}`}
      />

      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${process.env.GOOGLE_ANALYTICSID}, {
          page_path: window.location.pathname,
          });
        `,
        }}
      ></Script>
      <SessionProvider session={pageProps.session} refetchWhenOffline={false}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
};

export default App;
