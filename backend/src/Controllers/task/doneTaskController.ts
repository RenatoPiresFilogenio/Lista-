import { Request,Response } from "express";
import { doneTaskService } from "../../Services/task/doneTaskService";

class doneTaskController{
    async handle(req:Request,res:Response){
        const {taskId} = req.body;
        const userId = req.userId!

        const donetaskservice = new doneTaskService();
        const Task = await donetaskservice.execute({taskId,userId})

        return res.json(Task)
    }
}

export {doneTaskController}