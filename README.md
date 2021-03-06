# Rick and Morty Challenge

Aplicaci贸n desarrollada en `nodejs` que consta de 2 desaf铆os.

## Usa la API de Rick and Morty para probar tus habilidades 馃ゼ

Tienes que consultar todos los `character`, `locations` y `episodes` de [https://rickandmortyapi.com/](https://rickandmortyapi.com/) e indicar:

1. Char counter:
    - cu谩ntas veces aparece la letra **"l"** (case insensitive) en los nombres de todos los `location`
    - cu谩ntas veces aparece la letra **"e"** (case insensitive) en los nombres de todos los `episode`
    - cu谩ntas veces aparece la letra **"c"** (case insensitive) en los nombres de todos los `character`
    - cu谩nto tard贸 el programa 馃憜 en total (desde inicio ejecuci贸n hasta entrega de resultados)
2. Episode locations:
    - para cada `episode`, indicar la cantidad y un listado con las `location` (`origin`) de todos los `character` que aparecieron en ese `episode` (sin repetir)
    - cu谩nto tard贸 el programa 馃憜 en total (desde inicio ejecuci贸n hasta entrega de resultados)

## Antes de comenzar

Lo primero es descargar e instalar:

* [Visual Studio Code](https://code.visualstudio.com/)
* [nodejs](https://nodejs.org/es/download/)

Paquetes que se deben instalar en el proyecto: 

* express `npm install express`.
* request `npm install request`.
* jest `npm install --save-dev jest`.


## Desaf铆o 1 : Char counter

Una vez ejecutada la aplicaci贸n, desde el navegador debes ingresar al localhost con el puerto por defecto configurado `8080` y llamar la ejecuci贸n del primer desaf铆o con el enlace [http://localhost:8080/primerdesafio](http://localhost:8080/primerdesafio/)

<div style="text-align: center;" >
<img src="img/desafio1.png" width=600 />
</div>

## Desafio 2: Episode locations

Para聽entrar聽al聽segundo聽desaf铆o聽se聽debe聽llamar聽la聽ejecuci贸n聽del聽segundo聽desaf铆o聽con聽el聽enlace [http://localhost:8080/segundodesafio](http://localhost:8080/segundodesafio/)

<div style="text-align: center;" >
<img src="img/desafio2.png" width=600 />
</div>

## Estructura de la aplicaci贸n

1. Inicio: archivo `index.js` ubicado en la ra铆z.
2. Routes: carpeta para definir las rutas de la aplicaci贸n, la ra铆z es `./routes/`
    - `routesone.js`: ruta para el desaf铆o 1.
    - `routestwo.js`: ruta para el desaf铆o 2.
3. controller: carpeta para definir los controladores, la ra铆z es `./controller/`
    - `callrequest.js`: controlador con 2 m茅todos:
        - `getdesafio1`: para llamar al desaf铆o 1.
        - `getdesafio2`: para invocar al segundo desaf铆o.
        - `CantPaginas`: m茅todo para leer cantidad de p谩ginas de la llamada.
        - `CantEpisode`: m茅todo para leer la cantidad total de episodios.
    - `controllerdesafio.js`: controlador para invocar a los controllers antes definidos en loop segun la petici贸n.
4. funciones: carpeta para definir las funciones de la aplicaci贸n, la ra铆z es `./function/`
5. configuraci贸n: carpeta para definir las configuraciones, la ra铆z es `./config/`, aqu铆 defino el puerto a utilizar y las urls de las apirest que se van a consumir.
6. __ test __: carpeta con el testing de la aplicaci贸n.

## Testing

Para ejecutar las pruebas se debe llamar al comando `npm test`, mediante `jest`.

<div style="text-align: center;" >
<img src="img/test.png" width=600 />
</div>