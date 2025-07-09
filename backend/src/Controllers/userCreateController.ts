import { Request,Response } from "express";
import {userCreateService} from "../Services/userCreateService"

class userCreateController{
    async handle(req:Request, res:Response){
        const {name , email , password } = req.body
       
        const usercreateservice = new userCreateService();
        const user = await usercreateservice.execute({name,email,password})

        return res.json(user)
    }
}

export {userCreateController}