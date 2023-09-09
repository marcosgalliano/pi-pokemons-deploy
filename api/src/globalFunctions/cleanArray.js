// funcion para limpiar el array de pokemons y recibir los datos que necesitamos

const cleanArray = (arr) => {
  const clean = arr.map((elem) => {
    const sprites = elem.sprites;
    // si una imagen es null buscamos la otra
    const image =
      sprites.other.home.front_default !== null
        ? sprites.other.home.front_default
        : sprites.other["official-artwork"].front_default;

    const types = elem.types.map((typeObj) => typeObj.type.name);

    return {
      id: elem.id,
      name: elem.name,
      speed: elem.stats.find((stat) => stat.stat.name === "speed").base_stat,
      defense: elem.stats.find((stat) => stat.stat.name === "defense")
        .base_stat,
      attack: elem.stats.find((stat) => stat.stat.name === "attack").base_stat,
      hp: elem.stats.find((stat) => stat.stat.name === "hp").base_stat,
      image: image,
      types: types,
      created: false,
    };
  });
  return clean;
};

module.exports = cleanArray;
