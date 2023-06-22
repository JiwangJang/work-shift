import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";
import Google from "next-auth/providers/naver";
import db from "@/libs/dbConfig";

const handler = NextAuth({
  providers: [
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
    Naver({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      id: "credentials",
      name: "credentials",
      type: "credentials",
      credentials: {
        ID: { label: "Username", type: "text", placeholder: "Id" },
        Password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { ID, Password } = credentials;
        console.log("credentials", credentials);
      },
    }),
  ],
});

export { handler as GET, handler as POST };
