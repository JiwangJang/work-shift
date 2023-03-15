import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>당직근무표 자동화앱</title>
      </Head>
      <SessionProvider session={pageProps.session} refetchWhenOffline={false}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
};

export default App;
