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
exports.userAutenticatedController = void 0;
const userAutenticateService_1 = require("../../Services/user/userAutenticateService");
class userAutenticatedController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const userautenticatedservice = new userAutenticateService_1.userAutenticatedService();
            const Auth = yield userautenticatedservice.execute({
                userId
            });
            return res.json(Auth);
        });
    }
}
exports.userAutenticatedController = userAutenticatedController;
