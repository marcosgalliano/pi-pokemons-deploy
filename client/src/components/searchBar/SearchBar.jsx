import style from "./SearchBar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName, setFilter } from "../../redux/actions";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [name, setName] = useState("");                               // CONSEGUIMOS MEDIANTE UN STATE EL NAME QUE SE ESTA BUSCANDO
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const updatedName = event.target.value;                           // MIENTRAS CAMBIA EL INPUT TAMBIEN LO HACE EL NAME
    setName(updatedName);

    if (updatedName.length === 0) {
      // Cambiar la propiedad filter del estado global a false
      dispatch(setFilter(false)); //                                // EN EL CASO DE QUE SE BORRE EL NAME, SETEAR EN FALSE EL FILTER
    }
  };

  const searchName = () => {
    dispatch(getPokemonByName(name));                               // FUNCION PARA HACER DISPATCH DE LA ACTION QUE CONSIGUE EL POKEMON
  };

  return (
    <div className={style.searchBarAndCreateButton}>
      <div className={style.searchBarDiv}>
        <input
          type="search"
          value={name}
          onChange={handleChange}
          placeholder="Pokemon Name"
        />
        <button className={style.button} onClick={searchName}>
          <h2>Buscar Pokemon</h2>
        </button>
      </div>
      <div className={style.crearButtonDiv}>
        <Link to="/form">
          <button>
            <h3>Crear Pokemon</h3>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
