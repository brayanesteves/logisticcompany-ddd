const { DataTypes }    = require('sequelize');
const { sequelize_pg } = require('../../../../config/postgresql/sequalize-pg');
const { documentos }   = require('./documentos');

const paciente = sequelize_pg.define('paciente', {
    patientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id: {
        type: DataTypes.STRING
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

/**
 * Relation
 */
/*paciente.hasMany(documentos, {
    foreignKey: 'id',
    sourceKey: 'identidad'
});

documentos.belongsTo(paciente, {
    foreignKey: 'id',
    targetId: 'identidad'
});*/

module.exports = { paciente };