import prisma from "./prisma";

export async function fetchTask(): Promise<any[]> {
    return prisma.todo.findMany({
        where:{
            deleted_at: null
        }
    })
}
