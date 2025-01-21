import {SignUpSchema} from "../../../lib/Validations";
import {create, fetchUserbyEmail} from "../../../lib/UserRepository";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";

declare global {
    interface BigInt {
        toJSON: () => string;
    }
}

BigInt.prototype.toJSON = function() { return this.toString(); };

export async function POST(request: Request):Promise<NextResponse> {
    try {
        const formData = await request.formData();

        const validatedFields = SignUpSchema.safeParse({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        });

        if (!validatedFields.success) {
            return NextResponse.json(
                { message: "Validation Error", errors: validatedFields.error.flatten().fieldErrors },
                { status: 400 });
        }

        const { name, email, password } = validatedFields.data;
        const existingUser = await fetchUserbyEmail(email);
        if (existingUser) {
            return NextResponse.json({message: "Email Already Exist", data:{}, error: {} },{ status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await create({
            name,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({message:"Success", data:{}, error: {} }, { status: 201 });
    } catch(error:any) {
        return NextResponse.json({message: "Internal Server", data: {}, error: error}, { status: 500 });
    }
}