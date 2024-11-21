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