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


/* GET ALL */
app.get('/', (req, res) => {
    games.findAll().then(games => {
        res.send(games)
    })
})

/* ADD */
app.post('/game/:id/:title/:year/:price', (req, res) => {

    let id = req.params.id
    let title = req.params.title;
    let year = req.params.year;
    let price = req.params.price

    games.create({
        id,
        title,
        year,
        price
    }).then(() => {
        res.redirect('/')
    }).catch(err => {
        console.log(err)
        res.redirect('/')
    })
})


/* GET by Id */
app.get('/game/:id', (req, res) => {
    games.findOne({
        where: {
            id: req.params.id
        }
    }).then(game => {
        if(game != undefined){
            res.send(game)
        }else{
            res.redirect('/')
        }
    }).catch(err => {
        console.log(err)
        res.redirect('/')
    })
})


/* DELETE */
app.delete('/game/:id', (req, res) => {
    games.findOne({
        where: {
            id: req.params.id
        }
    }).then(game => {
        if(game != undefined){
            game.destroy().then(() => {
                res.redirect('/')
            })
        }else{
            res.redirect('/')
        }
    }).catch(err => {
        console.log(err)
        res.send(err)
    })
})


/* EDIT */
app.post('/game/edit/:id/:title/:year/:price', (req, res) => {
    let id = req.params.id;
    let title = req.params.title;
    let year = req.params.year;
    let price = req.params.price

    games.findOne({
        where: {
            id: req.params.id
        }
    }).then(game => {
        game.destroy().then(()=> {
            games.create({
                id, title, year, price
            }).then(() => {
                res.redirect('/')

            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
})




// REFATORAMENTO DO EDIT

/* app.put('/game/edit/:id/:title/:year/:price', (req, res) => {
    games.findOne({
        where: {
            id: req.params.id
        }
    }).then(game => {
        game.update().then(() => {
            res.redirect('/')
        })
    })
}) */

    


app.listen(3000, () => {
    console.log('Api rondado')
})