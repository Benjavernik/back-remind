import express from "express";
import Usuario from "../controllers/usuarios.controller.js";

const router = express.Router();

router.post("/crearusuario", Usuario.crearUsuario);
router.put("/usuarios/:id", actualizarUsuario);
router.delete("/usuarios/:id", eliminarUsuario);

export default router;
