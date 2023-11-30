const express = require("express");
const router = express.Router();
const sequelize = require("../banco/bd");

const VinhoModel = require('../models/vinho');
const UsuarioModel = require('../models/usuario');

router.get('/', async (req, res) => {
    await sequelize.sync({ force: true });

    let produtores = [
        "Produtor 1", "Produtor 2", "Produtor 3", "Produtor 4", "Produtor 5"
    ];
    let vetProdutores = [];
    for (let i = 0; i < produtores.length; i++) {
        vetProdutores.push(await VinhoModel.save(produtores[i]));
    }

    let vinho1 = await VinhoModel.save("Vinho 1", 2020, vetProdutores[0].codigo);
    let vinho2 = await VinhoModel.save("Vinho 2", 2019, vetProdutores[1].codigo);
    let vinho3 = await VinhoModel.save("Vinho 3", 2018, vetProdutores[2].codigo);

    let vetVinhos = [vinho1, vinho2, vinho3];

    let usuario1 = await UsuarioModel.save("Nome1", "Usuario1", "senha1");
    let usuario2 = await UsuarioModel.save("Nome2", "Usuario2", "senha2");
    let usuario3 = await UsuarioModel.save("Nome3", "Usuario3", "senha3");

    let vetUsuarios = [usuario1, usuario2, usuario3];

    res.json({ status: true, produtores: vetProdutores, vinhos: vetVinhos, usuarios: vetUsuarios });
});

module.exports = router;