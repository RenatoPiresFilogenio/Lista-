import bcrypt from 'bcryptjs';
import prismaClient from '../../prisma';
import nodemailer from "nodemailer";


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
    
    const emailRegex = /^[^\s@]+@(gmail\.com|hotmail\.com(\.br)?)$/;
    if (!emailRegex.test(email)) {
      throw new Error("Aceitamos apenas emails @gmail.com ou @hotmail.com.");
    }

    const findMail = await prismaClient.user.findFirst({
      where:{
        email:email
      }
    })

    if(findMail){
     throw new Error("Este email já está cadastrado.");
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

        const emailconfig = nodemailer.createTransport({
          service: "gmail",
          auth:{
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
          }

        })

        const mailOptions = {
          from: process.env.EMAIL,
          to: createUser.email,
          subject: "Confirme seu email clicando no link",
          text:'http://localhost:3333/'
        }

        return createUser
    }
}

export {userCreateService}