const mongoose = require('mongoose')
require('dotenv').config()
const Pokemon = require('../models/Pokemon')


async function main() {
    console.log('start')

    let dbConnection
    try {
        dbConnection = await mongoose.connect(process.env.MONGO_URI)
        console.log('DB Connected')
    } catch (error) {
        console.log('error connecting to database', error)

        await getPokemon.deletMany()
        await getPokemon()

    }
    console.log('end')
    process.exit(0)
}

async function getPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=50'

    while (url) {
        const response = await fetch(url)
        const data = await response.json()

        // const pokemonUrls = data.results.map(pokemon => pokemon.url)
        const promises = data.results.map(pokemon => {
            return processPokemon(pokemon.url)
        })

        const pokemonToSave = await Promise.all(promises)
        await Pokemon.insertMany(pokemonToSave)
        url = data.next
    }
}

async function processPokemon(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()

        return {
            pokemonId: data.id,
            name: data.name,
            image: data.sprites.front_default,
            height: data.height,
            weight: data.weight
        }

    } catch (error) {
        console.log('error processing pokemon', error)
    }
}

main()