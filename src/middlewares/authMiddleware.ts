import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

const authorization = req.headers.authorization;

  if (!authorization) {
 return res.status(401).json({
  mensagem: "Token não informado"
    });
  }

  const token = authorization.split(" ")[1];

  try {
  const usuario = jwt.verify(
      token,
    process.env.JWT_SECRET as string
    );

  (req as any).usuario = usuario;
    next();

  } catch (erro) {
return res.status(401).json({
    mensagem: "Token inválido"
    });

  }
}