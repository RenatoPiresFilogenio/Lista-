"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskController = void 0;
const createTaskService_1 = require("../../Services/task/createTaskService");
class createTaskController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const userId = req.userId;
            const taskservice = new createTaskService_1.createTaskService();
            const task = yield taskservice.execute({ name, userId });
            return res.json(task);
        });
    }
}
exports.createTaskController = createTaskController;
