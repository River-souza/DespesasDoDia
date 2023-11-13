const pool = require('../../storage/connection');
const jwt = require('jsonwebtoken');

async function verifyToken(req, res, next) {
    
    const { authorization } = req.headers;

    //console.log(authorization);

    if (!authorization) {

        return res.status(401).json({ mensagem: 'Usuário não autorizado!'});

    }

    const token = authorization.split(' ')[1];

    //console.log(token);

    if (!token) {

        return res.status(401).json({ mensagem: 'Para acessar a este recurso, um token de autenticação válido deve ser emitido.'});

    }

    try {

        //console.log(jwt.verify(token, passSecurity));

        const { id } = jwt.verify(token, process.env.JWT_PASSWORD);

        const { rows, rowCount } = await pool.query('select * from usuarios where id = $1', [id]);

        if (rowCount === 0) {
            return res.status(401).json({ mensagem: 'Para acessar a este recurso, um token de autenticação válido deve ser emitido.'});
        }
        
        const {  senha: password, ...userAuthenticated } = rows[0];

        req.usuario = userAuthenticated;

        //console.log("usuário autenticado.")

        next();

    } catch (error) {

        //console.log (error.message);
        return res.status(401).json({ mensagem: 'Para acessar a este recurso, um token de autenticação válido deve ser emitido.'});
        
    }
}

module.exports = verifyToken;