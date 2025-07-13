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
exports.userAuthService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class userAuthService {
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !password) {
                throw new Error("Email ou senha inválidos");
            }
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    email
                }
            });
            if (!user) {
                throw new Error("Email não encontrado");
            }
            if (user.emailVerifiedAt == null) {
                throw new Error("Usuário não verificado");
            }
            const isPasswordCorrect = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!isPasswordCorrect) {
                // não é seguro apontar o que está errado com o login
                throw new Error("Email ou senha inválido");
            }
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name,
                email: user.email
            }, process.env.JWT_SECRET, {
                subject: user.id,
                expiresIn: '1d'
            });
            if (!token) {
                throw new Error("Usuário não autorizado");
            }
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            };
        });
    }
}
exports.userAuthService = userAuthService;
