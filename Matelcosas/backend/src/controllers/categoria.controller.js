const Categoria = require('../models/categoria.model');

//Crear una nueva categoria
exports.crearCategoria = async (req, res) => {
    try{
        console.log(' Datos recibidos:', req.body);
        const nuevaCategoria = new Categoria(req.body);
        await nuevaCategoria.save();
        res.status(201).json({ message: 'Categoria creada exitosamente', data: nuevaCategoria });
    }catch(error){
        res.status(500).json({ message: 'Error al crear la categoria', error});
    }
};

//Obtener todas las categorias
exports.obtenerCategorias = async (req, res) => {
    try{
        const categorias = await Categoria.find();
        res.json(categorias);
    }catch(error){
        res.status(500).json({ message: 'Error al obtener las categorias', error});
    }
};

//Obtener una categoria por su ID
exports.obtenerCategoriaPorId = async (req, res) => {
    try{
        const categoria = await Categoria.findById(req.params.id);
        if(!categoria) return res.status(404).json({ message: 'Categoria no encontrada'});
        res.json(categoria);
    }catch(error){
        res.status(500).json({ message: 'Error al obtener la categoria', error});
    }
}

//Actualizar una categoria
exports.actualizarCategoria = async (req, res) => {
    try{
        const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Categoria actualizada exitosamente', data: categoria });
    }catch(error){
        res.status(500).json({ message: 'Error al actualizar la categoria', error})
    }
};

//Eliminar una categoria
exports.eliminarCategoria = async (req, res) => {
    try{
        await Categoria.findByIdAndDelete(req.params.id);
        res.json({ message: 'Categoria eliminada exitosamente'});
    }catch(error){
        res.status(500).json({ message: 'Error al eliminar la categoria', error});
    }
};

exports.obtenerActivas = async (req, res) => {
  try {
    const cats = await Categoria.find({ estado: 'activo' }).select('nombre imagen estado');
    res.json(cats);
  } catch (e) {
    res.status(500).json({ message: 'Error listando categorías' });
  }
};


exports.subirImagen = async (req, res) => {
  try {
    const categoriaId = req.params.id;
    

    // Verificamos que Multer haya recibido el archivo
    if (!req.file) {
      return res.status(400).json({ message: "No se recibió archivo" });
    }

    const imagePath = req.file.path;

    // Actualizamos la categoría en la base de datos
    const categoria = await Categoria.findByIdAndUpdate(
      categoriaId,
      { imagen: imagePath },
      { new: true }
    );

    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }


    res.json({
      message: "Imagen subida correctamente",
      categoria,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al subir la imagen", error: error.message });
  }
};
