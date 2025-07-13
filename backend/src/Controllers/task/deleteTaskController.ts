import { Request,Response } from "express";
import { deleteTaskService } from "../../Services/task/deleteTaskService";

class deleteTaskController{
    async handle(req:Request,res:Response){
        const {taskId} = req.body;
        const userId = req.userId!

        const deletetaskservice = new deleteTaskService();
        const Task = await deletetaskservice.execute({taskId,userId})

        return res.json(Task)
    }
}

export {deleteTaskController}