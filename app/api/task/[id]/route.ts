import {NextResponse} from "next/server";
import {fetchSingleTask, update, deleteTask, UpdateBool} from "../../../lib/TaskRepository";
import {TodoFormSchema} from "../../../lib/Validations";
import {auth} from "../../../../auth";
import {fetchUserbyEmail} from "../../../lib/UserRepository";
import {Session} from "next-auth";

function handleError(error: unknown) {
    if (error instanceof Error) {
        return error.message;
    }
    return "An unknown error occurred";
}

export async function DELETE (request: Request, { params }: { params:{ id:string } }): Promise<NextResponse> {
    try{
        const id = parseInt(params.id)
        await deleteTask(id)
        return NextResponse.json({ message: "Success", data: {}, error: {} }, { status: 200 });
    } catch (error){
        return NextResponse.json({ message: handleError(error), data: {}, error: error }, { status: 500 });
    }
}

export async function GET (request: Request, { params }: { params:{ id: string } }): Promise<NextResponse> {
    try{
        const id = parseInt(params.id)
        const task = await fetchSingleTask(id)
        return NextResponse.json({message:"Success", data: task, error:{} }, { status: 200 });
    }catch(error){
        return NextResponse.json({message:handleError(error), data: {}, error: error }, { status: 500 });
    }
}

const UpdateTask = TodoFormSchema.omit({title: true})
export async function PUT (request: Request, { params }: { params:{ id: string } }): Promise<NextResponse> {
    try{
        const formData = await request.formData();
        const action = formData.get("action");

        try {
            if(action === 'complete'){
                const complete = formData.get("completed") === 'true';
                const id = parseInt(params.id)
                await UpdateBool(id,complete);
                return NextResponse.json({message:"Success", data: {}, error:{} }, { status: 200 });
            }
        } catch (error) {
            return NextResponse.json({ message: handleError(error), data: {}, error: error }, { status: 500 });
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
        for(const [key, value] of formData.entries() as Iterable<[string,FormDataEntryValue]>) {
            if (key !== "file") {
                form[key] = value;
            }
        }

        //new
        const session: Session|null  = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized", data: {}, error: {} }, { status: 401 });
        }
        const userEmail = session.user.email;
        if (!userEmail) {
            return NextResponse.json({ message: "Invalid email", data: {}, error: {} }, { status: 400 });
        }
        const user = await fetchUserbyEmail(userEmail);
        await update(id,{
            ...form,
            users:{
                connect: { id: user.id.toString() },
            },
        });

        return NextResponse.json({message:"Success", data: {}, error:{} }, { status: 200 });
    }catch (error){
        return NextResponse.json({message:handleError(error), data:{}, error: error }, { status: 500 });
    }
}