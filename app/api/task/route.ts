import { NextResponse } from "next/server";
import { create, fetchTaskbyUser } from "../../lib/TaskRepository";
import { TodoFormSchema } from "../../lib/Validations";
import { auth } from "../../../auth";
import { fetchUserbyEmail } from "../../lib/UserRepository";
import {Session} from "next-auth";

BigInt.prototype.toJSON = function() { return this.toString(); }

function handleError(error: unknown) {
    if (error instanceof Error) {
        return error.message;
    }
    return "An unknown error occurred";
}

export async function GET(request: Request): Promise<any> {
    try{
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.search);
        const taskParam = searchParams.get("complete");

        const session: Session | null = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized", data: {}, error: {} }, { status: 401 });
        }
        const email = session.user.email;
        if (!email){
            return NextResponse.json({ message: "Invalid email", data: {}, error: {} }, { status: 400 });
        }
        const user = await fetchUserbyEmail(email);
        const userTask = await fetchTaskbyUser(user.id);
        return NextResponse.json({message:"", data: userTask, error:{} }, { status: 200 });
    }catch (error){
        return NextResponse.json({ message:handleError(error), data: {}, error: error }, { status: 500 });
    }
}

const CreateTodo = TodoFormSchema.omit({ id: true });
export async function POST(request: Request): Promise<NextResponse> {
    try {
        const formData = await request.formData();

        const validated = CreateTodo.safeParse({
            title: formData.get("title"),
        });

        if (!validated.success) {
            return NextResponse.json(
                {
                    message: "Failed to create Todo",
                    data: {},
                    error: validated.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const form: Record<string, any> = {};
        for (const [key, value] of formData.entries()) {
            if (key !== "file") {
                form[key] = value;
            }
        }


        //new
        const session: Session|null = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized", data: {}, error: {} }, { status: 401 });
        }
        const email = session.user.email;
        if (!email){
            return NextResponse.json({ message: "Invalid email", data: {}, error: {} }, { status: 400 });
        }
        const user = await fetchUserbyEmail(email);
        await create({
            ...form,
            users: {
                connect: { id: user.id.toString() },
            },
        });

        return NextResponse.json({ message: "Success", data: {}, error: {} }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || "Internal Server Error", data: {}, error: error },
            { status: 500 }
        );
    }
}