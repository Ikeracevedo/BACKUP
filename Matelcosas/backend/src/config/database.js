const mongoose = require('mongoose');
//Carga las variables del archivo dotenv
require('dotenv').config();

const conexionDB = async () => {
    try {

        //Usa mongoose para conectarse a MongoDb con la Url del .env
        await mongoose.connect(process.env.MONGO_URI);

        //Si la conexion es exitosa, imprimiria este mensaje
        console.log('Conexion lista a MongoBD');

    } catch (error) {

        //Si hay un error, lo muestra y detiene la aplicaion
        console.log('Erro al conectar la base de datos ', error.message);

        //Finaliza el proceso y detiene la ejecucion de Node.js
        process.exit(1);

        }
    }

    //Exporta la funcion para usarla en app.js
    module.exports = conexionDB;