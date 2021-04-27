//librerias
const express = require('express');
const app = express();

//configuraciones
const config = require('./config/config.js');

//agrego las rutas
const PlaceRoute = require('./routes/routesone');
//llamada primer desafio
app.use('/primerdesafio', PlaceRoute);

//test que enviar mensaje hola mundo
app.get("/",function(req,res){
  res.send('Hola mundo');
})

//Para depurar la aplicación en un puerto en espesifico
app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
