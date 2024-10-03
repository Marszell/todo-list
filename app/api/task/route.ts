import {NextResponse} from "next/server";
import {TodoFormSchema} from "../../lib/Validations";

const CreateTodo = TodoFormSchema.omit({id:true})
export async function POST (request: Request) {
    try{
        const formData = await request.formData()
        const validated = CreateTodo.safeParse({
            title: formData.get("title")
        })

        if(!validated.success) {
            return NextResponse.json({message:"Failled Created Todo", data:{}, error: validated.error.flatten().fieldErrors},{status:400});
        }
    } catch (error) {
        console.error(error);
    }
}