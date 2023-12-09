const express = require('express');
const app = express();
const PORT = 3000;
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const swaggerDocument = require(path.resolve(__dirname, '', 'swagger-output.json'));
require('dotenv').config();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const InstallAPI = require('./control/InstallAPI');
const usuarioAPI = require('./control/usuarioAPI');
const vinhoAPI = require('./control/vinhoAPI');

app.use("/install", InstallAPI);
app.use("/login", usuarioAPI);
app.use("/cadastro", usuarioAPI);
app.use("/alterar-dados", usuarioAPI);
app.use("/criar-admin", usuarioAPI);
app.use("/lista-usuario", usuarioAPI);
app.use("/:id", usuarioAPI);
app.use("/delete/:id", usuarioAPI);
app.use("/update/:id", usuarioAPI);

app.use('/listar-vinhos', vinhoAPI);
app.use('/buscar-vinho/:id', vinhoAPI);
app.use('/criar-vinho', vinhoAPI);
app.use('/atualizar-vinho/:id', vinhoAPI);
app.use('/excluir-vinho/:id', vinhoAPI);
app.use('/filtrar-vinhos', vinhoAPI);

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
