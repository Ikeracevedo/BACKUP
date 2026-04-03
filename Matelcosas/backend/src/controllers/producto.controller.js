const Producto = require('../models/producto.model');

// Crear producto
exports.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json({ message: 'Producto creado correctamente', data: nuevoProducto });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto', error });
  }
};

// Listar todos los productos (con populate de categoría)
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
};

// Obtener producto por ID
exports.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error });
  }
};

// Actualizar producto
exports.actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Producto actualizado', data: producto });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto', error });
  }
};

// Eliminar producto
exports.eliminarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error });
  }
};
