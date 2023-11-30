const { DataTypes, Op } = require("sequelize");
const sequelize = require("../banco/bd");

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
        allowNull: true
    },
    produtor: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = {
    list: async function () {
        const vinhos = await VinhoModel.findAll();
        return vinhos;
    },

    save: async function (nome, ano, produtor) {
        const vinho = await VinhoModel.create({
            nome,
            ano,
            produtor
        });

        return vinho;
    },

    update: async function (id, nome, ano, produtor) {
        await VinhoModel.update({
            nome,
            ano,
            produtor
        }, {
            where: { codigo: id }
        });

        return await VinhoModel.findByPk(id);
    },

    delete: async function (id) {
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
