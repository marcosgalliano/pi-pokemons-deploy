const findPokemmonById = require("../controllers/foundPokemonByIdController")


// handler para recibir el pokemon por id
const getPokemonById = async (req, res) => {
  const { idPokemon } = req.params;

  try {
    // llamamos la funcion para encontrar el pokeon
    const foundPokemon = await findPokemmonById(idPokemon);
    res.status(200).json(foundPokemon);
  } catch (error) {
    // si hay un error lo catcheamos y los devolvemos
    res.status(500).json({ error: error.message });
  }
};

module.exports = getPokemonById;
