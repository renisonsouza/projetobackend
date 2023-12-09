const express = require("express");
const router = express.Router();
const sequelize = require("../helpers/bd");
const VinhoModel = require('../models/vinho');
const UsuarioModel = require('../models/usuario');

router.get('/', async (req, res) => {

    await sequelize.sync({ force: true });

    let produtores = ["Vin. Elegância", "Vin. Aurora", "Vin. Harmonia", "Vin. Celestial", "Vin. Prestígio"];
    
    let vetProdutores = [];

    for (let i = 0; i < produtores.length; i++) {
        vetProdutores.push(await VinhoModel.save(produtores[i]));
    }

    let vinho1 = await VinhoModel.save("Merlot", 1987, vetProdutores[0].codigo);
    let vinho2 = await VinhoModel.save("Cabernet", 1974, vetProdutores[1].codigo);
    let vinho3 = await VinhoModel.save("Chardonnay", 1981, vetProdutores[2].codigo);
    let vinho4 = await VinhoModel.save("Malbec", 2000, vetProdutores[3].codigo);
    let vinho5 = await VinhoModel.save("Sauvignon Blanc", 2014, vetProdutores[4].codigo);
    

    let vetVinhos = [vinho1, vinho2, vinho3, vinho4, vinho5];

    let adminUsername = "admin";
    let adminPassword = "admin_senha"; 

    const adminExists = await UsuarioModel.getByUsuario(adminUsername);

    let usuario1;

    if (!adminExists) {
        usuario1 = await UsuarioModel.save("Admin", adminUsername, adminPassword, true);
    } else {
        usuario1 = adminExists;
    }

    let usuario2 = await UsuarioModel.save("Luan", "luanzera", "fsdfw");
    let usuario3 = await UsuarioModel.save("CArlos", "carlao", "fsdsa");
    let usuario4 = await UsuarioModel.save("Ana", "aninha", "sdwfd");
    let usuario5 = await UsuarioModel.save("Teobaldo", "baldin", "fdwef");

    let vetUsuarios = [usuario1, usuario2, usuario3, usuario4, usuario5];

    res.json({ status: true, produtores: vetProdutores, vinhos: vetVinhos, usuarios: vetUsuarios });
});

module.exports = router;
