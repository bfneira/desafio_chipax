const fnc = require('../function/function');

const CallPersonajes = {
    async getPersonajes(UrlRequest,res) {
        try
        {
            //llamada de tipo await para esperar la respuesta de la api
            let jsonResults =  await fnc.CallApiRequest(UrlRequest,res);
            //capturo la información que necesito del json response
            let StrCharacterName = jsonResults['name'];
            let StrLocationOrigin = jsonResults['origin']['name'];
            //Retorno origen personaje
            return StrLocationOrigin;   
        } catch (error) {
            res.send(error);
        }
    },
}

//exporto el controlador
module.exports = CallPersonajes;