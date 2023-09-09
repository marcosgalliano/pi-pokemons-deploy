const createNewPokemon = require("../controllers/createNewPokemeonController");

const postPokemon = async (req, res) => {
  const { name, image, attack, defense, hp, types } = req.body;
  try {
    // llamamos al controller para crear el pokemon
    const createPokemon = await createNewPokemon({
      name,
      image,
      attack,
      defense,
      hp,
      types,
    });
    res.status(200).json(createPokemon);
  } catch (error) {
    // si hay un error lo catcheamos y los devolvemos
    res.status(404).json({ error: error.message });
  }
};

module.exports = postPokemon;
