import {signIn} from '@/auth'
export async function POST(request: Request): Promise<void> {
    try {
        const formData = await request.formData();
        await signIn('credentials', formData);

    }
}