const Sequelize = require('sequelize');
const connection = require('../db');

const games =  connection.define('games',{


    id:{
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull:false,
        autoIncrement: true
    },
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    year:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.STRING,
        allowNull: true
    }
})

games.sync({force: false})

module.exports = games