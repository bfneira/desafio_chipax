const request = require("request");

const FncFunction = {
    //metodo asincrono para llamar a la api, recibe por parametro la url
    async CallApiRequest(url,res) {
        //defino las opciones de la solicitud GET
        var Options = 
            {
                url: url,
                method: 'GET',
                Headers: { 'Accept': 'application/json','Accept-charset': 'utf-8',}
            }
        //llamada de tipo await para esperar respuesta, se enviar la configuración de la llamada
        var Response = await call(Options);
        //retorno la respuesta
        return Response;
    }
};

//metodo asincrono
async function call(Options) 
{
    let Response = await doRequest(Options);
    //retorno respuesta
    return(Response);
}

function doRequest(url) 
{
    //promesa
    return new Promise(function (resolve, reject) 
        {
            //llamada request
            request(url, function (error, res, body) 
            {
                //sin errores y una respuesta con codigo 200
                if (!error && res.statusCode == 200) 
                {
                    //retorno respuesta
                    resolve(body);
                } else {
                    //retorno error
                    reject(error);
                }
            });
        });
}

//exporto función
module.exports = FncFunction;