import { UserRepository } from "../repositories/userRepository";
import { User } from "../entities/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {

  async criarUsuario(nome: string, email: string, senha: string) {

const usuarioExistente = await UserRepository.findOne({
      where: { email: email }
    });
if (usuarioExistente) {
      throw new Error("E-mail já cadastrado");
    }

const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = new User();
    usuario.nome = nome;
    usuario.email = email;
    usuario.senha = senhaCriptografada;

    return await UserRepository.save(usuario);
  }


  async login(email: string, senha: string) {

    const usuario = await UserRepository.findOne({
      where: { email: email }
    });
    if (!usuario) {
      throw new Error("E-mail ou senha inválidos");
    }

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha
    );
    if (!senhaCorreta) {
      throw new Error("E-mail ou senha inválidos");
    }

const token = jwt.sign(
    {
 id: usuario.id,
 email: usuario.email
    },
process.env.JWT_SECRET as string,
      {
 expiresIn: "1h"
      }
    );

    return {
      usuario,
      token
    };
  }

}