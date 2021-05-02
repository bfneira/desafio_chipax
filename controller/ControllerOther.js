const fnc = require('../function/function');
const config = require('../config/config.js');

const CallPersonajes = {
    async getPersonajes(UrlRequest,NumEpisode,StrNameEpisode,res) {
      
        let StrResponseReq = "";
        let IntCountLocation = 0;
        let StrLocations = "{";
        let StrAllLocations = "";
        let StrAllLocationsIde = "";
        
        let n = 0;
        //llamada de tipo await para esperar la respuesta de la api
        let jsonResults =  await fnc.CallApiRequest(UrlRequest,res);
            //capturo la información que necesito del json response
        let StrCharacterName = jsonResults['name'];
        let StrLocationOrigin = jsonResults['origin']['name'];
        return StrLocationOrigin;
    },
}

//exporto el controlador
module.exports = CallPersonajes;