// Importar los módulos y funciones necesarios
const axios = require("axios");
const { Pokemon, Type } = require("../db"); 
const cleanArray = require("../globalFunctions/cleanArray"); 

// función para encontrar un Pokémon por su ID
const foundPokemon = async (id) => {
  const URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100"; // URL para obtener datos de Pokémon
  const pokemonApiResponse = await axios.get(URL); 
  const pokemonApiResults = pokemonApiResponse.data.results; 

  const pokemonInfoPromises = [];

  // Recorrer cada resultado de Pokémon y crear promesas para obtener más detalles
  for (const result of pokemonApiResults) {
    pokemonInfoPromises.push(axios.get(result.url));
  }

  // Resolver todas las promesas para obtener información de cada Pokémon
  const pokemonInfoResponses = await Promise.all(pokemonInfoPromises);

  // Extraer datos relevantes de las respuestas de la API
  const pokemonInfoData = pokemonInfoResponses.map(
    (response) => response.data
  );

  // Limpiar el array 
  const cleanedApiInfo = cleanArray(pokemonInfoData);

  // Encontrar el Pokémon con el ID especificado en los datos de la API limpiados
  const foundPokemonApi = cleanedApiInfo.find(
    (poke) => poke.id == id
  );

  // Verificar si el ID proporcionado no es un número
  if (isNaN(id)) {
    // Obtener datos de Pokémon desde la base de datos local, incluidos los tipos asociados
    const userPokemon = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    // Encontrar el Pokémon en la base de datos local según el ID
    const BDDpokemonFound = userPokemon.find((poke) => poke.id == id);

    // Si no se encuentra el Pokémon en la base de datos local, lanzar un error
    if (BDDpokemonFound == undefined) {
      throw new Error("no se encontro el id de la bdd");
    }

    // Devolver el Pokémon encontrado de la base de datos local
    return BDDpokemonFound;
  }

  // Si no se encuentra el Pokémon con el ID especificado en los datos de la API, lanzar un error
  if (foundPokemonApi == undefined) {
    throw new Error("no se encontro el id");
  }

  // Devolver el Pokémon encontrado de los datos de la API
  return foundPokemonApi;
};

// Exportar la función para que se pueda usar en otros módulos
module.exports = foundPokemon;



