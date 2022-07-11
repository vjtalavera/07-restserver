const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor () {

        this.app = express()
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // conexion a BD
        this.conectarDB();

        // middlewares
        this.middlewares();

        // Rutas de la aplicacion
        this.routes();

    }


    async conectarDB () {
        await dbConnection()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use( express.json())
        this.app.use (express.static('public'))
    }

    routes () {

        this.app.use(this.usuariosPath, require('../routes/usuarios'));
        

          
    }

    listen () {
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutandose en el puerto',
            this.port);
        })
    }
}




module.exports = Server;
