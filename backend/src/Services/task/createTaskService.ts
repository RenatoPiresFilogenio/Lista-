import prismaClient from "../../prisma";

interface TaskProp{
    name:string;
    userId:string;
}

class createTaskService{
    async execute({name,userId}:TaskProp){
        if(!name || !userId){
            throw new Error("Todos os dados são necessários para criar a task")
        }

        const task = await prismaClient.task.create({
            data:{
                name,
                userId,
            }
        })

        if(!task){
            throw new Error("erro ao criar Task")
        }

        return task
    }
}

export {createTaskService}