const pool = require('../../storage/connection');

async function existsCategory(req, res, next) {

    const { categoria_id } = req.body;

    try {

        const { rowCount } = await pool.query('select * from categorias where id = $1', [categoria_id]);

        if (rowCount === 0) {

            return res.status(404).json({ mensagem: 'Categoria não encontrada!' });

        }

        next();

    } catch (error) {

        //console.log (error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor!" });

    }
}

module.exports = {
    
    existsCategory

}
