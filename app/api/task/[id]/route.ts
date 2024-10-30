import {NextResponse} from "next/server";
import {fetchSingleTask, fetchTask, update, deleteTask, UpdateBool} from "../../../lib/TaskRepository";
import {TodoFormSchema} from "../../../lib/Validations";
import prisma from "../../../lib/prisma";

export async function DELETE (request: Request, {params}): Promise<NextResponse> {
    try{
        const id = parseInt(params.id)
        await deleteTask(id)
        return NextResponse.json({ message: "Success", data: {}, error: {} }, { status: 200 });
    } catch (error){
        return NextResponse.json({ message: error.message, data: {}, error: error }, { status: 500 });
    }
}

export async function GET (request: Request, {params}): Promise<NextResponse> {
    try{
        const id = parseInt(params.id)
        const task = await fetchSingleTask(id)
        return NextResponse.json({message:"Success", data: task, error:{} }, { status: 200 });
    }catch(error){
        return NextResponse.json({message:error.message, data: {}, error: error }, { status: 500 });
    }
}

const UpdateTask = TodoFormSchema.omit({title: true})
export async function PUT (request: Request, {params}): Promise<NextResponse> {
    try{
        const formData = await request.formData();

        const action = formData.get("action");
        if(action === 'complete'){
            const complete = formData.get("complete") === 'true';
            if (complete !== undefined){
                const id = parseInt(params.id)
                await UpdateBool(id,complete);
                return NextResponse.json({message:"Success", data: {}, error:{} }, { status: 200 });
            }
        }


        const validatedFormData = UpdateTask.safeParse({
            id: parseInt(params['id']),
            title: formData.get("title"),
        })

        if(!validatedFormData.success){
            return NextResponse.json({
                message:"Failed to update Todo",
                data:{},
                error: validatedFormData.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const id = parseInt(params.id)
        const form: Record<string, any> = {};
        for(const [key, value] of formData.entries()) {
            if (key !== "file") {
                form[key] = value;
            }
        }

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

        await update(id,{
            ...form,
            users:{
                connect: { id: user.id.toString() },
            },
        });

        return NextResponse.json({message:"Success", data: {}, error:{} }, { status: 200 });
    }catch (error){
        return NextResponse.json({message:error.message, data:{}, error: error }, { status: 500 });
    }
}