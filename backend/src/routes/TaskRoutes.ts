import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const taskController = new TaskController();

router.post("/", authMiddleware, (req, res) => {
  taskController.criar(req, res);
});
router.get("/", authMiddleware, (req, res) => {
  taskController.listar(req, res);
});
router.put("/:id", authMiddleware, (req, res) => {
  taskController.atualizar(req, res);
});
router.delete("/:id", authMiddleware, (req, res) => {
  taskController.excluir(req, res);
});

export default router;