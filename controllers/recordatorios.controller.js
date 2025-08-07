import pool from '../db.js';

export const crearRecordatorio = async (req, res) => {
  try {
    const { id_user, titulo, detalles, fecha, hora, hecha } = req.body;

    const query = `
      INSERT INTO public."recordatorios" 
      ("id_user", "titulo", "detalles", "fecha", "hora", "hecha")
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [id_user, titulo, detalles, fecha, hora, hecha];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error('Error al crear recordatorio:', error);
    res.status(500).json({ error: 'Error al crear recordatorio' });
  }
};

export const obtenerRecordatorios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recordatorios ORDER BY fecha, hora');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener recordatorios:', error);
    res.status(500).json({ error: 'Error al obtener recordatorios' });
  }
};

export const eliminarRecordatorio = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query('DELETE FROM recordatorios WHERE id = $1', [id]);
    res.json({ mensaje: 'Recordatorio eliminado' });
  } catch (error) {
    console.error('Error al eliminar recordatorio:', error);
    res.status(500).json({ error: 'Error al eliminar recordatorio' });
  }
};
