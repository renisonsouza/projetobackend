const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const verificarToken = require("../helpers/verificarTolken");
const UsuarioDAO = require("../models/usuario");

const admPadrao = async () => {
    const adminExistente = await UsuarioDAO.getByUsuario("admin");

    if (!adminExistente) {
        const hashedSenhaAdmin = await bcrypt.hash("admin@123", 10);
        await UsuarioDAO.save("Administrador Padrão", "admin", hashedSenhaAdmin, true);
    }
};

admPadrao();

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
                "chave-secreta-do-jwt",
                { expiresIn: "1h" }
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

// Rota para listar usuários
router.get("/lista-usuario", async (req, res) => {
    try {
        const usuarios = await UsuarioDAO.listar();
        res.json(usuarios);
    } catch (err) {
        console.error(err);
        res.status(500).json("Erro ao listar os usuarios");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const usuario = await UsuarioDAO.obterPorId(req.params.id);
        res.json(usuario);
    } catch (err) {
        console.error(err);
        res.status(500).json("Usuário não encontrado");
    }
});

router.post("/criar-admin", async (req, res) => {
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

router.post("/adm-novo-usu", async (req, res) => {
    const { nome, usuario, senha } = req.body;

    try {
        const usuarioCriado = await UsuarioDAO.salvar(nome, usuario, senha);
        res.json(usuarioCriado);
    } catch (err) {
        console.error(err);
        res.status(500).json("Falha ao criar o novo usuário");
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, usuario, senha, isAdmin } = req.body;
    const obj = {};

    if (nome) obj.nome = nome;
    if (usuario) obj.usuario = usuario;
    if (senha) obj.senha = senha;
    if (isAdmin !== undefined) obj.isAdmin = isAdmin;

    if (Object.keys(obj).length === 0) {
        return res.status(500).json("Nenhuma info atualizada");
    }

    try {
        const usuarioAtualizado = await UsuarioDAO.atualizar(id, obj);
        if (usuarioAtualizado) res.json(usuarioAtualizado);
        else res.status(500).json("Usuario não encontrado");
    } catch (err) {
        console.error(err);
        res.status(500).json("Falha ao alterar o usuario");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const usuarioExcluido = await UsuarioDAO.delete(req.params.id);
        if (usuarioExcluido) res.json(usuarioExcluido);
        else res.status(500).json("Usuário não encontrado");
    } catch (err) {
        console.error(err);
        res.status(500).json("Falha ao excluir o usuário");
    }
});

module.exports = router;
