const fnc = require('../function/function');
const config = require('../config/config.js');
const controller_callrequest = require("../controller/callrequest");

const GetAllController = {
    async getdesafio1(req,res) {
        //hora inicio 
        try
        {
            var CantPaginasLoca = await controller_callrequest.CantPaginas(config.ApiUrlLocation,res);
            var CantPaginasEpi = await controller_callrequest.CantPaginas(config.ApiUrlEpisode,res);
            var CantPaginasCara = await controller_callrequest.CantPaginas(config.ApiUrlCharacter,res);

            var DtaInicio = new Date().getTime();
            let TypeCall = ['Location','Episode','Character'];
            let charSearch = ['I','E','C'];

            var promise = [];

            for (var i = 0; i < TypeCall.length; i++) 
            {
                let url = "";
            //case para determinar la url del request
                switch (TypeCall[i]) {
                    case "Location": 
                        for (var b = 0; b < CantPaginasLoca; b++) 
                        {
                            url = config.ApiUrlLocation + "/?page=" + (b+1);
                            promise.push(new Promise((resolve, reject) => {
                                resolve(controller_callrequest.getdesafio1(url,charSearch[i],TypeCall[i],res));
                            }));
                        }
                        break;
                    case "Episode": 
                        for (var b = 0; b < CantPaginasEpi; b++) 
                        {
                            url = config.ApiUrlEpisode + "/?page=" +(b+1);
                            promise.push(new Promise((resolve, reject) => {
                                resolve(controller_callrequest.getdesafio1(url,charSearch[i],TypeCall[i],res));
                            }));
                        }
                        break;
                    case "Character": 
                        for (var b = 0; b < CantPaginasCara; b++) 
                        {
                            url = config.ApiUrlCharacter + "/?page=" +(b+1);
                            promise.push(new Promise((resolve, reject) => {
                                resolve(controller_callrequest.getdesafio1(url,charSearch[i],TypeCall[i],res));
                            }));
                        }
                        break;
                }

                
            }

            Promise.all(promise).then(values => {
                var respuesta = "";
                var CantLoca = 0;
                var CantEpi = 0;
                var CantChara = 0;
                var ArrRespuestas = (values.toString()).split(","); 
                for (var i = 0; i < ArrRespuestas.length -1; i++) 
                {
                    var ArrDetalle = ((ArrRespuestas[i]).toString()).split(";"); 
                    switch (ArrDetalle[2]){
                        case "Location":
                            CantLoca = CantLoca + Number(ArrDetalle[1]);
                            break;
                        case "Episode":
                            CantEpi = CantEpi + Number(ArrDetalle[1]);
                            break;
                        case "Character":
                            CantChara = CantChara + Number(ArrDetalle[1]);
                            break;
                        
                    }
                }
                
                respuesta = "La letra I esta " + CantLoca + " en las Location. <br> ";
                respuesta = respuesta + "La letra E esta " + CantEpi + " en las Episode. <br> ";
                respuesta = respuesta + "La letra C esta " + CantChara + " en las Character. <br> ";

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