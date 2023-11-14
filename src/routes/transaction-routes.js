const express = require('express');
const transactions = require('../controllers/transactions');
const middlewareTransaction = require('../middlewares/transactions-middleware');
const middlewareCategory = require('../middlewares/categorys-middleware');
const routes = express.Router();

//endpoints transactions
routes.get('/transacao', transactions.listarTransacoes);
routes.post('/transacao', middlewareTransaction.requiredFields, middlewareCategory.existsCategory, transactions.cadastrarTransacao);

routes.get('/transacao/extrato', transactions.obterExtratoTransacoes);

routes.delete('/transacao/:id', middlewareTransaction.checkIdTransaction, middlewareTransaction.existsTransactionsUserLogged, transactions.excluirTransacao);
routes.get('/transacao/:id',  middlewareTransaction.checkIdTransaction, middlewareTransaction.existsTransactionsUserLogged, transactions.detalharTransacao);
routes.put('/transacao/:id',  middlewareTransaction.checkIdTransaction, middlewareTransaction.requiredFields, middlewareCategory.existsCategory, middlewareTransaction.existsTransactionsUserLogged, transactions.atualizarTransacao);

module.exports = {
    
    routes

};
