
import { Request, Response } from "express";
import { TaskService } from "../services/taskService";

const taskService = new TaskService();

export class TaskController {
  async criar(req: Request, res: Response) {
    try {
      const { titulo, descricao } = req.body;
      const usuario = (req as any).usuario;

      const tarefa = await taskService.criarTarefa(titulo, descricao, usuario);

      return res.status(201).json(tarefa);
    } catch (erro) {
      console.log(erro);
      return res.status(400).json({ mensagem: "Erro ao criar tarefa" });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      const usuario = (req as any).usuario;
      const tarefas = await taskService.listarTarefas(usuario);

      return res.status(200).json(tarefas);
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({ mensagem: "Erro ao buscar tarefas" });
    }
  }

  async buscar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const usuario = (req as any).usuario;

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ mensagem: "ID invalido" });
      }

      const tarefa = await taskService.buscarTarefa(id, usuario);

      return res.status(200).json(tarefa);
    } catch (erro) {
      return res.status(404).json({ mensagem: "Tarefa nao encontrada" });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { titulo, descricao } = req.body;
      const usuario = (req as any).usuario;

      const tarefa = await taskService.atualizarTarefa(
        Number(id),
        titulo,
        descricao,
        usuario
      );

      return res.status(200).json(tarefa);
    } catch (erro) {
      console.log(erro);
      return res.status(404).json({ mensagem: "Tarefa nao encontrada" });
    }
  }

  async excluir(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = (req as any).usuario;

      await taskService.excluirTarefa(Number(id), usuario);

      return res.status(200).json({ mensagem: "Tarefa excluida" });
    } catch (erro) {
      console.log(erro);
      return res.status(404).json({ mensagem: "Tarefa nao encontrada" });
    }
  }
}
