import prismaClient from "../prisma";
import { compare } from "bcryptjs";

interface UserProp{
    email:string,
    password:string
}

class userAuthService {
    async execute({email,password}:UserProp){

        if(!email || !password ){
            throw new Error("Email ou senha inválidos")
        }

      
        

    }
}

export {userAuthService}
