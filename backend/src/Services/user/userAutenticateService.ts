
import prismaClient from "../../prisma";

interface UserProp{
    userId: string;
}

class userAutenticatedService{
    async execute({userId}:UserProp){

        if(!userId){
            throw new Error("Usuário não encontrado")
        }

        const user = await prismaClient.user.findUnique({
            where:{
                id: userId
            },
            select:{
                id:true,
                name:true
            }
        })

        return user
    }
}

export {userAutenticatedService}