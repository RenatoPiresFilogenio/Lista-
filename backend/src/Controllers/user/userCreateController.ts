import { Request,Response } from "express";
import {userCreateService} from "../../Services/user/userCreateService"

class userCreateController{
    async handle(req:Request, res:Response){
        const {name , email , password } = req.body

            if (!name || !email || !password) {
            return res.status(400).json({ error: "Todos os dados são necessários para criar a conta" });
            }

            try {
                const usercreateservice = new userCreateService();
                const user = await usercreateservice.execute({name,email,password})
                return res.json(user)
            } catch (error) {
                 return res.status(400).json({ error:"Erro ao criar usuário C" });
            }
        
       
    }
}

export {userCreateController}