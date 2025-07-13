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
exports.userCreateController = void 0;
const userCreateService_1 = require("../../Services/user/userCreateService");
class userCreateController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ error: "Todos os dados são necessários para criar a conta" });
            }
            try {
                const usercreateservice = new userCreateService_1.userCreateService();
                const user = yield usercreateservice.execute({ name, email, password });
                return res.json(user);
            }
            catch (error) {
                return res.status(400).json({ error: "Erro ao criar usuário" });
            }
        });
    }
}
exports.userCreateController = userCreateController;
