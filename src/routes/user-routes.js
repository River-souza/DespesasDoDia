const express = require('express');
const users = require('../controllers/users');
const middleware = require('../middlewares/users-middleware');
const authenticateUser = require('../middlewares/authenticate-user');
const routes = express.Router();

//endpoints users - homepage
routes.post('/usuario', middleware.emailCheckUnique, middleware.requiredFieldsPassName, users.cadastrarUsuario);
routes.post('/login', middleware.requiredFieldsEmailPass, users.loginUsuario);

//Este middleware verifica o token para as rotas abaixo.
routes.use(authenticateUser);

//endpoint users - panel users (generic token required)
routes.get('/usuario', users.detalharUsuario);
routes.put('/usuario', middleware.emailCheckUnique, middleware.requiredFieldsPassName, users.atualizarUsuario);

//endpoint users - panel adms (specific token required)
/*routes.get('/adm/usuario', users.listarUsuarios);
routes.delete('/adm/usuario/:id', users.excluirUsuario);*/

module.exports = {

    routes
    
};