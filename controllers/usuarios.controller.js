const usuariosService = require("../services/usuarios.service");

const crearUsuario = async (req, res) => {
  try {
    console.log(" Datos recibidos del cliente:", req.body); 

    const usuario = await usuariosService.crearUsuario(req.body);

    res.status(201).json(usuario);
  } catch (error) {
    console.error(" ERROR al crear usuario:", error); 
    res.status(400).json({ 
      mensaje: "Error al crear usuario", 
      error: error.message || error 
    });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await usuariosService.actualizarUsuario(req.params.id, req.body);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.error("ERROR al actualizar usuario:", error);
    res.status(400).json({ 
      mensaje: "Error al actualizar usuario", 
      error: error.message || error 
    });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await usuariosService.eliminarUsuario(req.params.id);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    console.error("ERROR al eliminar usuario:", error);
    res.status(400).json({ 
      mensaje: "Error al eliminar usuario", 
      error: error.message || error 
    });
  }
};

module.exports = {
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
