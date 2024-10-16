import {NextResponse} from "next/server";
import {fetchTask} from "../../../lib/TaskRepository";
import {TodoFormSchema} from "../../../lib/Validations";

export async function GET (request: Request, {params}): Promise<NextResponse> {
    try{
        const id = parseInt(params.id)
        const task = await fetchTask(id)
        return NextResponse.json({message:"", data: task, error:{} }, { status: 200 });
    }catch(error){
        return NextResponse.json({message:error.message, data: {}, error: error }, { status: 500 });
    }
}

const UpdateTask = TodoFormSchema.omit({title: true})
export async function PUT (request: Request, {params}): Promise<NextResponse> {
    try{
        const formData = await request.formData()

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

        // const id = parseInt(params.id)
        const form: Record<string, any> = {};
        for(const [key, value] of formData.entries()) {
            if (key !== "file") {
                form[key] = value;
            }
        }
        return NextResponse.json({message:"Success", data: {}, error:{} }, { status: 200 });
    }catch (error){
        return NextResponse.json({message:error.message, data:{}, error: error }, { status: 500 });
    }
}