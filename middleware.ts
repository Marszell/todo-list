// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
//
// export default NextAuth(authConfig).auth;
//
// export const config = {
//     // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//     matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };

import { NextResponse } from "next/server";

export default async function middleware(req) {
    const url = req.nextUrl.clone();
    const session = await fetch("/api/auth/session").then((res) => res.json());

    if (!session) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/protected/:path*", "/dashboard/:path*"], // Adjust as needed
};
