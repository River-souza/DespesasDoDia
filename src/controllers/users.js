const pool = require("../../storage/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function cadastrarUsuario(req, res) {
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const result = await pool.query(
      "insert into usuarios (nome, email, senha) values ($1, $2, $3) returning id, nome, email",
      [nome, email, senhaCriptografada]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
}

async function loginUsuario(req, res) {
  const { email, senha } = req.body;

  try {
    const result = await pool.query("select * from usuarios where email = $1", [
      email,
    ]);

    if (result.rowCount === 0) {
      return res
        .status(400)
        .json({ mensagem: "Usuário e/ou senha invalido(s)!" });
    }

    const senhaValidada = await bcrypt.compare(senha, result.rows[0].senha);

    if (!senhaValidada) {
      return res
        .status(400)
        .json({ mensagem: "Usuário e/ou senha invalido(s)!" });
    }

    const token = jwt.sign(
      { id: result.rows[0].id },
      process.env.JWT_PASSWORD,
      {
        expiresIn: "1d",
      }
    );

    const { senha: _, ...userLogado } = result.rows[0];

    return res.status(200).json({ usuario: userLogado, token });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
}

async function detalharUsuario(req, res) {
  return res.status(200).json(req.usuario);
}

async function atualizarUsuario(req, res) {
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await pool.query(
      `update usuarios set nome = $1, email = $2, senha =$3 where id = $4`,
      [nome, email, senhaCriptografada, req.usuario.id]
    );

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
}

module.exports = {
  cadastrarUsuario,
  loginUsuario,
  detalharUsuario,
  atualizarUsuario,
};
