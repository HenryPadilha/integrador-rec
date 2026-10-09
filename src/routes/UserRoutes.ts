import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.post("/", (req, res) => {
userController.criar(req, res);
});

router.post("/login", (req, res) => {
userController.login(req, res);
});

export default router;
