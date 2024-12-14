import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import { SignUpSchema } from "../../../lib/Validations";
import { create } from "../../../lib/UserRepository";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            // Validate request body
            const { name, email, password } = req.body;
            const validatedFields = SignUpSchema.safeParse({ name, email, password });
            if (!validatedFields.success) {
                return res.status(400).json({
                    status: "fail",
                    errors: validatedFields.error.flatten().fieldErrors,
                });
            }

            // Check if the email already exists
            const existingUser = await prisma.user.findUnique({
                where: { email },
            });
            if (existingUser) {
                return res.status(409).json({
                    status: "fail",
                    message: "Email already in use",
                });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the new user
            const newUser = await create({
                name,
                email,
                password: hashedPassword,
            });

            return res.status(201).json({
                status: "success",
                message: "User created successfully",
                data: { id: newUser.id, name: newUser.name, email: newUser.email },
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Internal server error",
                error: error.message,
            });
        }
    } else {
        return res.status(405).json({
            status: "fail",
            message: "Method not allowed",
        });
    }
}
