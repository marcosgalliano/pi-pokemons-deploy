const { Pokemon } = require("../db"); // llamamos al modelo pokemon

const createNewPokemon = async (data) => {
  const { name, image, attack, defense, hp, types } = data;

  // creamos el pokemon con sus respectivos datos
  const newPokemon = await Pokemon.create({ name, image, attack, defense, hp });

  // le agregamos al nuevo pokemon sus types
  await newPokemon.addTypes(types);

  return newPokemon;
};

module.exports = createNewPokemon;
