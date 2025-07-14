import prismaClient from "../prisma";
import { Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function ConfirmEmail(req: Request, res: Response) {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    return res.status(400).send("Token inválido.");
  }

  try {

    
    const decoded = verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

   
    await prismaClient.user.update({
      where: { id: decoded.userId },
      data: { emailVerifiedAt: new Date() }
    });

    return res.redirect("https://lista-de-tarefas-loie.vercel.app");
  } catch (error) {
    console.error(error);
    return res.status(400).send("Token expirado ou inválido.");
  }
}

