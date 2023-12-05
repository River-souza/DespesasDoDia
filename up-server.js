const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors("http://localhost:5173/"));

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

module.exports = app;
