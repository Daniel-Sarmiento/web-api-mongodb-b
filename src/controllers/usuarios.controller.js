const usuarioModel = require('../models/usuario.model');
const UsuarioModel = require('../models/usuario.model');

const index = async(req, res) => {
    try {
        const usuarios = await UsuarioModel.find({deleted: false});

        return res.status(200).json({
            message: "se obtuvieron correctamente los usuarios",
            usuarios
        });
    } catch(error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener los usuarios",
            error: error.message
        })
    }
}

// /usuarios/:id
const getById = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuario = await usuarioModel.findById(usuarioId);

        if (!usuario) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "se obtuvo el usuario correctamente",
            usuario,
        });
    } catch (error) {
        return res.status(500).json({
            message: "ocurrió un error al obtener el usuario",
            error: error.message
        })
    }
}

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

// usuarios/:id
const deleteLogico = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuarioEliminado = await usuarioModel.findByIdAndUpdate(usuarioId, {deleted: true, deleted_at: new Date()});

        if (!usuarioEliminado) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "usuario eliminado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "no se pudo eliminar el usuario",
            error: error.message
        });
    }
}

// usuarios/:id
const deleteFisico = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        const usuarioEliminado = await usuarioModel.findByIdAndDelete(usuarioId);

        if (!usuarioEliminado) {
            return res.status(404).json({
                message: "usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "usuario eliminado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            mensaje: "no se pudo eliminar el usuario",
            error: error.message
        });
    }
};

module.exports = {
    index,
    getById,
    create,
    delete: deleteFisico
}