const express = require('express');
const category = require('../controllers/categorys');

const routes = express.Router();

//endpoints category
routes.get('/categoria', category.listarCategorias);

module.exports = {
    
    routes

};

