const express = require('express');
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan")
const methodOverride = require('method-override')

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);
const Player = require("./models/player.js");

const connect = async() => {
    await mongoose.connect(process.env.MONGODB_URI)
}


app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));

app.post('/players', async (req,res)=> {
    if(req.body.canShoot === "on"){
        req.body.canShoot = true
    } else {
        req.body.canShoot = false
    }
    const createdPlayer = await Player.create(req.body)
    res.redirect('/players')
})


app.delete('/players/:playerId', async (req,res)=>{
    const foundPlayer = await Player.findByIdAndDelete(req.params.playerId)
    res.redirect('/players')
})


app.get('/players', async (req,res)=> {
    const foundPlayers = await Player.find()
    res.render('players/index.ejs', 
    { players: foundPlayers})
})


app.get('/', (req,res)=> {
    res.render('index.ejs')
})

app.get('/players/new', (req,res)=> {
    res.render('players/new.ejs')
})

app.get('/players/:playerId/edit', async (req,res)=>{
    const foundPlayer = await Player.findById(req.params.playerId)
    res.render('players/edit.ejs', {
        player: foundPlayer
    })
})


app.put('/players/:playerId', async (req,res)=>{
    if(req.body.canShoot === 'on'){
        req.body.canShoot = true
    } else {
        req.body.canShoot = false
    }
    await Player.findByIdAndUpdate(req.params.playerId, req.body)
    res.redirect('/players')
})

app.get('/players/:playerId', async (req,res)=> {
    const foundPlayer = await Player.findById(req.params.playerId)
    res.render("players/show.ejs", {
        player: foundPlayer
    })
})

app.listen(3000, () =>{
    console.log("Running on the Server!")
})