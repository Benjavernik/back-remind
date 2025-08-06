import express from 'express';
import * as usuarioController from '../controllers/usuarios.controller.js';

const router = express.Router();

router.post('/', usuarioController.crearUsuario);
router.put('/:id', usuarioController.actualizarUsuario);
router.delete('/:id', usuarioController.eliminarUsuario);
router.get('/', usuarioController.obtenerUsuarios);

export default router;
