import express from 'express';
import * as recordatorioController from '../controllers/recordatorios.controller.js';

const router = express.Router();

router.post('/', recordatorioController.crearRecordatorio);
router.get('/', recordatorioController.obtenerRecordatorios);
router.delete('/:id', recordatorioController.eliminarRecordatorio);

export default router;
