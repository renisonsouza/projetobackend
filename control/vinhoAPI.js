const express = require("express");
const VinhoModel = require("../models/vinho");
const verificarToken = require("../helpers/verificarToken");
const { Op } = require("sequelize");

const router = express.Router();

router.use(verificarToken);

router.get("/listar-vinhos", async (req, res) => {
    try {
        const { limite = 10, pagina = 1 } = req.query;

        const vinhosPaginados = await VinhoModel.list(parseInt(limite), parseInt(pagina));

        res.json(vinhosPaginados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao listar vinhos" });
    }
});

router.get("/buscar-vinho/:id", async (req, res) => {
    try {
        const vinho = await VinhoModel.getById(req.params.id);

        if (!vinho) {
            res.status(404).json({ error: "Vinho não encontrado" });
        } else {
            res.json(vinho);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar o vinho" });
    }
});

router.post("/criar-vinho", async (req, res) => {
    const { nome, ano, produtor } = req.body;
    const usuarioId = req.usuario.id;

    try {
        const novoVinho = await VinhoModel.save(nome, ano, produtor, usuarioId);
        res.status(201).json(novoVinho);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

router.put("/atualizar-vinho/:id", async (req, res) => {
    const { nome, ano, produtor } = req.body;
    const usuarioId = req.usuario.id;

    try {
        const vinhoAtualizado = await VinhoModel.update(req.params.id, nome, ano, produtor, usuarioId);
        res.json(vinhoAtualizado);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

router.delete("/excluir-vinho/:id", async (req, res) => {
    const usuarioId = req.usuario.id;

    try {
        const resultado = await VinhoModel.delete(req.params.id, usuarioId);
        res.json(resultado);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

router.get("/filtrar-vinhos", async (req, res) => {
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
