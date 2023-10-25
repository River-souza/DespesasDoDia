const app = require('./up-server');

const middleware = require('./middlewares/native-middleware');

middleware.middlewareJson(app);

//a cada requisição solicitada o terminal apresenta a hora atual
app.all("*", (req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

const routesAccount = require('./routes/account-routes');

app.use(routesAccount);