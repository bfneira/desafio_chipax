const fnc = require('../function/function');
const config = require('../config/config.js');
const controller_other = require("./ControllerOther");

const CallApiRest = {
    //metodo asincrono, recibe el tipo de llamada, caracter que debe buscar
    async getdesafio1(UrlReceive,CharSearch,Tipo,res) {
        try
        {
            //Seteo variables
            var CantLugares = 0;
            var ArrPomise = [];
          
            //llamada de tipo await para esperar la respuesta de la api
            var json = await fnc.CallApiRequest(UrlReceive,res);
            if(res.statusCode != 200)
            {
                throw new Error('¡Ups! respuesta diferente a 200');
            }
            //Captura respuesta
            var JsonInfo = json['info'];
            UrlNextPage = JsonInfo['next'];
            let UrlPrevPage = JsonInfo['prev'];
            var JsonResults= json['results'];
            //recorro el json results donde esta el array con la respuesta
            for(let IndexB in JsonResults)
            {
                //capturo el valor de name 
                var StrValor = JsonResults[IndexB]['name'];
                //Arreglo de promesas para contar los caracteres encontrados por tipo
                ArrPomise.push(new Promise((resolve, reject) => {
                    resolve(fnc.ContarCaracteres(StrValor,CharSearch,res));
                }));
            }
            
            await Promise.all(ArrPomise).then(values => 
            {
                var ArrLugares = values;
                //Suma cantidad de origenes
                CantLugares = ArrLugares.reduce((a, b) => a + b, 0);
            });

            //retorno arreglo con la cantidad por tipo de llamada
            return CharSearch +";" + CantLugares +";" + Tipo;
        } catch (error) {
            throw(error);
        }
    },
    async getdesafio2(UrlRequest,NumEpisode,res) {
        try
        {
            let StrResponseReq = "";
            var ArrPromise = [];
            
            //llamada de tipo await para esperar la respuesta de la api
            let json = await fnc.CallApiRequest(UrlRequest,res);
            
            //capturo la información que necesito del json response
            let StrNameEpisode = json['name'];
            let JsonCharacters= json['characters'];
            //Recorro la variable JsonCharacters
            for(let IndexC in JsonCharacters)
            {
                let UrlCharacters = JsonCharacters[IndexC];
                //promesa para buscar las localizaciones de los personajes
                ArrPromise.push(new Promise((resolve, reject) => {
                    resolve(controller_other.getPersonajes(UrlCharacters,res));
                }));
            }

            var StrRespuesta = "";
            await Promise.all(ArrPromise).then(values => 
            {
                //Arreglo con la respuesta de las localizaciones
                var ArrLugares = [];
                ArrLugares = (values.toString()).split(",");
                //Seteo de variables
                StrAllLocationsIde = "";
                let IntCountLocation = 0;
                let StrLocations = "{";
                var n = 0;
                //Recorro la respuesta
                for (let i = 0; i < ArrLugares.length; i++) 
                {
                    //Solo concateno y cuento si es diferente
                    n = StrAllLocationsIde.indexOf("," +  ArrLugares[i] + ",",0);
                    if(n<0)
                    {
                        StrLocations = StrLocations + ArrLugares[i] + ",";
                        IntCountLocation = IntCountLocation + 1;
                        StrAllLocationsIde = StrAllLocationsIde + "," + ArrLugares[i] + ","
                    }
                }
                //Creo respuesta
                StrLocations = StrLocations  + "}";
                StrResponseReq =  StrResponseReq + "Episodio n " + NumEpisode + ": " + StrNameEpisode;
                StrResponseReq =  StrResponseReq + ", cantidad de location: " + IntCountLocation;
                StrResponseReq =  StrResponseReq + " </br>" + StrLocations + " </br>";
                StrRespuesta =StrResponseReq;
            });
            //Retorno respuesta
            return StrRespuesta;
        } catch (error) {
            throw(error);
        }
    },
    async CantPaginas(UrlReceive,res) {
        try
        {
            let CantPaginas = 0;
            //llamada de tipo await para esperar la respuesta de la api
            var json = await fnc.CallApiRequest(UrlReceive,res);

            if(res.statusCode != 200)
            {
                throw new Error('¡Ups! respuesta diferente a 200');
            }
            
            //Cantidad de paginas
            CantPaginas = json['info']['pages'];
            //Retorno la cantidad
            return CantPaginas;
        } catch (error) {
            throw(error);
        }
    },
    async CantEpisode(UrlReceive,res) {
        try
        {
            //la primera vez UrlNextPage es la url por defecto
            let UrlNextPage = UrlReceive;
            let ArrEpisode = [];
            while(true)
            {
                //llamada de tipo await para esperar la respuesta de la api
                var json = await fnc.CallApiRequest(UrlNextPage,res);

                if(res.statusCode != 200)
                {
                    throw new Error('¡Ups! respuesta diferente a 200');
                }
               
                var JsonInfo = json['info'];
                UrlNextPage = JsonInfo['next'];
                let UrlPrevPage = JsonInfo['prev'];
                var JsonResults= json['results'];
                //recorro el json results donde esta el array con la respuesta
                for(let IndexB in JsonResults)
                {
                    //capturo el valor de name 
                    var StrValor = JsonResults[IndexB]['id'];
                    ArrEpisode.push(StrValor);
                }
                
                if(UrlNextPage === null)
                {
                    //cuando no quedas paginas para consultar, salimos del while
                    break;
                }
            }
            //retorno la cantidad
            return ArrEpisode;
        } catch (error) {
            throw(error);
        }
    },
};

//exporto el controlador
module.exports = CallApiRest;