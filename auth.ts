import { fetchUserbyEmail } from "./app/lib/UserRepository";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import { authConfig } from "./auth.config";

async function getUser(email: string) {
    try {
        return await fetchUserbyEmail(email);
    } catch (error) {
        console.error("Failed to fetch user", error);
        return null;
    }
}

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string() })
                    .safeParse(credentials);

                if (!parsedCredentials.success) {
                    console.error("Invalid credentials format");
                    return null;
                }

                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(password, user.password);
                if (!passwordsMatch) {
                    console.error("Password mismatch");
                    return null;
                }

                return user;
            },
        }),
    ],
});
