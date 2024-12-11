import prisma from './prisma';

export async function fetchUserbyEmail(email: string): Promise<any> {
    return prisma.user.findUnique({
        where: { email: email },
        select:{
            id:true,
            name:true,
            email:true,
            password:true,
        },
    });
}

export async function create (data: any): Promise<any> {
    await prisma.user.create({
        data:data
    });
}