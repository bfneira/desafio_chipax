const fnc = require('../function/function');
const config = require('../config/config.js');
const controller_callrequest = require("../controller/callrequest");

const GetAllController = {
    async get(req,res) {
        //hora inicio 
        console.log(Date(Date.now()).toString());

        var response = "";
        var intCount = "";
        let TypeCall = ['Location','Episode','Character'];
        let charSearch = ['I','E','C'];

        for (var i = 0; i < TypeCall.length; i++) 
        {
            intCount = await controller_callrequest.get(TypeCall[i],charSearch[i],res);
            response += "La letra " + charSearch[i] + " esta " + intCount + " en las " + TypeCall[i] + ". </br>";
        }

        //hora fin
        console.log(Date(Date.now()).toString());
        res.send(response);
    },
};

module.exports = GetAllController;