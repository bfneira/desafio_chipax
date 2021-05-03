const express = require('express');
const router = express.Router();
//Referencia controlador
const GetAllController = require("../controller/controllerdesafio");
//Llamada y su controlador
router.get("/", GetAllController.getdesafio2);

//Exporto la ruta
module.exports = router;