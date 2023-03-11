const express = require('express');
const app = express();
const connection = require('./database/db')
const games = require('./database/models/games')



/* authenticate connection with db */
connection.authenticate().then(() => {
    console.log('Database connection estabilished!')
}).catch(err => {
    console.log(`Error: ${err}`)
})

app.get('/games', (req, res) => {
    games.findAll().then(games => {
        res.send(games)
    })
})

app.post('/addgame/:name/:price/:discount', (req, res) => {

    let name = req.params.name;
    let price = req.params.price;
    let discount = req.params.discount

    games.create({
        name,
        price,
        discount
    }).then(() => {
        res.redirect('/games')
    })
})

app.listen(3000, () => {
    console.log('Api rondado')
})