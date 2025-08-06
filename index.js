import express from 'express';
import cors from 'cors';
import pool from './db.js';  
import RecordatorioRoutes from "./routes/recordatorios.router.js";
import UsuarioRoutes from "./routes/usuarios.router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/recordatorio", RecordatorioRoutes);
app.use("/usuario", UsuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
