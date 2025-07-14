import bcrypt from 'bcryptjs';
import prismaClient from '../../prisma';
import nodemailer from "nodemailer";
import { sign } from "jsonwebtoken";

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
    
    const emailRegex = /^[^\s@]+@(gmail\.com(\.br)?)$/;
    if (!emailRegex.test(email)) {
      throw new Error("Aceitamos apenas emails @gmail.com e @gmail.com.br");
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
            email,name,password: hashPassword, emailVerifiedAt: null
          },select:{
            id:true,
            name:true,
            email:true,
          }
        })

        const emailconfig = nodemailer.createTransport({
          service: "gmail",
          auth:{
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
          }

        })


        const token = sign(
        { userId: createUser.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '10m' }
          );


        const mailOptions = {
        from: process.env.EMAIL,
        to: createUser.email,
        subject: "Confirme seu email clicando no botão",
        html: `
                <p>Olá ${createUser.name},</p>
                <p>Por favor para se registrar em Lista+, confirme seu email clicando no botão abaixo:</p>
           <a href="https://lista-de-tarefas-loie.vercel.app/verify-email?token=${token}"
                  style="
                    display: inline-block;
                    padding: 10px 20px;
                    font-size: 16px;
                    color: white;
                    background-color: #007bff;
                    text-decoration: none;
                    border-radius: 5px;
                  ">
                  Confirmar Email
                </a>
                <p>Se você não solicitou este email, pode ignorar.</p>
              `
            };

        await emailconfig.sendMail(mailOptions);

        return createUser
    }
}

export {userCreateService}