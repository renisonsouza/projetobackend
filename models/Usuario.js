const { DataTypes } = require("sequelize");
const sequelize = require("../banco/bd");

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

    Model: UsuarioModel
};
