import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
interface UserProp{
    email:string,
    password:string
}

class userAuthService {
    async execute({email,password}:UserProp){

        if(!email || !password ){
            throw new Error("Email ou senha inválidos")
        }

        const user = await prismaClient.user.findFirst({
            where:{
                email
            }
        })

        if(!user){
            throw new Error("Email não encontrado")
        }
        
        const isPasswordCorrect = await compare(password,user.password);

        if(!isPasswordCorrect){
            // não é seguro apontar o que está errado com o login
            throw new Error("Email ou senha inválido")
        }
      
        const token = sign({
            name:user.name,
            email:user.email
        }, process.env.JWT_SECRET as string,
        {
            subject: user.id,
            expiresIn: '1d'
        })
        
        if(!token){
            throw new Error("Usuário não autorizado")
        }
        
        return{
            id: user.id,
            name:user.name,
            email:user.email,
            token:token
        }

    }
}

export {userAuthService}
