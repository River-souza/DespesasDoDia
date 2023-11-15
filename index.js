require('dotenv').config();

const app = require('./up-server');

/*
A cada requisição solicitada pelo usuário o terminal apresenta a data e hora atual.
*/
app.all("*", (req, res, next) => {

    console.log('Nova requisição...\n', new Date(Date.now()));
    
    next();

});

const routesUser = require('./src/routes/user-routes');

const routesCategory = require('./src/routes/category-routes');

const routesTransaction = require('./src/routes/transaction-routes');

app.use(routesUser.routes);
app.use(routesCategory.routes);
app.use(routesTransaction.routes);
