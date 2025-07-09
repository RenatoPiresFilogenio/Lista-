import { Router } from 'express';
import {isAuthenticated} from "./Middleware/isAuthenticated"
//import user
import { userCreateController } from './Controllers/userCreateController';
const router = Router();

router.post("/user",new userCreateController().handle)

export { router }; 