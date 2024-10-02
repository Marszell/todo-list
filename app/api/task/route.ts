import {NextResponse} from "next/server";
import {validate} from "json-schema";

const CreateTodo =
export async function POST (request: Request) {
    try{
        const formData = await request.formData()

        const validated =

        if(!title){
            return NextResponse.json({error: "Missing title"},{status:400});
        }
    } catch (error) {
        console.error(error);
    }
}