const express = require('express');

//middleware nativo do express que só aceita informações no formato json
function middlewareJson(app) {//pede parametro para não criar nova instância
    
    app.use(express.json());

}

module.exports = {
    middlewareJson
}