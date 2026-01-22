import { signIn } from '../../../../auth';
import { NextResponse } from "next/server";
import { AuthError } from "next-auth";

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const formData = await request.formData();
        await signIn('credentials', formData);
        return NextResponse.json({ message: "Success", data: {}, error: {} }, { status: 200 });
    } catch (error) {
        if (error instanceof AuthError) {
            return NextResponse.json({ message: "Invalid Credentials", data: {}, error: error }, { status: 400 });
        }
        if (error.message === "NEXT_REDIRECT") {
            return NextResponse.json({ message: "Success", data: {}, error: {} }, { status: 200 });
        }
        return NextResponse.json({ message: "", data: {}, error: error }, { status: 500 });
    }
}