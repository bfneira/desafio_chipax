const fnc = require('../function/function');
const config = require('../config/config.js');
const controller_callrequest = require("../controller/callrequest");

const GetAllController = {
    async get(req,res) {
        //hora inicio 
        try
        {
            var DtaInicio = new Date().getTime();

            var response = "";
            var intCount = "";
            let TypeCall = ['Location','Episode','Character'];
            let charSearch = ['I','E','C'];

            for (var i = 0; i < TypeCall.length; i++) 
            {
                let url = "";
            //case para determinar la url del request
                switch (TypeCall[i]) {
                    case "Location": 
                        url = config.ApiUrlLocation;
                        break;
                    case "Episode": 
                        url = config.ApiUrlEpisode;
                        break;
                    case "Character": 
                        url = config.ApiUrlCharacter;
                        break;
                }
                intCount = await controller_callrequest.get(url,charSearch[i],res);
                response += "La letra " + charSearch[i] + " esta " + intCount + " en las " + TypeCall[i] + ". </br>";
            }

            //hora fin
            var DtaFin= new Date().getTime();
            var calculo = await fnc.CalcularTiempo(DtaInicio,DtaFin);
            console.log(calculo);
            res.send("Tiempo de ejecución: " + calculo + " <br><br> Respuesta: <br> " +  response);
        } catch (error) {
            res.send(error);
        }
    },
    async getdesafio2(req,res) {
        try
        {
            //hora inicio 
            var DtaInicio = new Date().getTime();
            
            var url = config.ApiUrlEpisode;
           // url = "https://rickandmortyapi.com/api/episode/28";
            var response = await controller_callrequest.getdesafio2(url,res);

            //hora fin
            var DtaFin= new Date().getTime();
            var calculo = await fnc.CalcularTiempo(DtaInicio,DtaFin);
            console.log(calculo);
            res.send("Tiempo de ejecución: " + calculo + " <br><br> Respuesta: <br> " +  response);
   
        } catch (error) {
            res.send(error);
        }
    },
};

module.exports = GetAllController;