import "dotenv/config";
import app from "./app";
import { AppDataSource } from "./config/database";

const PORT = 3001;



AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado!");
app.listen(PORT, () => {
     console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((erro) => {
    console.error("Erro ao conectar ao banco:", erro);
  });