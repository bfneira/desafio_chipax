
const FncFunction = {
    //Método asincrono para llamar a la API, recibe por parámetro la url
    async CallApiRequest(url,res) {
        try
        {
            //Defino las opciones de la solicitud GET
            var Options = 
                {
                    url: url,
                    method: 'GET',
                    Headers: { 'Accept': 'application/json','Accept-charset': 'utf-8',},
                    pool: {maxSockets: 400}
                }
            //Llamada de tipo sincrono para esperar la respuesta, se envía la configuración de la llamada
            var Response = await call(Options);
            //Retorno la respuesta
            res.status(200);
            return JSON.parse(Response);
        } catch (error) {
            throw(error);
        }
    },
    async ContarCaracteres(Valor, CharSearch, res) {
        try
        {
            var IntCount = 0;
            //Convierte todos los caracteres en mayúscula
            var StrValor = Valor.toUpperCase();
            //Elimino los espacios
            StrValor = StrValor.replace(/ /gi, "");
            for (var i = 0; i< StrValor.length; i++) {
                //Recorro los caracteres
                var StrChar = StrValor.charAt(i);
                //Busco la letra buscada
                if( StrChar == CharSearch) {
                    IntCount ++; //aumento contador
                }  
            } 
            return IntCount;
        } catch (error) {
            throw(error);
        }
    },
};

//Método asincrono
async function call(Options) 
{
    try
    {
        let Response = await doRequest(Options);
        //Retorno respuesta
        return(Response);
    } catch (error) {
        throw(error);
    }
}

function doRequest(url) 
{
    try
    {
        //Promesa
        return new Promise(function (resolve, reject) 
            {
                const request = require("request");
                //llamada request
                request(url, function (error, res, body) 
                {
                    //Sin errores y una respuesta con código 200
                    if (!error && res.statusCode == 200) 
                    {
                        //Retorno la respuesta
                        resolve(body);
                    } else {
                        //Retorno el error
                        reject(error);
                    }
                });
            });
    } catch (error) {
        throw(error);
    }
}

//Exporto la función
module.exports = FncFunction;