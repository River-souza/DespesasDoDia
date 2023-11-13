const pool = require('../../storage/connection');

async function emailCheckUnique(req, res, next) {

    const { email } = req.body;
    let userAuthenticated = false;

    try {

        if(req.usuario) {//E se o usuário não alterar o email, não será feita o check de email único.

            if(email === req.usuario.email) {

                //console.log('Os emails são iguais, então sem verificação!');
                userAuthenticated = true;

            } //else {

                //console.log('Os emails são diferentes, então será verificado!');

            //}
        } 
        
        if(!userAuthenticated) {

            if(!email) {

                return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.'});

            }

            const { rowCount } = await pool.query('select * from usuarios where email = $1', [email]);

            if (rowCount !== 0) {

                return res.status(400).json({ mensagem: 'Já existe um usuário cadastrado com o e-mail informado.'});

            }
        }

        next();
        //console.log('passou no check do email unico!');

    } catch (error) {

        //console.log (error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor!"});

    }
}

async function requiredFieldsPassName(req, res, next) {

    const { nome, senha } = req.body;

    try {

        if(!nome || !senha) {

            return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' });

        }

        next();

    } catch (error) {

        //console.log (error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor!" });

    }
}

async function requiredFieldsEmailPass(req, res, next) {
    
    const { email, senha } = req.body;
    
    try {
        
        if(!email || !senha) {

            return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' });

        }

        next();

    } catch (error) {

        //console.log (error.message);
        return res.status(500).json({ mensagem: "Erro interno do servidor!"});
        
    }
}

module.exports = {

    emailCheckUnique,
    requiredFieldsPassName,
    requiredFieldsEmailPass

}