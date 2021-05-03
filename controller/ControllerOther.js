const fnc = require('../function/function');

const CallPersonajes = {
    async getLocation(UrlRequest,res) {
        try
        {
            //Llamada de tipo sincrono para esperar la respuesta de la API
            let jsonResults =  await fnc.CallApiRequest(UrlRequest,res);
            //Capturo la información que necesito del json
            let StrCharacterName = jsonResults['name'];
            let StrLocationOrigin = jsonResults['origin']['name'];
            //Retorno origen personaje
            return StrLocationOrigin;   
        } catch (error) {
            res.send(error);
        }
    },
}

//Exporto el controlador
module.exports = CallPersonajes;