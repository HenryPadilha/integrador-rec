import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const userService = new UserService();

export class UserController {

  async criar(req: Request, res: Response) {
    try {

 const { nome, email, senha } = req.body;
const usuario = await userService.criarUsuario(
 nome,
email,
senha
      );
 return res.status(201).json(usuario);

    } catch (erro) {
     return res.status(400).json({
        mensagem: "E-mail já cadastrado"
      });
    }
  }


  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;
      const usuario = await userService.login(email, senha);
      return res.status(200).json(usuario);

    } catch (erro) {
      return res.status(401).json({
        mensagem: "E-mail ou senha inválidos"
      });
    }
  }

}