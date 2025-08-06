import pool from '../db.js';

export const crearUsuario = async (datos) => {
  const { nombre, email } = datos;
  const query = `INSERT INTO "user" (nombre, email) VALUES ($1, $2) RETURNING *`;
  const values = [nombre, email];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const actualizarUsuario = async (id, nuevosDatos) => {
  const { nombre, email } = nuevosDatos;
  const query = `UPDATE "user" SET nombre = $1, email = $2 WHERE id = $3 RETURNING *`;
  const values = [nombre, email, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const eliminarUsuario = async (id) => {
  const query = `DELETE FROM "user" WHERE id = $1 RETURNING *`;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const obtenerUsuarios = async () => {
  const query = `SELECT * FROM "user"`;
  const result = await pool.query(query);
  return result.rows;
};
