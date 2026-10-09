import express from "express";
import testRoutes from "./routes/testRoutes";
import userRoutes from "./routes/UserRoutes";
import taskRoutes from "./routes/TaskRoutes";
const app = express();

app.use(express.json());
app.use("/tarefas", taskRoutes);
app.use("/teste", testRoutes);
app.use("/usuarios", userRoutes);

export default app;