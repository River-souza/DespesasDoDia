const pool = require("../../storage/connection");

async function listarUsuarios(req, res) {
  try {
    const result = await pool.query("select nome, email from usuarios");

    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
}

async function excluirUsuario(req, res) {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({ mensagem: "O id passado é inválido!" });
  }

  if (Number(id) === 0) {
    return res.status(400).json({ mensagem: "O id passado é inválido!" });
  }

  try {
    await pool.query("delete from usuarios where id = $1", [id]);

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor!" });
  }
}

module.exports = {
  listarUsuarios,
  excluirUsuario,
};
