const { Op } = require("sequelize");
const express = require("express");
const sequelize = require("../helpers/bd");
const VinhoModel = require("../models/vinho");  

const router = express.Router();

router.get('/vinhos/filtrar', async (req, res) => {
    try {
        const { ano, produtor, nome } = req.query;

        const filtro = {};

        if (ano) {
            filtro.ano = { [Op.eq]: ano };
        }

        if (produtor) {
            filtro.produtor = { [Op.eq]: produtor };
        }

        if (nome) {
            filtro.nome = { [Op.like]: `%${nome}%` };
        }

        const vinhosFiltrados = await VinhoModel.findAll({
            where: filtro
        });

        res.json(vinhosFiltrados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

module.exports = router;
