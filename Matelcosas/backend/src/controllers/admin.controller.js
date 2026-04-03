const Admin = require('../models/admin.model');
const Producto = require('../models/producto.model');  
const Categoria = require('../models/categoria.model'); 
const Contacto = require('../models/contacto.model');    
//Bcrypt para colocarle un hash a la contraseña antes de ser enviada a la base de datos
const bcrypt = require('bcrypt');
//Lo uso para mantener autenticado el admin y evitar fugas en las rutas
const jwt = require('jsonwebtoken');

//Crear cuenta de administrador
exports.crearAdmin = async (req, res) => {
    try{
        const {usuario, correo, contraseña, rol} = req.body;
        const ContraseñaHasheada = await bcrypt.hash(contraseña, 10);
        const nuevoAdmin = new Admin({usuario, correo, contraseña: ContraseñaHasheada, rol});
        await nuevoAdmin.save();
        res.status(201).json({ message: "Administrador fue creado existosamente"});
    }catch(error){
        res.status(500).json({ message: 'Error al crear el administrador', error });    
    }
};

//Login de admin
exports.loginAdmin = async (req, res) => {
    try{
        const {correo, contraseña} = req.body;
        const admin = await Admin.findOne({correo});
        if(!admin) return res.status(404).json({message: 'El administrador no existe'});

        const usuario = await bcrypt.compare(contraseña, admin.contraseña);
        if(!usuario) return res.status(401).json({message: 'Contraseña incorrecta'});

        const token = jwt.sign({ id: admin._id}, process.env.JWT_SECRET, {expiresIn: '2h'});
        res.json({ message: 'Inicio de sesión exitoso', token })
    }catch(error){
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};

//Ver el perfil del admin
exports.obtenerPerfil = async (req, res) => {
    try{
        const admin = await Admin.findById(req.user.id).select('-contraseña');
        res.json(admin);
    }catch(error){
        res.status(500).json({ message: 'Error al obtener el perfil', error })
    }

;}

exports.obtenerResumen = async (req, res) => {
  try {
    const productos = await Producto.countDocuments();
    const categorias = await Categoria.countDocuments();
    const pendientes = await Contacto.countDocuments({
      estado: { $in: ['Sin atender', false] }
    });

    res.json({ productos, categorias, pendientes });
  } catch (error) {
    console.error('Error al obtener resumen:', error);
    res.status(500).json({ message: 'Error al obtener resumen', error });
  }
};