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
            min: 1800,
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
        if (limite !== 10 || pagina < 1) {
            throw new Error("Parâmetros de paginação inválidos.");
        }

        const offset = (pagina - 1) * limite;
        const vinhos = await VinhoModel.findAndCountAll({
            limit: limite,
            offset: offset
        });

        return {
            vinhos: vinhos.rows,
            total: vinhos.count
        };
    },

    save: async function (nome, ano, produtor, usuarioId) {
       
        const vinho = await VinhoModel.create({
            nome,
            ano,
            produtor
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

        await VinhoModel.destroy({ where: { codigo: id } });

        return { mensagem: "Vinho excluído com sucesso." };
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
