const fnc = require('../function/function');
const config = require('../config/config.js');

const CallApiRest = {
    //metodo asincrono, recibe el tipo de llamada, caracter que debe buscar
    async get(UrlReceive,CharSearch,res) {
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
            return IntCount;
        } catch (error) {
            throw(error);
        }
    }, 
    async getdesafio2(UrlRequest,res) {
        try
        {
            var StrResponseReq = "";
            var IntCountLocation = 0;
            //la primera vez UrlNextPage es la url por defecto
            let UrlNextPage = UrlRequest;

            var NumLocation = 0;
            while(true)
            {
            
                //llamada de tipo await para esperar la respuesta de la api
                var json = await fnc.CallApiRequest(UrlNextPage,res);
                
                //capturo la información que necesito del json response
                var JsonInfo = json['info'];
                UrlNextPage = JsonInfo['next'];
                let UrlPrevPage = JsonInfo['prev'];
                var JsonResults= json['results'];
                //recorro el json results donde esta el array con la respuesta
                for(let IndexB in JsonResults)
                {
                    NumLocation ++;
                    //capturo el valor de name 
                    var StrNameEpisode = JsonResults[IndexB]['name'];
                    var JsonCharacters= JsonResults[IndexB]['characters'];

                    IntCountLocation = 0;
                    StrLocations = "{";
                    StrAllLocations = "";
                    StrAllLocationsIde = "";
                    for(let IndexC in JsonCharacters)
                    {
                        var n = 0;
                        var UrlCharacters = JsonCharacters[IndexC];
                        //llamada de tipo await para esperar la respuesta de la api
                        json = await fnc.CallApiRequest(UrlCharacters,res);
                         //capturo la información que necesito del json response
                        var StrCharacterName = json['name'];
                        var StrLocationOrigin = json['origin']['name'];

                        n = StrAllLocationsIde.indexOf("," +  json['origin']['name'] + ",",0);
                        if(n<0)
                        {
                            StrLocations = StrLocations + StrLocationOrigin + ",";
                            IntCountLocation = IntCountLocation + 1;
                            StrAllLocationsIde = StrAllLocationsIde + "," + json['origin']['name'] + ","
                        }
                    }
                    StrLocations = StrLocations  + "}";
                    StrResponseReq =  StrResponseReq + "Episodio n " + NumLocation + ": " + StrNameEpisode;
                    StrResponseReq =  StrResponseReq + ", cantidad de location: " + IntCountLocation;
                    StrResponseReq =  StrResponseReq + " </br>" + StrLocations + " </br>";
                }
                if(UrlNextPage === null)
                {
                    //cuando no quedas paginas para consultar, salimos del while
                    break;
                }
            }
            //retorno la cantidad
            return StrResponseReq;
        
        } catch (error) {
            throw(error);
        }
    },
};

//exporto el controlador
module.exports = CallApiRest;