//Referencias a librerías
const express = require('express');
const app = express();

//Configuraciones
const config = require('./config/config.js');

//Agrego las rutas
const routesone = require('./routes/routesone');
const routestwo = require('./routes/routestwo');

//Llamada al primer desafío
app.use('/primerdesafio', routesone);
//Llamada al segundo desafío
app.use('/segundodesafio', routestwo);

//Para depurar la aplicación en un puerto en específico
app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
