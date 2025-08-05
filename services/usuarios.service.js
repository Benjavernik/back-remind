const pool = require("./db"); // Asegurate de tener el archivo db.js con la conexión a PostgreSQL

const crearUsuario = async (datos) => {
  const { nombre, email } = datos;
  const query = "INSERT INTO usuarios (nombre, email) VALUES ($1, $2) RETURNING *";
  const values = [nombre, email];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const actualizarUsuario = async (id, nuevosDatos) => {
  const { nombre, email } = nuevosDatos;
  const query = "UPDATE usuarios SET nombre = $1, email = $2 WHERE id = $3 RETURNING *";
  const values = [nombre, email, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const eliminarUsuario = async (id) => {
  const query = "DELETE FROM usuarios WHERE id = $1 RETURNING *";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const obtenerUsuarios = async () => {
  const query = "SELECT * FROM usuarios";
  const result = await pool.query(query);
  return result.rows;
};

module.exports = {
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarios,
};
