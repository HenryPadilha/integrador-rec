import { TaskRepository } from "../repositories/taskRepository";

export class TaskService {

  async criarTarefa(
    titulo: string,
    descricao: string,
    usuario: any
){
    const tarefa = TaskRepository.create({
      titulo: titulo,
      descricao: descricao,
      usuario: usuario
    });

    return await TaskRepository.save(tarefa);
}

async listarTarefas(usuario: any) {

  return await TaskRepository.find({
    where: {
      usuario: {
        id: usuario.id
      }
    }
  });

}

async atualizarTarefa(
    id: number,
    titulo: string,
    descricao: string,
    usuario: any
  ) {

const tarefa = await TaskRepository.findOne({
  where: {
    id: id,
    usuario: {
      id: usuario.id
    }
  }
});

    if (!tarefa) {
      throw new Error("Tarefa não encontrada");
    }
    tarefa.titulo = titulo;
    tarefa.descricao = descricao;

    return await TaskRepository.save(tarefa);
  }


async excluirTarefa(
  id: number,
  usuario: any
) {
 const tarefa = await TaskRepository.findOne({
  where: {
    id: id,
    usuario: {
      id: usuario.id
    }
  }
});

  if (!tarefa) {
    throw new Error("Tarefa não encontrada");
  }
  await TaskRepository.remove(tarefa);
  }
}