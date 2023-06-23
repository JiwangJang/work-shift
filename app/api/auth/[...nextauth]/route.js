import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";
import Google from "next-auth/providers/naver";
import db from "@/libs/dbConfig";
import bcrypt from "bcrypt";

const providers = [
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
      const [UserInfo] = await db.execute("SELECT * FROM userinfo;");
      const isUser = UserInfo.map((obj) => obj.id).indexOf(ID);
      if (isUser === -1) throw new Error("notMember");
      if (!bcrypt.compareSync(Password, UserInfo[isUser].password)) {
        throw new Error("checkPassword");
      }
      return { userid: ID };
    },
  }),
];

const callbacks = {
  async signIn({ user, account, profile, email, credentials }) {
    console.log("callbacks user", user);
    console.log("callbacks account", account);
    console.log("callbacks profile", profile);
    console.log("callbacks email", email);
    console.log("callbacks credentials", credentials);
    if (user) {
      return true;
    } else {
      return "/?error=notMember";
    }
  },
  async jwt({ token, user }) {
    console.log("jwt user", user);
    console.log("jwt token", token);
    if (user) {
      token.userid = user.userid;
    }
    return token;
  },
  async session({ session, token, user }) {
    console.log("session session, token, user", session, token, user);
    session.userid = token.userid;
    return session;
  },
};

const handler = NextAuth({
  providers,
  session: {
    maxAge: 120 * 60,
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
  callbacks,
});

export { handler as GET, handler as POST };
