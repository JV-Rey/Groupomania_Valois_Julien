const {Sequelize} = require('sequelize');

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mariadb',
    host: 'mysql-valois.alwaysdata.net',
    //logging: true,//passer a true pour voir les différentes requêtes effectuées par l'ORM
});