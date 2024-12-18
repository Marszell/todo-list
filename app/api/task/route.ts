import { NextResponse } from "next/server";
import {create, fetchTask, fetchTaskbyUser, UpdateBool} from "../../lib/TaskRepository";
import { TodoFormSchema } from "../../lib/Validations";
import prisma from "../../lib/prisma";
import {auth} from "../../../auth";
import {fetchUserbyEmail, fetchUserbyId} from "../../lib/UserRepository";

// Mengubah BigInt ke string agar dapat dikonversi menjadi JSON
BigInt.prototype.toJSON = function() { return this.toString(); }

// export async function GET (request: Request): Promise<any> {
//     try{
//         const id = parseInt(params.id)
//         const task = await fetchTask(id)
//         return NextResponse.json({message:"", data: task, error:{} }, { status: 200 });
//     }catch(error){
//         return NextResponse.json({message:error.message, data: {}, error: error }, { status: 500 });
//     }
// }

export async function GET(request: Request): Promise<any> {
    try{
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.search);
        const taskParam = searchParams.get("complete");

        //for check user id
        const session = await auth();
        const user = await fetchUserbyEmail(session.user.email);
        const userTask = await fetchTaskbyUser(user.id);
        // const task = await fetchTask(taskParam ?? "");
        return NextResponse.json({message:"", data: userTask, error:{} }, { status: 200 });
    }catch (error){
        return NextResponse.json({ message:error.message, data: {}, error: error }, { status: 500 });
    }
}

const CreateTodo = TodoFormSchema.omit({ id: true });
export async function POST(request: Request): Promise<NextResponse> {
    try {
        const formData = await request.formData();

        // Memvalidasi data yang diterima menggunakan schema dari Zod
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

        // Membuat objek form dari formData tanpa memasukkan file jika ada
        const form: Record<string, any> = {};
        for (const [key, value] of formData.entries()) {
            if (key !== "file") { // Skip jika key adalah file
                form[key] = value;
            }
        }

        // form.userId = "1";

        //new
        const session = await auth();
        const user = await fetchUserbyEmail(session.user.email);

        await create({
            ...form,
            users: {
                connect: { id: user.id.toString() }, // Connect the user
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

// export async function PUT(request: Request,{params}): Promise<any> {
//     try{
//         const formData = await request.formData();
//         const complete = formData.get("complete") === true
//         if (complete !== undefined){
//             const id = parseInt(params.id);
//             const bool = await UpdateBool(id,complete)
//             return NextResponse.json({message:"Success", data: {}, error:{} }, { status: 200 });
//         }
//     }catch(error){
//         return NextResponse.json({ message: error.message, data: {}, error: error }, { status: 500 });
//     }
// }