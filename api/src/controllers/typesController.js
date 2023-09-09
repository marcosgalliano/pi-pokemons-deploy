const axios = require("axios");
const { Type } = require("../db");

const searchTypes = async () => {
  // Realizar la solicitud a la API para obtener la información de los tipos
  const response = await axios.get("https://pokeapi.co/api/v2/type");
  const typesData = response.data.results;

  const uniqueTypeNames = new Set(); // Usamos un Set para almacenar nombres únicos

  // Iterar sobre los datos de los tipos y extraer los nombres
  for (const typeData of typesData) {
    uniqueTypeNames.add(typeData.name);
  }

  const savedTypes = [];

  // Verificar si los tipos ya existen en la base de datos
  for (const typeName of uniqueTypeNames) {
    const existingType = await Type.findOne({ where: { name: typeName } });

    if (existingType) {
      // Si el tipo ya existe, lo agregamos a la lista de tipos guardados
      savedTypes.push(existingType);
    } else {
      // Si el tipo no existe, lo creamos y luego lo agregamos a la lista de tipos guardados
      const newType = await Type.create({ name: typeName });
      savedTypes.push(newType);
    }
  }

  return savedTypes;
};

module.exports = searchTypes;
