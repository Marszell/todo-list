import { NextResponse } from "next/server";
import {create, fetchTask} from "../../lib/TaskRepository";
import { TodoFormSchema } from "../../lib/Validations";
import prisma from "../../lib/prisma";

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
        const task = await fetchTask(taskParam ?? "");
        return NextResponse.json({message:"", data: task, error:{} }, { status: 200 });
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

        let user = await prisma.user.findUnique({
            where: { id: "1" },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    id: "1",
                    name: "jhon", // Add other required fields
                    email:"jhon@gmail.com",
                    password: "jhon123",
                },
            });
        }

        // Membuat task baru di database
        // await create(form);

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
