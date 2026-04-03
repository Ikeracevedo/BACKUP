
const mongoose = require('mongoose');

const categoriaEsquema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    descripcion: {
        type: String,
        default: ''
    },
    imagen:{
        type: String,
        default: '',
    },
    estado:{
        type: String,
        default: 'Activo',
        enum: ['Activo', 'Inactivo']
    }
});

module.exports = mongoose.model('Categorias', categoriaEsquema, 'categorias');
