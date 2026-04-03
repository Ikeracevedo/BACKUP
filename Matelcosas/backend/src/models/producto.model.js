
const mongoose = require('mongoose');

const productoEsquema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    tags:{
        type: [String],
        required: true,
        default: []
    },
    descripcionCorta:{
        type: String,
    },
    descripcionLarga:{
        type: String,
    },
    categoria: {
    type: mongoose.Schema.Types.ObjectId, // referencia textual, puedes cambiarlo a ObjectId luego
    ref: 'categorias',
    required: true
    },
    subCategoria: {
        type: String
    },
    precioBase: {
        type: Number,
        required: true
    },
    precioOferta: {
        type: Number
    },
    porcentajeDescuento: {
        type: Number,
        default: 0
    },
    stockTotal: {
        type: Number,
        required: true,
        min: 0 // no puede ser negativo
    },
    imagenes: {
        type: [String], 
        default: []
    },
    vistas: {
        type: Number,
        default: 0
    },
    caracteristicas: {
        type: Object, // objeto dinamico, clave: valor
        default: {}
    },
    variaciones: [
        {
        nombre: { type: String },
        precio: { type: Number },
        stock: { type: Number },
        caracteristicas: { type: Object }
        }
    ],
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    fechaActualizacion: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        default: 'activo',
        enum: ['activo', 'inactivo'] // restringe los valores posibles
    }
    });

    //Actualiza la fecha automaticamente al modificar
    productoEsquema.pre('save', function (next) {
        this.fechaActualizacion = Date.now();
        next();
});

module.exports = mongoose.model('Producto', productoEsquema, 'productos');