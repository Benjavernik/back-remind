const express = require("express");
const app = express();
const usuariosRoutes = require("./routes/usuarios.router");

app.use(express.json());

app.use("/api", usuariosRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
