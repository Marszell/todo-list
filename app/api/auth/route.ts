import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();
        const user = await prisma.user.findUnique({ where: { email } });

        if (user && bcrypt.compareSync(password, user.password)) {
            return NextResponse.json({ status: "success", message: "login success", name: user.name });
        }
        return NextResponse.json({ status: "fail", message: "Invalid Credentials" }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ status: "error", message: "server error" }, { status: 500 });
    }
}