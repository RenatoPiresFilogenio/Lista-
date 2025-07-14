import prismaClient from "../../prisma";

interface userProp{
    userId: string;
}

class listTaskService{
    async execute({userId}:userProp){
        if(!userId){
            throw new Error("Usuário não encontrado")
        }

        const listTask = await prismaClient.task.findMany({
            where:{
                userId
            }
        })

        if(!listTask){
            throw new Error("erro ao listar a Task")
        }

        return listTask
    }
}

export {listTaskService}