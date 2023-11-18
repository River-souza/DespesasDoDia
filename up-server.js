const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());//middleware nativo do express que só aceita informações no formato json

app.use(cors('http://localhost:5173/'));//habilita acesso do frontend
//app.use(cors);

app.listen(process.env.PORT, () => {

    console.log(`Servidor rodando na porta ${process.env.PORT}`);
    
});

module.exports = app;