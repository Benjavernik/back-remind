import * as usuarioService from '../services/usuarios.service.js';

export const crearUsuario = async (req, res) => {
    try {
        const usuarioCreado = await usuarioService.crearUsuario(req.body);
        res.status(201).json(usuarioCreado);
    } catch (error) {
        console.error('Error creando usuario:', error);
        res.status(500).json({ error: 'Error creando usuario' });
    }
};

export const actualizarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const usuarioActualizado = await usuarioService.actualizarUsuario(id, req.body);
        if (!usuarioActualizado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(usuarioActualizado);
    } catch (error) {
        console.error('Error actualizando usuario:', error);
        res.status(500).json({ error: 'Error actualizando usuario' });
    }
};

export const eliminarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const usuarioEliminado = await usuarioService.eliminarUsuario(id);
        if (!usuarioEliminado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ mensaje: 'Usuario eliminado', usuario: usuarioEliminado });
    } catch (error) {
        console.error('Error eliminando usuario:', error);
        res.status(500).json({ error: 'Error eliminando usuario' });
    }
};

export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.obtenerUsuarios();
        res.json(usuarios);
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        res.status(500).json({ error: 'Error obteniendo usuarios' });
    }
};
