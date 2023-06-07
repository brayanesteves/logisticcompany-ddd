const { Sequelize } = require('sequelize');

const sequelize_pg = new Sequelize('mipss_', 'root', 'root', {
    host:'localhost',
    dialect:'postgres'
});

module.exports = { sequelize_pg };