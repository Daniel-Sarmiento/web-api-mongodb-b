const UsuarioModel = require('../models/usuario.model');

const create = async (req, res) => {
    try {
        let usuario = new UsuarioModel({
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password
        });
    
        await usuario.save();

        return res.status(201).json({
            mensaje: "usuario creado exitosamente!"
        });
    } catch(error) {
        return res.status(500).json({
            mensaje: "no se pudo crear el usuario",
            error: error.message
        });
    }
}

module.exports = {
    create
}