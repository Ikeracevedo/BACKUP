const contactoModel = require('../models/contacto.model');
const Contacto = require('../models/contacto.model');


//Crear mensaje de contacto
exports.crearMensaje = async (req, res) => {

    try{
        const nuevoMensaje = new Contacto(req.body);
        await nuevoMensaje.save();
        res.status(201).json({ message: 'Mensaje enviado exitosamente', data: nuevoMensaje });
    }catch(error){
        res.status(500).json({ message: 'Error al enviar el mensaje ', error});
    }
}

//Obtener todos los mensajes
exports.obtenerMensajes = async (req, res) => {
    try{
        const mensajes = await Contacto.find();
        res.json(mensajes);
    }catch(error){
        res.status(500).json({ message: 'Error al obtener los mensajes', error});
    }
}

//Marcar como leaido
exports.actualizarEstado = async (req, res) => {
    try{
        const { id } = req.params;
        const { estado } = req.body;

        const actualizado = await Contacto.findByIdAndUpdate(
            id,
            { estado },
            { new: true }
        );

        if (!actualizado){
            return res.status(404).json({ message: "Contacto no encontrado "});
        }

        res.json({
            message: 'Estado actualizado correctamente',
            data: actualizado
        });
    } catch ( error ){
        res.status(500).json ({ message: 'Error al actualizar el estado ', error})
    }
}

//Eliminar mensaje
exports.eliminarMensaje = async (req, res) => {
    try{
        await Contacto.findByIdAndDelete(req.params.id);
        res.json({ message: 'Mensaje eliminado exitosamente'});
    } catch (error){
        res.status(500).json({ message: 'Error al eliminar el mensaje', error});
    }

}