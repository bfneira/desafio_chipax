const express = require('express');
const router = express.Router();
//referencia controlador
const GetAllController = require("../controller/controllerdesafio");
//llamada y su controlador
router.get("/", GetAllController.get);

//exporto la ruta
module.exports = router;