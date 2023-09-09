const searchTypes = require("../controllers/typesController");

const getTypes = async (req, res) => {
  try {
    // llamamos a la funcion para buscar y guardar todos los types
    const types = await searchTypes();
    res.status(200).json(types);
  } catch (error) {
    // si hay un error lo catcheamos y los devolvemos
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getTypes;
