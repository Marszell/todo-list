import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login'
    },
    callbacks: {
        authorized ({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const publicPaths = ['/login', '/signup'];
            const isPublic = publicPaths.some(p => nextUrl.pathname.startsWith(p));

            if (isPublic) return true;
            if (isLoggedIn) return true;

            return Response.redirect(new URL('/login', nextUrl));
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
