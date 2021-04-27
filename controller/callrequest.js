const fnc = require('../function/function');
const config = require('../config/config.js');

const CallApiRest = {
    //metodo asincrono, recibe el tipo de llamada, caracter que debe buscar
    async get(Type,CharSearch,res) {
        let url = "";
        //case para determinar la url del request
        switch (Type) {
            case "Location": url = config.ApiUrlLocation;
            case "Episode": url = config.ApiUrlEpisode;
            case "Character": url = config.ApiUrlCharacter;
        }
        //la primera vez UrlNextPage es la url por defecto
        let UrlNextPage = url;
        let IntCount = 0;
        while(true)
        {
            //llamada de tipo await para esperar la respuesta de la api
            var Response = await fnc.CallApiRequest(UrlNextPage,res);
            //convierto la respuesta a JSON
            let json = JSON.parse(Response);
            //capturo la información que necesito del json response
            var JsonInfo = json['info'];
            UrlNextPage = JsonInfo['next'];
            let UrlPrevPage = JsonInfo['prev'];
            var JsonResults= json['results'];
            //recorro el json results donde esta el array con la respuesta
            for(let IndexB in JsonResults)
            {
                //capturo el valor de name 
                var StrValor = JsonResults[IndexB]['name'];
                //todos los caracteres en mayuscula
                StrValor = StrValor.toUpperCase();
                //elimino espacios
                StrValor = StrValor.replace(/ /gi, "");
                for (var i = 0; i< StrValor.length; i++) {
                    //recorro los caracteres
                    var StrChar = StrValor.charAt(i);
                    //busco la letra buscada
                    if( StrChar == CharSearch) {
                        IntCount ++; //aumento contador
                     }  
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
    },
};

//exporto el controlador
module.exports = CallApiRest;