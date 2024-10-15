import prisma from "./prisma";

export async function fetchTask(): Promise<any[]> {
    return prisma.todo.findMany({
        where:{
            deleted_at: null
        }
    })
}

export async function create(data:any): Promise<any> {
    await prisma.todo.create({
        data:data
    });
}

