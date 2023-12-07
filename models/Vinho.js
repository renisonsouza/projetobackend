const { DataTypes, Op } = require("sequelize");
const sequelize = require("../helpers/bd");

const VinhoModel = sequelize.define('Vinho', {
    codigo: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ano: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            isInt: true,
            min: 1900,
            max: new Date().getFullYear()
        }
    },
    produtor: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = {
    
    list: async function (limite = 10, pagina = 1) {
        const offset = (pagina - 1) * limite;
        const vinhos = await VinhoModel.findAll({
            limit: limite,
            offset: offset
        });
        return vinhos;
    },

    save: async function (nome, ano, produtor, usuarioId) {
        if (!usuarioId) {
            throw new Error("Usuário não autenticado.");
        }

        if (!nome || nome.trim() === '') {
            throw new Error("Nome do vinho é obrigatório.");
        }


        const vinho = await VinhoModel.create({
            nome,
            ano,
            produtor,
            UsuarioId: usuarioId
        });

        return vinho;
    },

    update: async function (id, nome, ano, produtor, usuarioId) {
        if (!usuarioId) {
            throw new Error("Usuário não autenticado.");
        }

        const vinhoExistente = await VinhoModel.findByPk(id);

        if (!vinhoExistente) {
            throw new Error("Vinho não encontrado.");
        }

        if (vinhoExistente.UsuarioId !== usuarioId) {
            throw new Error("Você não tem permissão para editar este vinho.");
        }


        await VinhoModel.update({
            nome,
            ano,
            produtor
        }, {
            where: { codigo: id }
        });

        return await VinhoModel.findByPk(id);
    },

    delete: async function (id, usuarioId) {
        if (!usuarioId) {
            throw new Error("Usuário não autenticado.");
        }

        const vinhoExistente = await VinhoModel.findByPk(id);

        if (!vinhoExistente) {
            throw new Error("Vinho não encontrado.");
        }

        if (vinhoExistente.UsuarioId !== usuarioId) {
            throw new Error("Você não tem permissão para excluir este vinho.");
        }

        return await VinhoModel.destroy({ where: { codigo: id } });
    },

    getById: async function (id) {
        return await VinhoModel.findByPk(id);
    },

    getByName: async function (nome) {
        return await VinhoModel.findOne({
            where: {
                nome: {
                    [Op.like]: `%${nome}%`
                }
            }
        });
    },

    Model: VinhoModel
};