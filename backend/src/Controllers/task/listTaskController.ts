import { Request,Response } from "express";
import { listTaskService } from "../../Services/task/listTaskService";

class listTaskController{
    async handle(req:Request,res:Response){
        const userId = req.userId!

            const listtaskservice = new listTaskService();

            const task = await listtaskservice.execute({userId})

                
            return res.json(task)
    }   
}

export {listTaskController}