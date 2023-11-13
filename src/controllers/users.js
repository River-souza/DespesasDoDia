const pool = require('../../storage/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function cadastrarUsuario(req, res) {

    const { nome, email, senha } = req.body;

    try {
        const passEncrypted = await bcrypt.hash(senha, 10);

        //console.log(passEncrypted);

        const { rows } = await pool.query(
            'insert into usuarios (nome, email, senha) values ($1, $2, $3) returning id, nome, email', 
            [nome, email, passEncrypted]
            );

        return res.status(201).json(rows[0]);

    } catch (error) {

        //console.log (error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor!"});

    }
}

async function loginUsuario(req, res) {

    const { email, senha } = req.body;

    try {

        const user = await pool.query('select * from usuarios where email = $1', [email]);
            
        if (user.rowCount === 0) {

            return res.status(400).json({ mensagem: 'Usuário e/ou senha invalido(s)!'});

        }

        const verifyPass = await bcrypt.compare(senha, user.rows[0].senha);

        if (!verifyPass) {

            return res.status(400).json({ mensagem: 'Usuário e/ou senha invalido(s)!'});

        }

        //return res.status(200).json({ mensagem: "Usuário autenticado."});
        
        const token = jwt.sign(
            {id: user.rows[0].id }, 
            process.env.JWT_PASSWORD, 
            { expiresIn: '1d' }
            );

        const { senha: s, ...userLogado } = user.rows[0];

        return res.status(200).json({ usuario: userLogado, token });

    } catch (error) {

        //console.log (error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor!"});

    }
}

/*async function logoutUsuario(req, res) {

    req.usuario = {
        id: 0,
        nome: "",
        emai: ""
    }

    req.headers.authorization = "";
}*/

async function listarUsuarios(req, res) {

    try {
        const result = await pool.query('select nome, email from usuarios');
        
        //console.log(result.rows);
        return res.status(200).json(result.rows);
        
    } catch (error) {

        //console.log (error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor!"});

    }
}

async function detalharUsuario(req, res) {

    //console.log (req.usuario);
    return res.status(200).json(req.usuario);

}

async function atualizarUsuario(req, res) {

    const { nome, email, senha } = req.body;

    try {

        const passEncrypted = await bcrypt.hash(senha, 10);

        await pool.query(
            `update usuarios set nome = $1, email = $2, senha =$3 where id = $4`, 
            [nome, email, passEncrypted, req.usuario.id]
            );

        return res.status(204).send();

    } catch (error) {

        //console.log (error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor!"});

    }
}

async function excluirUsuario (req, res) {
    
    const { id } = req.params;

    if(isNaN(Number(id))) {

        return res.status(400).json({ mensagem: 'O id passado é inválido!' });

    }

    if(Number(id) === 0) {

        return res.status(400).json({ mensagem: 'O id passado é inválido!' });

    }

    try {
        
        await pool.query('delete from usuarios where id = $1', [id]);
        
        return res.status(204).send();
        
    } catch (error) {

        //console.log (error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor!"});

    }
}

module.exports = {

    cadastrarUsuario,
    loginUsuario,
    detalharUsuario,
    atualizarUsuario,
    listarUsuarios,//rotas para recursos do Adm
    excluirUsuario//rotas para recursos do Adm

}