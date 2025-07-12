import { Request,Response } from "express";
import {userAutenticatedService} from "../../Services/user/userAutenticateService";

class userAutenticatedController {
    async handle(req:Request,res:Response){
        const userId = req.userId!

        const userautenticatedservice = new userAutenticatedService();

        const Auth = await userautenticatedservice.execute({
            userId
        })
        
        return res.json(Auth)
    }
}

export {userAutenticatedController}