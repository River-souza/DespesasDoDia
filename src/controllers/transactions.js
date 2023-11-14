const pool = require('../../storage/connection');

async function listarTransacoes(req, res) {

    const { id } = req.usuario;
    const { filtro } = req.query;

    let r = [];
    let rCount = 0;

    try {

        if (filtro) {

            for (let categoria of filtro) {

                const { rows, rowCount } = await pool.query(`
                select 
                    t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_name 
                from transacoes 
                    t join categorias c on t.categoria_id = c.id 
                where 
                    c.descricao ilike $1 and t.usuario_id = $2`, 
                [categoria, id]);

                
                if(rowCount) {

                    rows.forEach((row) => {

                        r.push({
                            id: row.id, 
                            tipo: row.tipo, 
                            descricao: row.descricao, 
                            valor: row.valor, 
                            data: row.data, 
                            usuario_id: row.usuario_id, 
                            categoria_name: row.categoria_name 
                        });
     
                        rCount++;
                    });
                    
               } else {

                /*r.push({
                    mensagem: `Categoria '${categoria}' passado como filtro não foi encontrada!`
                });*/

               }
            }
        } else {

            const { rows, rowCount } = await pool.query(`
                select 
                    t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_name 
                from transacoes 
                    t join categorias c on t.categoria_id = c.id 
                where 
                    t.usuario_id = $1`, 
                [id]);
    
            r = rows;
            rCount = rowCount;
    
        }
    
        if (rCount === 0) {

            return res.status(200).json([]);

        }
        
        return res.status(200).json(r);

    } catch (error) {

        console.log (error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor!"});

    }
}

async function cadastrarTransacao(req, res) {

    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { id } = req.usuario;

    try {
        
        const { rows } = await pool.query(
            `insert into transacoes 
                (descricao, valor, data, categoria_id, usuario_id, tipo) 
            values
                ($1,$2,$3,$4,$5,$6) 
            returning *`, 
            [descricao, valor, data, categoria_id, id, tipo]);

        req.params.id = rows[0].id;

        detalharTransacao(req, res);

    } catch (error) {

        //console.log (error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor!"});

    }
}

async function detalharTransacao(req, res) {

    const { id: idTransaction } = req.params;
    const { id: idUser } = req.usuario;
 
    try {
    
        const { rows} = await pool.query(`
        select 
            t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_name 
        from transacoes 
            t join categorias c on t.categoria_id = c.id 
        where 
            t.id = $1 and t.usuario_id = $2`, 
        [idTransaction, idUser]);

        return res.status(200).json(rows);

    } catch (error) {

       //console.log (error.message);
       return res.status(500).json({ mensagem: "Erro interno do servidor!"});

   }
}

async function atualizarTransacao(req, res) {
    
    const { id: idTransaction } = req.params;
    const { id: idUser } = req.usuario;
 
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {

        await pool.query(`
        update transacoes set 
            id = $1,
            descricao = $2,
            valor = $3,
            data = $4,
            categoria_id = $5,
            usuario_id = $6,
            tipo = $7
        where 
            id = $1 and usuario_id = $6`, 
        [idTransaction, descricao, valor, data, categoria_id, idUser, tipo]);

        return res.status(204).send();

    } catch(error) {

        //console.log (error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor!"});

    }
}

async function excluirTransacao(req, res) {

    const { id: idTransaction } = req.params;
    const { id: idUser } = req.usuario;

    try {

        await pool.query(`
        delete 
        from transacoes 
        where 
           id = $1 and usuario_id = $2`, 
        [idTransaction, idUser]);

        return res.status(204).json();

    } catch (error) {

         //console.log (error.message);
         return res.status(500).json({ mensagem: "Erro interno do servidor!"});

    }
}

async function obterExtratoTransacoes(req, res) {

    const { id } = req.usuario;

    try {
        let somaEntrada = 0;
        let somaSaida = 0;

        const extratoEntrada = await pool.query(`
        select 
            sum(valor) 
        from transacoes 
        where 
            usuario_id = $1 and tipo = $2`, 
        [id, 'entrada']);

        if(extratoEntrada.rows[0].sum) {

            somaEntrada = extratoEntrada.rows[0].sum;

        }

        const extratoSaida = await pool.query(`
        select 
            sum(valor) 
        from transacoes 
        where 
            usuario_id = $1 and tipo = $2`, 
        [id,'saida']);
        
        if(extratoSaida.rows[0].sum) {

            somaSaida = extratoSaida.rows[0].sum;

        }

        const resultado = {

            entrada: somaEntrada,
            saida: somaSaida
            
        }

        return res.status(200).json(resultado);

    } catch (error) {

        //console.log (error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor!"});

    }
}

module.exports = {

    listarTransacoes,
    detalharTransacao,
    cadastrarTransacao,
    atualizarTransacao,
    excluirTransacao,
    obterExtratoTransacoes
    
}