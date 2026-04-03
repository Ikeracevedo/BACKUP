
const mongoose = require('mongoose');

const contactoEsquema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    telefono:{
        type: String,
        required: true,
        trim: true,
    },
    mensaje:{
        type: String,
    },
    fecha:{
        type: Date,
        default: Date.now
    },
    estado:{
        type: String,
        required: true,
        default: false
    }

});

module.exports = mongoose.model('Contacto', contactoEsquema, 'contacto');