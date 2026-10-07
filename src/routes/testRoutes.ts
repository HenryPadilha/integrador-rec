import { Router } from "express";

const router = Router();
router.get("/", (req, res) => {
  res.json({
    mensagem: "Rota funcionando!"
  });
});

export default router;