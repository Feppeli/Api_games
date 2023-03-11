const Sequelize = require('sequelize');
const connection = require('../db');

const games =  connection.define('games',{

    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.STRING,
        allowNull: false
    },
    discount:{
        type: Sequelize.STRING,
        allowNull: true
    }
})

games.sync({force: false})

module.exports = games