import express from 'express';
import bodyParser from 'body-parser';
import pool from './db.js'; 

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/recordatorios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recordatorios');

    const recordatorios = result.rows.map(r => ({
      id: r.id,
      id_user: r.id_user || null,
      titulo: r.titulo,
      detalles: r.detalles,
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


app.post('/recordatorios', async (req, res) => {
  try {
    const { id_user, titulo, detalles, fecha, hora, hecha } = req.body;

    const result = await pool.query(
      `INSERT INTO recordatorios (id_user, titulo, detalles, fecha, hora, hecha)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [id_user, titulo, detalles, fecha, hora, hecha ?? false]
    );

    const nuevoRecordatorio = {
      ...result.rows[0],
      fecha: result.rows[0].fecha.toISOString().split('T')[0]
    };

    res.status(201).json(nuevoRecordatorio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el recordatorio' });
  }
});

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
