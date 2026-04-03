
const mongoose = require('mongoose');

const adminEsquema = new mongoose.Schema({

    usuario: {
        type: String,
        required: true,
        unique: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    contraseña:{
        type: String,
        required: true
    },
    rol:{
        type: String,
        required: true
    },
    ultimoLogin:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Admin', adminEsquema, 'admin');