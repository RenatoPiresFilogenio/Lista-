import prismaClient from "../../prisma";

interface TaskProp{
    taskId:string;
    userId:string;
}

class doneTaskService{
    async execute({taskId,userId}:TaskProp){
        if(!taskId || !userId){
            throw new Error("Todos os dados são necessários para criar a task")
        }

        const Task = await prismaClient.task.findFirst({
            where:{
                id: taskId,
                userId:userId
            }
        })

        if(!Task){
            throw new Error("Task nao encontrada")
        }

        const doneTask = await prismaClient.task.update({
           where: { id: Task.id },
            data: { done: true,
                updatedAt: new Date()
             }
        })

        if(!doneTask){
            throw new Error("Erro ao atualizar Task")
        }
        
        return doneTask
    }
}

export {doneTaskService}