const fnc = require('../function/function');
const config = require('../config/config.js');
const controller_callrequest = require("./ControllerPersonajes");

const CallApiRest = {
    //metodo asincrono, recibe el tipo de llamada, caracter que debe buscar
    async getdesafio1(UrlReceive,CharSearch,Tipo,res) {
        try
        {
            let url = UrlReceive;
            //la primera vez UrlNextPage es la url por defecto
            let UrlNextPage = url;
            let IntCount = 0;
            while(true)
            {
                //llamada de tipo await para esperar la respuesta de la api
                var json = await fnc.CallApiRequest(UrlNextPage,res);
                if(res.statusCode = 200)
                {

                }
                //capturo la información que necesito del json response
                if(Object.keys(json)[0]==='id') 
                {
                    UrlNextPage = null;
                    IntCount = await fnc.ContarCaracteres(json['name'],CharSearch,res)
                }
                else
                {
                    var JsonInfo = json['info'];
                    UrlNextPage = JsonInfo['next'];
                    let UrlPrevPage = JsonInfo['prev'];
                    var JsonResults= json['results'];
                    //recorro el json results donde esta el array con la respuesta
                    for(let IndexB in JsonResults)
                    {
                        //capturo el valor de name 
                        var StrValor = JsonResults[IndexB]['name'];
                        IntCount += await fnc.ContarCaracteres(StrValor,CharSearch,res)
                    }
                }
                
                if(UrlNextPage === null)
                {
                    //cuando no quedas paginas para consultar, salimos del while
                    break;
                }
            }
            //retorno la cantidad
            return "La letra " + CharSearch + " esta " + IntCount + " en las " + Tipo + ". </br>";
        } catch (error) {
            throw(error);
        }
    }, 
    async CantEpisode(UrlReceive,res) {
        try
        {
            let url = UrlReceive;
            //la primera vez UrlNextPage es la url por defecto
            let UrlNextPage = url;
            let ArrEpisode = [];
            while(true)
            {
                //llamada de tipo await para esperar la respuesta de la api
                var json = await fnc.CallApiRequest(UrlNextPage,res);
                if(res.statusCode = 200)
                {

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
    async getdesafio2(UrlRequest,NumEpisode,res) {
      
            let StrResponseReq = "";
            //la primera vez UrlNextPage es la url por defecto
            
            //llamada de tipo await para esperar la respuesta de la api
            let json = await fnc.CallApiRequest(UrlRequest,res);
            
            //capturo la información que necesito del json response
            let StrNameEpisode = json['name'];
            let JsonCharacters= json['characters'];

            var Charpromise = [];
            for(let IndexC in JsonCharacters)
            {
                let UrlCharacters = JsonCharacters[IndexC];
                Charpromise.push(new Promise((resolve, reject) => {
                    resolve(controller_callrequest.getPersonajes(UrlCharacters,NumEpisode,StrNameEpisode,res));
                }));
            }

            var aaa = "";
            await Promise.all(Charpromise).then(values2 => 
            {
                var Lugares = [];
                Lugares = (values2.toString()).split(",");
                StrAllLocationsIde = "";
                let IntCountLocation = 0;
                let StrLocations = "{";
                var n = 0;
                for (var i = 0; i < Lugares.length; i++) 
                {
                    n = StrAllLocationsIde.indexOf("," +  Lugares[i] + ",",0);
                    if(n<0)
                    {
                        StrLocations = StrLocations + Lugares[i] + ",";
                        IntCountLocation = IntCountLocation + 1;
                        StrAllLocationsIde = StrAllLocationsIde + "," + Lugares[i] + ","
                    }
                }
                StrLocations = StrLocations  + "}";
                StrResponseReq =  StrResponseReq + "Episodio n " + NumEpisode + ": " + StrNameEpisode;
                StrResponseReq =  StrResponseReq + ", cantidad de location: " + IntCountLocation;
                StrResponseReq =  StrResponseReq + " </br>" + StrLocations + " </br>";
                aaa =StrResponseReq;
            });
            return aaa;
       
    },
};


//exporto el controlador
module.exports = CallApiRest;