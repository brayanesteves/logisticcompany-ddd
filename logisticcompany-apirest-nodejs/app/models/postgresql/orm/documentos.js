const { DataTypes }    = require('sequelize');
const { sequelize_pg } = require('../../../../config/postgresql/sequalize-pg');

const documentos = sequelize_pg.define('documentos', {
    documentoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    identidad: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true
});

module.exports = { documentos };