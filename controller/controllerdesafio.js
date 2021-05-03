const fnc = require('../function/function');
const config = require('../config/config.js');
const controller_callrequest = require("./CallRequest");

const GetAllController = {
    async getdesafio1(req,res) {
        try
        {
            //Variable con el tiempo inicio del proceso
            var DtaInicio = new Date().getTime();
            //Cantidad de páginas por tipo de llamada: Localización , Episodios , Personajes
            var CantPaginasLoca = await controller_callrequest.CantPaginas(config.ApiUrlLocation,res);
            var CantPaginasEpi = await controller_callrequest.CantPaginas(config.ApiUrlEpisode,res);
            var CantPaginasCara = await controller_callrequest.CantPaginas(config.ApiUrlCharacter,res);
            //Tipos de llamadas y filtros de búsqueda
            let TypeCall = ['Location','Episode','Character'];
            let charSearch = ['I','E','C'];
            //Arreglo con las promesas
            var ArrPromise = [];

            for (let i = 0; i < TypeCall.length; i++) 
            {
                let url = "";
                //Case para determinar la url del request y agregar la promesa por tipo de llamada
                switch (TypeCall[i]) {
                    case "Location": 
                        for (let b = 0; b < CantPaginasLoca; b++) 
                        {
                            url = config.ApiUrlLocation + "/?page=" + (b+1);
                            ArrPromise.push(new Promise((resolve, reject) => {
                                resolve(controller_callrequest.getdesafio1(url,charSearch[i],TypeCall[i],res));
                            }));
                        }
                        break;
                    case "Episode": 
                        for (let b = 0; b < CantPaginasEpi; b++) 
                        {
                            url = config.ApiUrlEpisode + "/?page=" +(b+1);
                            ArrPromise.push(new Promise((resolve, reject) => {
                                resolve(controller_callrequest.getdesafio1(url,charSearch[i],TypeCall[i],res));
                            }));
                        }
                        break;
                    case "Character": 
                        for (let b = 0; b < CantPaginasCara; b++) 
                        {
                            url = config.ApiUrlCharacter + "/?page=" +(b+1);
                            ArrPromise.push(new Promise((resolve, reject) => {
                                resolve(controller_callrequest.getdesafio1(url,charSearch[i],TypeCall[i],res));
                            }));
                        }
                        break;
                }
            }

            Promise.all(ArrPromise).then(values => 
            {
                //Seteo de variables
                var Respuesta = "";
                var CantLoca = 0;
                var CantEpi = 0;
                var CantChara = 0;
                //Arreglo de la respuesta la promesa
                var ArrRespuestas = (values.toString()).split(","); 
                for (var i = 0; i < ArrRespuestas.length -1; i++) 
                {
                    //Arreglo con el detalle de la respuesta'
                    var ArrDetalle = ((ArrRespuestas[i]).toString()).split(";"); 
                    //Sumatoria por tipo de respuesta
                    switch (ArrDetalle[2])
                    {
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
                //Generación de la respuesta por tipo
                Respuesta = "La letra I esta " + CantLoca + " en las Location. <br> ";
                Respuesta = Respuesta + "La letra E esta " + CantEpi + " en las Episode. <br> ";
                Respuesta = Respuesta + "La letra C esta " + CantChara + " en las Character. <br> ";
                
                //Variable con el tiempo del fin del proceso
                var DtaFin= new Date().getTime();
                //Diferencia en milesegundos
                var timeDiff = Math.round((DtaFin-DtaInicio)/ 1000);
                var StrCalculo  = "";
                if(timeDiff<60)
                {
                    //Respuesta en segundos 
                    StrCalculo = timeDiff + " segundos";
                }
                else
                {
                    //Respuesta en minutos y segundos
                    var seconds = Math.round(timeDiff % 60);
                    timeDiff = Math.floor(timeDiff / 60);
                    var minutes = Math.round(timeDiff % 60);
                    StrCalculo = minutes + " minutos " + seconds + " segundos";
                }
                //Generación de la respuesta, calculo tiempo ejecución + respuesta del desafío
                res.send("Tiempo de ejecución: " + StrCalculo + " <br><br> Respuesta: <br> " +  Respuesta);
            });
        } catch (error) {
            res.send(error);
        }
    },
    async getdesafio2(req,res) {
        try
        {
            //Variable con el tiempo inicio del proceso
            var DtaInicio = new Date().getTime();
            //Cantidad total de episodios
            var ArrEpisode = await controller_callrequest.CantEpisode(config.ApiUrlEpisode,res);
            //Arreglo para las nuevas promesas
            var ArrPromise = [];
            //Ciclo por cantidad de episodios para crear las promesas
            for (let i = 0; i < ArrEpisode.length -1; i++) {
                ArrPromise.push(new Promise((resolve, reject) => {
                    //Url episodio + número del episodio
                    var url = config.ApiUrlEpisode + "/" + ArrEpisode[i];
                    resolve(controller_callrequest.getdesafio2(url,i +1,res));
                }));
            }

            var StrRespuesta ="";
            Promise.all(ArrPromise).then(values => 
            {
                //Variable con el tiempo del fin del proceso
                var DtaFin= new Date().getTime();
                //Diferencia en milesegundos
                var timeDiff = Math.round((DtaFin-DtaInicio)/ 1000);
                var StrCalculo  = "";
                if(timeDiff<60)
                {
                    //Respuesta en segundos 
                    StrCalculo = timeDiff + " segundos";
                }
                else
                {
                    //Respuesta en minutos y segundos
                    var seconds = Math.round(timeDiff % 60);
                    timeDiff = Math.floor(timeDiff / 60);
                    var minutes = Math.round(timeDiff % 60);
                    StrCalculo = minutes + " minutos " + seconds + " segundos";
                }
                //Respuesta promesa
                StrRespuesta = values.toString(); 
                //Generación de la respuesta, calculo tiempo ejecución + respuesta del desafío
                res.send("Tiempo de ejecución: " + StrCalculo + " <br><br> Respuesta: <br> " +  StrRespuesta);
            });
        } catch (error) {
            res.send(error);
        }
    },
};

module.exports = GetAllController;