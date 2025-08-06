import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import UsuarioRoutes from './routes/usuarios.router.js';
import RecordatorioRoutes from './routes/recordatorios.router.js';  // <-- importá acá

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuario', UsuarioRoutes);
app.use('/recordatorios', RecordatorioRoutes);   // <-- montá acá

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
