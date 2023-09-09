const { Router } = require("express");
const getPokemons = require("../../handlers/getPokemonsHandler");
const getPokemonById = require("../../handlers/getPokemonByIdHandler");
const postPokemon = require("../../handlers/postPokemonHandler");

const pokemonsRouter = Router();


//separamos las routes de los pokemons
pokemonsRouter.get("/", getPokemons);

pokemonsRouter.post("/", postPokemon);

pokemonsRouter.get("/:idPokemon", getPokemonById);

module.exports = pokemonsRouter;
