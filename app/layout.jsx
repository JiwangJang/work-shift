import { NextAuthProvider } from "@/components/SessionProvider";
import Script from "next/script";
import "@/styles/globals.css";

const RootLayout = ({ children }) => {
  return (
    <html>
      <head></head>
      <body>
        {/* <NextAuthProvider> */}
        {children}
        {/* </NextAuthProvider> */}
      </body>
    </html>
  );
};

export default RootLayout;
