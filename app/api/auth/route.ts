import {PrismaClient} from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
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
    }
}