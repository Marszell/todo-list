import {PrismaClient} from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";
import bcrypt from 'bcryptjs';
import {FormState, SignUpSchema} from "../../lib/Validations";
import {NextResponse} from "next/server";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const {email , password} = req.body;
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            })
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({
                    status:"success",
                    message:'login success',
                    name: user.name,
                });
            }else{
                res.status(401).json({ status:"fail", message: "Invalid Credentials" });
            }
        }catch(error){
            res.status(500).json({status:"error", message:"server error"});
        }
    }else{
        res.status(405).json({status:"fail", message:"method not allowed"});
    };
};

export async function signup(state: FormState, formData: FormData) {
    try {
        const validatedFields = SignUpSchema.safeParse({
            name : formData.get('name'),
            email : formData.get('email'),
            password: formData.get('password'),
        })
        if (!validatedFields.success){
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            }
        }
        const {name, email, password} = validatedFields.data;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.
    } catch (error) {
        return NextResponse.json({status:"error", message:"server error", error: error, data:{} }, { status: 400 });
    }
}