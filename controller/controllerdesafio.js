const fnc = require('../function/function');
const config = require('../config/config.js');
const controller_callrequest = require("../controller/callrequest");

const GetAllController = {
    async getdesafio1(req,res) {
        //hora inicio 
        try
        {
            var DtaInicio = new Date().getTime();

            var response = "";
            var intCount = "";
            let TypeCall = ['Location','Episode','Character'];
            let charSearch = ['I','E','C'];

            var promise = [];

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

                promise.push(new Promise((resolve, reject) => {
                    resolve(controller_callrequest.getdesafio1(url,charSearch[i],TypeCall[i],res));
                }));
            }

            Promise.all(promise).then(values => {
                var DtaFin= new Date().getTime();
                var timeDiff = Math.round((DtaFin-DtaInicio)/ 1000);
            
                var calculo  = "";
                if(timeDiff<60)
                {
                    calculo = timeDiff + " segundos";
                }
                else
                {
                    var seconds = Math.round(timeDiff % 60);
                    timeDiff = Math.floor(timeDiff / 60);
                    var minutes = Math.round(timeDiff % 60);
                    calculo = minutes + " minutos " + seconds + " segundos";
                }
    
                respuesta = values.toString(); 
                res.send("Tiempo de ejecución: " + calculo + " <br><br> Respuesta: <br> " +  respuesta);
            });
        } catch (error) {
            res.send(error);
        }
    },
    async getdesafio2(req,res) {
        

        var ArrEpisode = await controller_callrequest.CantEpisode(config.ApiUrlEpisode,res);
        var DtaInicio = new Date().getTime();
        var promise = [];

       for (var i = 0; i < ArrEpisode.length -1; i++) {
            promise.push(new Promise((resolve, reject) => {
                var url = config.ApiUrlEpisode;
                url = "https://rickandmortyapi.com/api/episode/" + ArrEpisode[i];
                resolve(controller_callrequest.getdesafio2(url,i +1,res));
            }));
        }

        var respuesta ="";
        Promise.all(promise).then(values => {
            var DtaFin= new Date().getTime();
            var timeDiff = Math.round((DtaFin-DtaInicio)/ 1000);
        
            var calculo  = "";
            if(timeDiff<60)
            {
                calculo = timeDiff + " segundos";
            }
            else
            {
                var seconds = Math.round(timeDiff % 60);
                timeDiff = Math.floor(timeDiff / 60);
                var minutes = Math.round(timeDiff % 60);
                calculo = minutes + " minutos " + seconds + " segundos";
            }

            respuesta = values.toString(); 
            res.send("Tiempo de ejecución: " + calculo + " <br><br> Respuesta: <br> " +  respuesta);
        });
    },
};

module.exports = GetAllController;