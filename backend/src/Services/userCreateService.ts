import bcrypt from 'bcryptjs'
import prismaClient from '../prisma';

interface UserProp{
    email: string;
    name: string;
    password: string;
}

class userCreateService{

    async execute({email,name,password}:UserProp){
       if (!email || !name || !password) {
      throw new Error("Todos os campos (email, nome e senha) são obrigatórios.");
    }

    if(password.length < 8){
        throw new Error("senha precisa ter 8 carecteres no minimo.");
    }
        
    if(!email.includes("@gmail")){
        throw new Error("email invalido.");
    }

    const salt = bcrypt.genSaltSync(12)
    const hashPassword = await bcrypt.hash(password, salt)

      
        const createUser = await prismaClient.user.create({
          data:{
            email,name,password: hashPassword
          },select:{
            id:true,
            name:true,
            email:true
          }
        })

        return createUser
    }
}

export {userCreateService}