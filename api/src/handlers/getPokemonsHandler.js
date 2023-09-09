const getPokemons = require("../controllers/getAllPokemonsController");

const getPokemonsHandler = async (req, res) => {
  // buscamos si hay un name en la query y designamos una
  // varibale para el endpoint de la api
  const { name } = req.query;
  try {
    const allPokemons = await getPokemons();

    // si existe un name en la query, no devolvemos todos los pokemons
    // sino aquellos que coincidan con el nombre recibido
    if (name) {
      const filteredResults = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase() == name.toLowerCase()
      );
      res.status(200).json(filteredResults);
    } else {
      res.status(200).json(allPokemons);
    }
  } catch (error) {
    // si hay un error lo catcheamos y los devolvemos
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPokemonsHandler;
