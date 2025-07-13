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
exports.ConfirmEmail = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
function ConfirmEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token } = req.query;
        if (!token || typeof token !== "string") {
            return res.status(400).send("Token inválido.");
        }
        try {
            const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
            yield prisma_1.default.user.update({
                where: { id: decoded.userId },
                data: { emailVerifiedAt: new Date() }
            });
            return res.redirect("http://localhost:3000");
        }
        catch (error) {
            console.error(error);
            return res.status(400).send("Token expirado ou inválido.");
        }
    });
}
exports.ConfirmEmail = ConfirmEmail;
