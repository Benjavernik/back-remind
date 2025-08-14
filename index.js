import express from 'express';
import cors from 'cors';
import pool from './db.js'; // conexión a PostgreSQL

const app = express();
app.use(cors());
app.use(express.json());

// GET: obtener recordatorios
app.get('/recordatorios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recordatorios');

    const recordatorios = result.rows.map(r => ({
      id: r.id,
      id_user: r.id_user || null,
      titulo: r.titulo,
      detalles: r.detalles || '',
      fecha: r.fecha ? r.fecha.toISOString().split('T')[0] : null,
      hora: r.hora || null,
      hecha: r.hecha ?? false
    }));

    res.json(recordatorios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los recordatorios' });
  }
});

// POST: crear recordatorio
app.post('/recordatorios', async (req, res) => {
  try {
    const { id_user, titulo, detalles, fecha, hora, hecha } = req.body;

    if (!id_user || !titulo || !fecha || !hora) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const query = `
      INSERT INTO recordatorios (id_user, titulo, detalles, fecha, hora, hecha)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [id_user, titulo, detalles || '', fecha, hora, hecha ?? false];
    const result = await pool.query(query, values);

    const nuevoRecordatorio = {
      ...result.rows[0],
      fecha: result.rows[0].fecha ? result.rows[0].fecha.toISOString().split('T')[0] : null
    };

    res.status(201).json(nuevoRecordatorio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el recordatorio' });
  }
});

const PORT = process.env.PORT || 3001; // cambiar a 3001
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
