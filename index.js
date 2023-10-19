require('dotenv').config();
require('./src/configs/db.config');

const express = require('express');
const app = express();
const PORT = process.env.PORT;

const usuariosRouter = require('./src/routes/usuarios.route');

app.use(express.json());
app.use('/usuarios', usuariosRouter);

app.listen(PORT, () => {
    console.log("API escuchando en el puerto " + PORT);
});