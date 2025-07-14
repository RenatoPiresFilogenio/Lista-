"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const isAuthenticated_1 = require("./Middleware/isAuthenticated");
//import user
const userCreateController_1 = require("./Controllers/user/userCreateController");
const userAuthController_1 = require("./Controllers/user/userAuthController");
const userAutenticateController_1 = require("./Controllers/user/userAutenticateController");
const ConfirmEmail_1 = require("./confirmEmail/ConfirmEmail");
// import Task
const createTaskController_1 = require("./Controllers/task/createTaskController");
const listTaskController_1 = require("./Controllers/task/listTaskController");
const doneTaskController_1 = require("./Controllers/task/doneTaskController");
const deleteTaskController_1 = require("./Controllers/task/deleteTaskController");
const router = (0, express_1.Router)();
exports.router = router;
router.post("/user", new userCreateController_1.userCreateController().handle);
router.get("/verify-email", ConfirmEmail_1.ConfirmEmail);
router.post("/userLog", new userAuthController_1.userAuthController().handle);
router.get("/user", isAuthenticated_1.isAuthenticated, new userAutenticateController_1.userAutenticatedController().handle);
//router Task
router.post("/Task", isAuthenticated_1.isAuthenticated, new createTaskController_1.createTaskController().handle);
router.get("/taskList", isAuthenticated_1.isAuthenticated, new listTaskController_1.listTaskController().handle);
router.patch("/Task", isAuthenticated_1.isAuthenticated, new doneTaskController_1.doneTaskController().handle);
router.delete("/Task", isAuthenticated_1.isAuthenticated, new deleteTaskController_1.deleteTaskController().handle);
