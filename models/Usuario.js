const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/bd");

const UsuarioModel = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

const bcrypt = require("bcrypt");

UsuarioModel.autenticar = async function (usuario, senha) {
    const usuarioAutenticado = await this.findOne({
        where: {
            usuario,
        }
    });

    if (!usuarioAutenticado) {
        return null; 
    }

    const senhaCorreta = await bcrypt.compare(senha, usuarioAutenticado.senha);

    if (senhaCorreta) {
        return usuarioAutenticado;
    } else {
        return null;
    }
};


module.exports = {
    list: async function () {
        const usuarios = await UsuarioModel.findAll();
        return usuarios;
    },

    save: async function (nome, usuario, senha) {
        const usuarioCriado = await UsuarioModel.create({
            nome,
            usuario,
            senha
        });

        return usuarioCriado;
    },

    update: async function (id, nome, usuario, senha, isAdmin) {
        await UsuarioModel.update({
            nome,
            usuario,
            senha,
            isAdmin
        }, {
            where: { id }
        });

        return await UsuarioModel.findByPk(id);
    },

    delete: async function (id) {
        return await UsuarioModel.destroy({ where: { id } });
    },

    getById: async function (id) {
        return await UsuarioModel.findByPk(id);
    },

    getByUsuario: async function (usuario) {
        return await UsuarioModel.findOne({ where: { usuario } });
    },

    autenticar: UsuarioModel.auth,
    Model: UsuarioModel
};
