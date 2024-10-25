import prisma from "./prisma";

export async function fetchTask(): Promise<any[]> {
    return prisma.todo.findMany({
        where:{
            deleted_at: null
        }
    })
}

export async function fetchSingleTask(id: string): Promise<any[]> {
    return prisma.todo.findFirst({
        where:{
            id:id,
            deleted_at: null
        }
    });
}

export async function create(data:any): Promise<any> {
    await prisma.todo.create({
        data:data
    });
}

export async function update(id: number, data:any): Promise<any> {
    return prisma.todo.update({
        where:{
            id: id
        },
        data:data
    });
}

export async function updated(id: number): Promise<any> {
    return prisma.todo.update({
        where:{
            id: id
        },
    });
}

export async function fetchTaskByBool(complete: boolean): Promise<any> {
    return prisma.todo.findMany({
        where:{
            complete:true,
            deleted_at: null
        }
    })
}