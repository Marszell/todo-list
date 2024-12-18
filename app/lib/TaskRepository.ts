import prisma from "./prisma";

export async function fetchTask(): Promise<any[]> {
    return prisma.todo.findMany({
        where:{
            deleted_at: null
        }
    })
}

export async function fetchTaskbyUser(id: number): Promise<any[]> {
    return prisma.todo.findMany({
        where:{
            user_id: id,
            deleted_at: null
        }
    })
}

export async function fetchSingleTask(id: number): Promise<any[]> {
    return prisma.todo.findUnique({
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

export async function deleteTask(id: number): Promise<any> {
    await prisma.todo.delete({
        where:{
            id: id
        }
    })
}

export async function UpdateBool(id: number, complete:boolean): Promise<any> {
    return prisma.todo.update({
        where: {
            id: id
        },
        data:{
            complete:complete
        }
    });
}

// export async function UpdateBool(id: number, complete: boolean): Promise<any> {
//     const todo = await prisma.todo.findUnique({
//         where: { id: id }
//     });
//     // if (!todo) {
//     //     throw new Error("Todo not found");
//     // }
//     await prisma.todo.update({
//         where: { id: id },
//         data: { complete: complete }
//     });
// }
