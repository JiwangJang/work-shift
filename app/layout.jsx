import { NextAuthProvider } from "@/components/SessionProvider";
import "@/styles/globals.css";

export const metadata = {
  metadataBase: new URL("https://work-shift.vercel.app"),
  title: "당직근무표 자동작성기",
  description: "당직근무표를 아직도 엑셀로 작성하세요? 그렇다면 이걸 써보세요!",
  openGraph: {
    title: "당직근무표 자동작성기",
    description:
      "당직근무표를 아직도 엑셀로 작성하세요? 그렇다면 이걸 써보세요!",
    image: "/image/openGraphImage.png",
    url: "/",
    type: "website",
  },
};

const RootLayout = ({ children }) => {
  return (
    <html>
      <head></head>
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
