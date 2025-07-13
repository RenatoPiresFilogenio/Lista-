import prismaClient from "../../prisma";

interface TaskProp{
    taskId:string;
    userId:string;
}

class deleteTaskService{
    async execute({taskId,userId}:TaskProp){
        if(!taskId || !userId){
            throw new Error("Todos os dados são necessários para deletar a task")
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

        const deleteTask = await prismaClient.task.delete({
           where: { id: Task.id }
        })

        if(!deleteTask){
            throw new Error("Erro ao deletar Task")
        }
        
        return deleteTask
    }
}

export {deleteTaskService}