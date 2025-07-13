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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class deleteTaskService {
    execute({ taskId, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!taskId || !userId) {
                throw new Error("Todos os dados são necessários para deletar a task");
            }
            const Task = yield prisma_1.default.task.findFirst({
                where: {
                    id: taskId,
                    userId: userId
                }
            });
            if (!Task) {
                throw new Error("Task nao encontrada");
            }
            const deleteTask = yield prisma_1.default.task.delete({
                where: { id: Task.id }
            });
            if (!deleteTask) {
                throw new Error("Erro ao deletar Task");
            }
            return deleteTask;
        });
    }
}
exports.deleteTaskService = deleteTaskService;
