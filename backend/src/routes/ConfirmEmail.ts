import prismaClient from "../prisma";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function ConfirmEmail(req: Request, res: Response) {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    return res.status(400).send("Token inválido.");
  }

  try {
    // Decodifica e verifica o token JWT
    const decoded = verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    // Atualiza o usuário no banco
    await prismaClient.user.update({
      where: { id: decoded.userId },
      data: { emailVerifiedAt: new Date() }
    });

    return res.redirect("http://localhost:3000");
  } catch (error) {
    console.error(error);
    return res.status(400).send("Token expirado ou inválido.");
  }
}

