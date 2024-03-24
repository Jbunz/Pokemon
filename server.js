const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const pokemonController = require('./controllers/pokemon')

const app = express()
app.use('/pokemon', pokemonController)

// db connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT

app.listen(PORT, console.log(`listening on port ${PORT}`))