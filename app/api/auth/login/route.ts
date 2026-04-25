import { signIn } from '../../../../auth';
import { NextResponse } from "next/server";
import { AuthError } from "next-auth";

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const formData = await request.formData();
        await signIn('credentials', formData);
        return NextResponse.json({ message: "Success", data: {}, error: {} }, { status: 200 });
    } catch (error) {
        // 1. Handle AuthError (NextAuth specific)
        if (error instanceof AuthError) {
            return NextResponse.json({ message: "Invalid Credentials", data: {}, error: error.message }, { status: 400 });
        }

        // 2. Safely check for NEXT_REDIRECT
        // We cast to any or check the object structure to be safe
        if (error instanceof Error && error.message === "NEXT_REDIRECT") {
            return NextResponse.json({ message: "Success", data: {}, error: {} }, { status: 200 });
        }

        // 3. Handle generic errors safely
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ message, data: {}, error: message }, { status: 500 });
    }
}