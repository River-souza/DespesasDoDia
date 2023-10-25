const express = require('express');

const app = express();

app.use(express.json());//middleware nativo do express que só aceita informações no formato json

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000.');    
});

module.exports = app;