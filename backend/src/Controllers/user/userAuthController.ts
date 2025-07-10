import { Request,Response } from "express";
import { userAuthService } from "../../Services/user/userAuthService";

class userAuthController{
    async handle(req:Request,res:Response){
        const {email,password} = req.body; 

        if(!email || !password){
           return res.status(400).json({error: "email e senha são necessários"})
        }
        try {
            const userauthservice = new userAuthService();
            const logUser = await userauthservice.execute({email,password})
            return res.json(logUser)
        } catch (error) {
            return res.status(400).json({ error:"Erro ao autenticar usuário" });
        }
        

 
    }
}

export {userAuthController}