import {fetchUserbyEmail} from "./app/lib/UserRepository";
import NextAuth from 'next-auth';
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import {z} from 'zod';
import {authConfig} from "./auth.config";

async function getUser(email: string): Promise<any> {
    try{
        return await fetchUserbyEmail(email);
    }catch(error){
        console.log('Failed to fetch user', error);
        throw new Error('Failed to fetch user');
    }
}

export const { auth, signIn, signOut} = NextAuth ({
    ...authConfig,
    provider: [Credentials({
        async authorize(credentials){
            const parsedCredentials = z
                .object({email: z.string().email(), password: z.string() })
                .safeParse(credentials)

            if (parsedCredentials.success) {
                const {email, password} = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(password, user.password);

                if (passwordsMatch) return user;
            }
            console.log('Invalid Credentials');
            return null;
        }
    })]
});