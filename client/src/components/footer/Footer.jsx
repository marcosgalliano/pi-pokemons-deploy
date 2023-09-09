import style from "./Footer.module.css";


// FOOTER

const Footer = () => {
  return (
    <div className={style.footerDiv}>
      <h3>
        © 2023 Henry Pokemons - Todos los derechos reservados. Diseño y
        desarrollo por Henry Pokemons. Las imágenes y nombres de Pokémon son
        propiedad de Nintendo, Game Freak y The Pokémon Company. Este sitio web
        es un proyecto ficticio no tiene ninguna afiliación con Pokémon ni sus
        propietarios. ¡Atrapa 'em todos con Henry Pokemons!
      </h3>
      <h1>Henry Pokemons</h1>
    </div>
  );
};

export default Footer;
