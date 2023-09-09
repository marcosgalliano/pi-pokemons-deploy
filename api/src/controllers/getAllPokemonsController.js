const axios = require("axios");
const cleanArray = require("../globalFunctions/cleanArray");
const { Pokemon, Type } = require("../db");

const getAllPokemons = async () => {
  const URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100";
  // hacemos la request a la api
  try {
    const pokemonApiResponse = await axios.get(URL);
    const pokemonApiResults = pokemonApiResponse.data.results;

    const pokemonInfoPromises = [];

    for (const result of pokemonApiResults) {
      pokemonInfoPromises.push(axios.get(result.url));
    }

    // guardamos en una variable la respuesta a todas las promesas de pokemonInfoPromises
    const pokemonInfoResponses = await Promise.all(pokemonInfoPromises);

    // recorremos el array con toda la info de los pokemons
    const pokemonInfoData = pokemonInfoResponses.map(
      (response) => response.data
    );

    //limpiamos el array para quedarnos con los datos que necesitamos
    // y ahorrar espacio
    const cleanedApiInfo = cleanArray(pokemonInfoData);

    // buscamos los pokemons creados por el usuario
    // con los atributos que deseemos
    const userPokemons = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    // juntamos los dos arrays de pokemons (api y BDD)
    let allPokemons = cleanedApiInfo.concat(userPokemons);

    return allPokemons;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = getAllPokemons;
