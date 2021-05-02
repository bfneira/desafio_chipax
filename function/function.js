
const FncFunction = {
    //metodo asincrono para llamar a la api, recibe por parametro la url
    async CallApiRequest(url,res) {
        try
        {
            //defino las opciones de la solicitud GET
            var Options = 
                {
                    url: url,
                    method: 'GET',
                    Headers: { 'Accept': 'application/json','Accept-charset': 'utf-8',},
                    pool: {maxSockets: 400}
                }
            //llamada de tipo await para esperar respuesta, se enviar la configuración de la llamada
            var Response = await call(Options);
            //retorno la respuesta
            res.status(200);
            return JSON.parse(Response);
        } catch (error) {
            throw(error);
        }
    },
    async ContarCaracteres(Valor, CharSearch, res) {
        var IntCount = 0;
        //todos los caracteres en mayuscula
        var StrValor = Valor.toUpperCase();
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
        return IntCount;
    },
    async CalcularTiempo(DtaInicio,DtaFin){
        var timeDiff = Math.round((DtaFin-DtaInicio)/ 1000);
        var result = 0;
        if(timeDiff<60)
        {
            result = timeDiff + " segundos";
        }
        else
        {
            var seconds = Math.round(timeDiff % 60);
            timeDiff = Math.floor(timeDiff / 60);
            var minutes = Math.round(timeDiff % 60);
            result = minutes + " minutos " + seconds + " segundos";
        }
        return result;
    },
};

//metodo asincrono
async function call(Options) 
{
    try
    {
        let Response = await doRequest(Options);
        //retorno respuesta
        return(Response);
    } catch (error) {
        throw(error);
    }
}

function doRequest(url) 
{
    try
    {
        //promesa
        return new Promise(function (resolve, reject) 
            {
                const request = require("request");
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
    } catch (error) {
        throw(error);
    }
}

//exporto función
module.exports = FncFunction;