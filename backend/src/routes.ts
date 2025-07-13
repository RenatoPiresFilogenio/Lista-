import { Router } from 'express';
import {isAuthenticated} from "./Middleware/isAuthenticated"
//import user
import { userCreateController } from './Controllers/user/userCreateController';
import { userAuthController } from './Controllers/user/userAuthController';
import { userAutenticatedController } from './Controllers/user/userAutenticateController';
import  {ConfirmEmail } from './confirmEmail/ConfirmEmail';
// import Task
import { createTaskController } from './Controllers/task/createTaskController';
import { listTaskController } from './Controllers/task/listTaskController';
import { doneTaskController } from './Controllers/task/doneTaskController';
import { deleteTaskController } from './Controllers/task/deleteTaskController';
const router = Router();

router.post("/user",new userCreateController().handle)
router.get("/verify-email", ConfirmEmail)
router.post("/userLog",new userAuthController().handle)
router.get("/user", isAuthenticated, new userAutenticatedController().handle)
//router Task
router.post("/Task", isAuthenticated, new createTaskController().handle)
router.get("/taskList", isAuthenticated, new listTaskController().handle)
router.patch("/Task", isAuthenticated, new doneTaskController().handle)
router.delete("/Task", isAuthenticated, new deleteTaskController().handle)

export { router }; 