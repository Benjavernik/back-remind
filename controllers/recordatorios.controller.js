import pool from '../db.js';

// Crear un nuevo recordatorio
export const crearRecordatorio = async (req, res) => {
  try {
    const { titulo, detalles, fecha, hora } = req.body;
    const query = `
      INSERT INTO public."recordatorios" ("titulo", "detalles", "fecha", "hora")
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const values = [titulo, detalles, fecha, hora];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear recordatorio:', error);
    res.status(500).json({ error: 'Error al crear recordatorio' });
  }
};

// Obtener todos los recordatorios ordenados por fecha y hora
export const obtenerRecordatorios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recordatorios ORDER BY fecha, hora');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener recordatorios:', error);
    res.status(500).json({ error: 'Error al obtener recordatorios' });
  }
};

// Eliminar un recordatorio por ID
export const eliminarRecordatorio = async (req, res) => {
  try {
    const id = req.params.id;
    await pool.query('DELETE FROM recordatorios WHERE id_recordatorio = $1', [id]);
    res.json({ mensaje: 'Recordatorio eliminado' });
  } catch (error) {
    console.error('Error al eliminar recordatorio:', error);
    res.status(500).json({ error: 'Error al eliminar recordatorio' });
  }
};
