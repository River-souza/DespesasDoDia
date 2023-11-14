const pool = require('../../storage/connection');

function dateValidate(data) {
    try {
        return new Date(data);
    } catch (error) {
        return null;
    }
}

async function requiredFields(req, res, next) {

    req.body.data = dateValidate(req.body.data);
    
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {
        if (!descricao || !valor || !data || !categoria_id || !tipo) {
            return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.'});
        }
        
        if (tipo !== 'entrada' && tipo !== 'saida') {
            return res.status(400).json({ mensagem: 'Informe o tipo como \'entrada\' ou \'saida\'' });
        }

        next();
    } catch (error) {
        //console.log (error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor!"});
    }
}

function checkIdTransaction(req, res, next) {

    const { id: idTransaction } = req.params;

    try {

        if(isNaN(Number(idTransaction))) {

            return res.status(400).json({ mensagem: 'O id passado é inválido!' });

        }
        
        if(Number(idTransaction) === 0) {

           return res.status(400).json({ mensagem: 'O id passado é inválido!' });

        }

        next();

    } catch (error) {
        
        //console.log (error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor!"});

    }

}

async function existsTransactionsUserLogged(req, res, next) {

    const { id: idTransaction } = req.params;
    const { id: idUser } = req.usuario;
 
    try {
        
        const { rowCount } = await pool.query(`
        select 
            * 
        from transacoes 
        where 
            id = $1 and usuario_id = $2`, 
        [idTransaction, idUser]);

        if (rowCount === 0) {

            return res.status(404).json({ mensagem: 'Transação não encontrada para o usuário logado.' });

        }

        next();

    } catch(error) {

        //console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor!"});

    }
}

module.exports = {

    checkIdTransaction,
    requiredFields,
    existsTransactionsUserLogged

}
