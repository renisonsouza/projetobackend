const express = require('express');
const app = express();
const PORT = 3000;
require('dotenv').config();


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/install", require('./control/InstallAPI'))

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
