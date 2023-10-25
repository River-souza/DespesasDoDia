
const db = require('../../database');

const validatorNumConta = (req, res, next) => {

    const {num_conta} = req.params;

    if(isNaN(Number(num_conta))) {
        return res.status(400).json({ mensagem: 'Número da conta é inválido!' });
    }

    next();
};

const validatorCodAdm = (req, res, next) => {

    const {cod_adm} = req.params;

    if(isNaN(Number(cod_adm))) {
        return res.status(400).json({ mensagem: 'Código está inválido!' });
    }

    next();
};

const userAuthentication = function(req, res, next) {

    const adm = db.adm;

    console.log(adm);

    const { senha_sistema } = req.query;

    if(!senha_sistema) {
        return res.status(404).json({ mensagem: 'A senha do sistema informada é inválida!'});
    }

    if(!(adm.senha === senha_sistema)) {
        return res.status(404).json({ mensagem: 'A senha do sistema informada é inválida!'});
    }

    next();
}

module.exports = {
    validatorNumConta,
    validatorCodAdm,
    userAuthentication
}