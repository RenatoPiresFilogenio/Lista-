import { Request,Response } from "express";
import { createTaskService } from "../../Services/task/createTaskService";

class createTaskController{
    async handle(req:Request,res:Response){
        const {name} = req.body;
        const userId = req.userId!

        const taskservice = new createTaskService();

        const task = await taskservice.execute({name,userId})

        return res.json(task)
    }
}

export {createTaskController}