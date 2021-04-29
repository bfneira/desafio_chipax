# Rick and Morty Challenge

Aplicación desarrollada en `nodejs` que consta de 2 desafios.

## Usa la API de Rick and Morty para probar tus habilidades 🥼

Tienes que consultar todos los `character`, `locations` y `episodes` de [https://rickandmortyapi.com/](https://rickandmortyapi.com/) e indicar:

1. Char counter:
    - cuántas veces aparece la letra **"l"** (case insensitive) en los nombres de todos los `location`
    - cuántas veces aparece la letra **"e"** (case insensitive) en los nombres de todos los `episode`
    - cuántas veces aparece la letra **"c"** (case insensitive) en los nombres de todos los `character`
    - cuánto tardó el programa 👆 en total (desde inicio ejecución hasta entrega de resultados)
2. Episode locations:
    - para cada `episode`, indicar la cantidad y un listado con las `location` (`origin`) de todos los `character` que aparecieron en ese `episode` (sin repetir)
    - cuánto tardó el programa 👆 en total (desde inicio ejecución hasta entrega de resultados)

## Antes de comenzar

Lo primero es descargar 

* Instalar [Visual Studio Code](https://code.visualstudio.com/)
* Instalar [nodejs](https://nodejs.org/es/download/)

Paquetes que se deben instalar en el proyecto: 
* express `npm install express`.
* request `npm install request`.


## Desafio 1 : Char counter

Una vez ejecutada la aplicación entrar al localhost con el puerto por defecto configurado `8080` y llamar la ejecución del primer desafio con el enlace [http://localhost:8080/primerdesafio](http://localhost:8080/primerdesafio/)

<div style="text-align: center;" >
<img src="img/desafio1.png" width=600 />
</div>

## Desafio 2: Episode locations

Una vez ejecutada la aplicación entrar al localhost con el puerto por defecto configurado `8080` y llamar la ejecución del segundo desafio con el enlace [http://localhost:8080/segundodesafio](http://localhost:8080/segundodesafio/)

<div style="text-align: center;" >
<img src="img/desafio2.png" width=600 />
</div>

## Estructura de la aplicación

1. inicio: Archivo `index.js` ubicado en la raiz.
2. routes: carpeta para definir las rutas de la aplicación, la raiz es `./routes/`
    - `routesone.js`: ruta para el desafio 1.
    - `routestwo.js`: ruta para el desafio 2.
3. controller: Carpeta para definir los controladores, la raiz es `./controller/`
    - `callrequest.js`: controlador con 2 metodos get para llamar el desafio 1 y getdesafio2 para invocar al segundo desafio.
    - `controllerdesafio.js`: controlador para invocar a los controllers antes definidos en loop segun la petición.
4. funciones: carpeta para definir las funciones de la aplicación, la raiz es `./function/`
5. configuración: carpeta para definir las configuraciones, la raiz es `./config/`, aqui defino el puerto a utilizar y las urls de los apirest que se van a consumir.