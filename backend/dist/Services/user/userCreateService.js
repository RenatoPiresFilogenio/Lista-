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
exports.userCreateService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../../prisma"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = require("jsonwebtoken");
class userCreateService {
    execute({ email, name, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !name || !password) {
                throw new Error("Todos os campos (email, nome e senha) são obrigatórios.");
            }
            if (password.length < 8) {
                throw new Error("senha precisa ter 8 carecteres no minimo.");
            }
            const emailRegex = /^[^\s@]+@(gmail\.com(\.br)?)$/;
            if (!emailRegex.test(email)) {
                throw new Error("Aceitamos apenas emails @gmail.com e @gmail.com.br");
            }
            const findMail = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (findMail) {
                throw new Error("Este email já está cadastrado.");
            }
            const salt = bcryptjs_1.default.genSaltSync(12);
            const hashPassword = yield bcryptjs_1.default.hash(password, salt);
            const createUser = yield prisma_1.default.user.create({
                data: {
                    email, name, password: hashPassword, emailVerifiedAt: null
                }, select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
            const emailconfig = nodemailer_1.default.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD
                }
            });
            const token = (0, jsonwebtoken_1.sign)({ userId: createUser.id }, process.env.JWT_SECRET, { expiresIn: '10m' });
            const mailOptions = {
                from: process.env.EMAIL,
                to: createUser.email,
                subject: "Confirme seu email clicando no botão",
                html: `
                <p>Olá ${createUser.name},</p>
                <p>Por favor para se registrar em Lista+, confirme seu email clicando no botão abaixo:</p>
              <a href="https://lista-de-tarefas-wt23.vercel.app/verify-email?token=${token}"
                  style="
                    display: inline-block;
                    padding: 10px 20px;
                    font-size: 16px;
                    color: white;
                    background-color: #007bff;
                    text-decoration: none;
                    border-radius: 5px;
                  ">
                  Confirmar Email
                </a>
                <p>Se você não solicitou este email, pode ignorar.</p>
              `
            };
            yield emailconfig.sendMail(mailOptions);
            return createUser;
        });
    }
}
exports.userCreateService = userCreateService;
