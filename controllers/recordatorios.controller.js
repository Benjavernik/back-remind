import express from "express";
import Usuario from "../controllers/usuarios.controller.js";

const router = express.Router();

router.post("/", Usuario.crearUsuario);
router.put("/:id", Usuario.actualizarUsuario);
router.delete("/:id", Usuario.eliminarUsuario);

export default router;
