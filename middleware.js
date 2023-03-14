import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { getLogger } from "@/logging/log-util";

export async function middleware(req) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;
  const token = await getToken({
    req,
  });
  const logger = getLogger("home");
  if (pathname === "/workPage") {
    if (!token) {
      const url = new URL(`/`, req.url);
      url.searchParams.set("error", encodeURIComponent("notLogined"));
      return NextResponse.redirect(url);
    }
    logger.info(`Current User is ${token.id}`);
  }

  if (pathname === "/") {
    if (token) {
      const url = new URL(`/workPage`, req.url);
      url.searchParams.set("error", encodeURIComponent("alreadyLogined"));
      return NextResponse.redirect(url);
    }
  }

  return res;
}
