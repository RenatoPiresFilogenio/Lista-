import { Router } from 'express';
import {isAuthenticated} from "../Middleware/isAuthenticated"
//import user
import { userCreateController } from '../Controllers/user/userCreateController';
import { userAuthController } from '../Controllers/user/userAuthController';
import { userAutenticatedController } from '../Controllers/user/userAutenticateController';
import  {ConfirmEmail } from './ConfirmEmail';
const router = Router();

router.post("/user",new userCreateController().handle)
router.get("/verify-email", ConfirmEmail)
router.post("/userLog",new userAuthController().handle)
router.get("/user", isAuthenticated, new userAutenticatedController().handle )
export { router }; 