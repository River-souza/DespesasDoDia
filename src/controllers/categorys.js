const pool = require('../../storage/connection');

/* 
O método retorna um array de objetos referente às categorias armazenadas em registros na tabela do banco de dados.
Este array pode conter ou não informações retornadas, sendo possível apresentá-lo vazio. nome e email do usuário conectado pelo token de autenticação. 
Exige a passagem do token pelo 'headers' da requisição. 
*/
async function listarCategorias(req, res) {
    
    try {

        const { rows } = await pool.query(`select * from categorias`);

        //console.log(result.rows);
        return res.status(200).json(rows);

    } catch (error) {

        //console.log (error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor!"});

    }
}

module.exports = {

    listarCategorias
    
}