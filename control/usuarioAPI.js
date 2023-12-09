    const express = require("express");
    const jwt = require("jsonwebtoken");
    const bcrypt = require("bcrypt");
    const router = express.Router();
    const verificarToken = require("../helpers/verificarToken");
    const UsuarioDAO = require("../models/usuario");

    const chaveJWT = process.env.JWT_SECRET;

    router.post("/cadastro", async (req, res) => {
        const { nome, usuario, senha } = req.body;

        try {
            const usuarioExistente = await UsuarioDAO.getByUsuario(usuario);

            if (usuarioExistente) {
                return res.status(400).json("Usuário já existe");
            }

            const hashedSenha = await bcrypt.hash(senha, 10);

            const usuarioCriado = await UsuarioDAO.save(nome, usuario, hashedSenha);
            res.json(usuarioCriado);
        } catch (err) {
            console.error(err);
            res.status(500).json("Falha ao criar o novo usuário");
        }
    });

    router.post("/login", async (req, res) => {
        const { usuario, senha } = req.body;

        try {
            const usuarioAutenticado = await UsuarioDAO.autenticar(usuario, senha);

            if (usuarioAutenticado) {
                const token = jwt.sign(
                    { usuario: usuarioAutenticado.usuario, isAdmin: usuarioAutenticado.isAdmin },
                    chaveJWT,
                    { expiresIn: "10 min" }
                );

                res.json({ token });
            } else {
                res.status(401).json("Credenciais inválidas");
            }
        } catch (err) {
            console.error(err);
            res.status(500).json("Falha ao realizar o login");
        }
    });

router.use(verificarToken);

    router.get("/lista-usuario", async (req, res) => {
        try {
            const usuarios = await UsuarioDAO.list();
            res.json(usuarios);
        } catch (err) {
            console.error(err);
            res.status(500).json("Erro ao listar os usuários");
        }
    });

    router.get("/:id", async (req, res) => {
        try {
            const usuario = await UsuarioDAO.getById(req.params.id);
            res.json(usuario);
        } catch (err) {
            console.error(err);
            res.status(500).json("Usuário não encontrado");
        }
    });

    router.post("/alterar-dados", async (req, res) => {
        const { nome, senha } = req.body;
        const userId = req.usuario.id;

        try {
            const usuario = await UsuarioDAO.getById(userId);

            if (!usuario) {
                return res.status(404).json("Usuário não encontrado");
            }

            if (nome) usuario.nome = nome;
            if (senha) usuario.senha = await bcrypt.hash(senha, 10);

            const usuarioAtualizado = await UsuarioDAO.update(userId, usuario);
            res.json(usuarioAtualizado);
        } catch (err) {
            console.error(err);
            res.status(500).json("Falha ao alterar os dados do usuário");
        }
    });

    router.post("/criar-admin", async (req, res) => {
        if (!req.usuario.isAdmin) {
            return res.status(403).json("Apenas administradores podem criar novos administradores");
        }

        const { nome, usuario, senha } = req.body;

        try {
            const hashedSenhaAdmin = await bcrypt.hash(senha, 10);
            const novoAdmin = await UsuarioDAO.save(nome, usuario, hashedSenhaAdmin, true);

            res.json(novoAdmin);
        } catch (err) {
            console.error(err);
            res.status(500).json("Falha ao criar novo administrador");
        }
    });

    router.delete("/:id", async (req, res) => {
        if (!req.usuario.isAdmin) {
            return res.status(403).json("Apenas administradores podem excluir usuários");
        }

        try {
            const usuarioExcluido = await UsuarioDAO.delete(req.params.id);
            if (usuarioExcluido) res.json(usuarioExcluido);
            else res.status(404).json("Usuário não encontrado");
        } catch (err) {
            console.error(err);
            res.status(500).json("Falha ao excluir o usuário");
        }
    });

    router.put("/:id", async (req, res) => {
        const { id } = req.params;
        const { nome, usuario, senha, isAdmin } = req.body;
        const obj = {};

        if (nome) obj.nome = nome;
        if (usuario) obj.usuario = usuario;
        if (senha) obj.senha = await bcrypt.hash(senha, 10);
        if (isAdmin !== undefined) obj.isAdmin = isAdmin;

        if (Object.keys(obj).length === 0) {
            return res.status(400).json("Nenhuma informação fornecida para atualização");
        }

        try {
            const usuarioAtualizado = await UsuarioDAO.update(id, obj);
            if (usuarioAtualizado) res.json(usuarioAtualizado);
            else res.status(404).json("Usuário não encontrado");
        } catch (err) {
            console.error(err);
            res.status(500).json("Falha ao atualizar o usuário");
        }
    });

    module.exports = router;
