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
exports.doneTaskController = void 0;
const doneTaskService_1 = require("../../Services/task/doneTaskService");
class doneTaskController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { taskId } = req.body;
            const userId = req.userId;
            const donetaskservice = new doneTaskService_1.doneTaskService();
            const Task = yield donetaskservice.execute({ taskId, userId });
            return res.json(Task);
        });
    }
}
exports.doneTaskController = doneTaskController;
