const Usuario = require("../models/Usuario.model.js"); 

const crearUsuario = async (datos) => {
  const nuevoUsuario = new Usuario(datos);
  return await nuevoUsuario.save();
};


const actualizarUsuario = async (id, nuevosDatos) => {
  return await Usuario.findByIdAndUpdate(id, nuevosDatos, { new: true });
};


const eliminarUsuario = async (id) => {
  return await Usuario.findByIdAndDelete(id);
};

const obtenerUsuarios = async () => {
  return await Usuario.find();
};

module.exports = {
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarios,
};
