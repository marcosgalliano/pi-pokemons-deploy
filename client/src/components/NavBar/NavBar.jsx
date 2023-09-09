import style from "./NavBar.module.css";
import SearchBar from "../searchBar/SearchBar";
import { Link } from "react-router-dom";
import casita from "../../assets/casagod-removebg-preview.png";
import {
  toggleFilter,
  setFilteredPokemons,
  setFiltersInactive,
  setPage,
} from "../../redux/actions"; // VAMOS A USAR TODAS ESTAS ACTIONS
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const filters = useSelector((state) => state.filters); // LLAMAMOS A FILTERS PARA SETEAR SUS PROPIEDADES
  const pokemons = useSelector((state) => state.pokemons); // TODOS LOS POKEMONS
  const [valueDrop, setValueDrop] = useState(""); // VALUE DEL INPUT DE LOS TYPES
  const [activeDrop, setActiveDrop] = useState(false); // CON ESTE STATE SABEMOS SI EL CLIENTE TOCO EL BOTON PARA HACER DISPLAY DE LOS TYPES
  const [typesData, setTypesData] = useState([]); // ESTADO PARA GUARDAR TODOS LOS TYPES PARA MAPEARLOS
  const dispatch = useDispatch();

  let filteredPokes = [...pokemons]; // FILTERED POKES ES UNA COPIA DE POKEMONS

  useEffect(() => {
    // USAMOS USEEFFECT PARA CONSEGUIR LOS TYPES
    const fetchTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/types/");
        const typesArray = response.data;
        setTypesData(typesArray);
      } catch (error) {
        alert("Error al cargar los tipos de pokémon:", error);
      }
    };
    fetchTypes();
  }, []);

  // FUNCION PARA APLICAR LOS FILTROS

  const applyFilters = () => {
    let filteredAndSortedPokemon = [...filteredPokes]; // Crear una copia del arreglo

    if (filters.byType) {
      filteredAndSortedPokemon = filteredAndSortedPokemon.filter((pokemon) => {
                                                                    // ESTA ACTIVO EL FILTER DE BYTYPE? ENTONCES FILTRAMOS LOS POKEMONS QUE TIENEN EL MISMO
        if (Array.isArray(pokemon.types)) {
                                                                     // VALOR QUE EL VALUE DEL DROP
          const typeNames = pokemon.types.map((type) => {
            if (typeof type === "string") {
              return type;
            } else if (typeof type === "object" && type.name) {
              return type.name;
            }
            return null;
          });
          return typeNames.includes(valueDrop);
        }
        return false;
      });
      dispatch(setPage(0)); // SETEAMOS EL PAGE EN 0 (1) PARA NO GENERAR ERRORES
    }

    if (filters.byApi) {
      // Filtrar por la propiedad "created" igual a false
      filteredAndSortedPokemon = filteredAndSortedPokemon.filter(
        // SI EL FILTER BYAPI ES TRUE, HAY QUE TRAER LOS API POKEMONS
        (pokemon) => !pokemon.created
      );
    }

    if (filters.byDB) {
      // Filtrar por la propiedad "created" igual a false
      filteredAndSortedPokemon = filteredAndSortedPokemon.filter(
        // SI EL FILTER BYAPI ES TRUE, HAY QUE TRAER LOS API POKEMONS
        (pokemon) => pokemon.created
      );
      dispatch(setPage(0)); // AL HABER GENERALMENTE POCOS POKEMONS CREADOS SETEAMOS EN 0 LA PAGE
    }

    if (filters.byAttack) {
      // SI BY ATTACK ES TRUE HAY QUE TRAER LOS POKEMONS ORDENADOS POR SU NIVEL DE ATAQUE
      if (filters.descendente) {
        // Ordenar por ataque en orden descendente
        filteredAndSortedPokemon.sort((a, b) => b.attack - a.attack);
      } else if (filters.ascendente) {
        // Ordenar por ataque en orden ascendente
        filteredAndSortedPokemon.sort((a, b) => a.attack - b.attack);
      } else {
        filteredAndSortedPokemon.sort((a, b) => b.attack - a.attack);
      }
    }

    if (filters.alfabetic) {
      // ORDENAR ALFABEETICAMENTE
      if (filters.descendente) {
        // Ordenar alfabéticamente en orden descendente
        filteredAndSortedPokemon.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filters.ascendente) {
        // Ordenar alfabéticamente en orden ascendente
        filteredAndSortedPokemon.sort((a, b) => b.name.localeCompare(a.name));
      } else {
        // Si solo el filtro alfabético está activado, ordenar alfabéticamente
        filteredAndSortedPokemon.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    if (!filters.alfabetic && !filters.byAttack) {
      if (filters.ascendente) {
        filteredAndSortedPokemon.reverse();
      }
    }

    dispatch(setFilteredPokemons(filteredAndSortedPokemon)); // LUEGO DE PASAR POR TODOS LOS FILTROS, HACEMOS DISPATCH DE COMO QUEDO EL ARRAY DE POKEMONS
  };

  //! FUNCION PARA SETEAR LOS FILTROS EN FALSO
  const handleSetFiltersInactive = () => {
    dispatch(setFiltersInactive());
  };

  // FUNCION PARA QUE CUANDO SE HAGA CLICK SOBRE ALGUN TYPE SETEAR EL TYPE COMO EL VALUE DEL DROP
  const show = (name) => {
    setValueDrop(name);
  };

  // FUNCION PARA SETEAR EN TRUE O FALSE EL DROP (ABIERTO O CERRADO)
  const activateDrop = () => {
    setActiveDrop(!activeDrop);
  };

  return (
    <div className={style.separador}>
      <div className={style.navBarDiv}>
        <div className={style.henryPokemonsDiv}>
          <h1>Henry Pokemons</h1>
          <button>
            <Link to="/home">
              <img src={casita} alt="logo home" />
            </Link>
          </button>
        </div>
        <div className={style.searchAndFilters}>
          <div className={style.searchBar}>
            <SearchBar />
          </div>
          <div className={style.filtrosYordenDiv}>
            <div className={style.filtrosDiv}>
              <h2>Filtrar Por :</h2>
              <button
                className={filters.byApi ? style.buttonActive : style.button}
                disabled={filters.byDB}
                onClick={() => dispatch(toggleFilter("byApi"))} // HACEMOS DISPATCH PARA SETEAR EL FILTRO POR SU CORRESPONDIENTE NOMBRE
              >
                Api Pokemons
              </button>
              <button
                className={filters.byDB ? style.buttonActive : style.button}
                disabled={filters.byApi}
                onClick={() => dispatch(toggleFilter("byDB"))} // HACEMOS DISPATCH PARA SETEAR EL FILTRO POR SU CORRESPONDIENTE NOMBRE
              >
                Created Pokemons
              </button>
              <div
                className={
                  activeDrop
                    ? `${style.dropDown} ${style.active}`
                    : `${style.dropDown}`
                }
                onClick={activateDrop}
              >
                <input
                  type="text"
                  className={style.textBox}
                  placeholder="Types"
                  readOnly
                  value={valueDrop}
                />
                <div className={style.option}>
                  {typesData.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => {
                        show(type.name);
                        dispatch(toggleFilter("byType")); // HACEMOS DISPATCH PARA SETEAR EL FILTRO POR SU CORRESPONDIENTE NOMBRE
                      }}
                    >
                      {type.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={style.ordenDiv}>
              <h2>Ordenar Por :</h2>
              <div className={style.buttons}>
                <button
                  className={
                    filters.alfabetic ? style.buttonActive : style.button
                  }
                  disabled={filters.byAttack}
                  onClick={() => dispatch(toggleFilter("alfabetic"))} // HACEMOS DISPATCH PARA SETEAR EL FILTRO POR SU CORRESPONDIENTE NOMBRE
                >
                  Orden Alfabético
                </button>
                <button
                  className={
                    filters.byAttack ? style.buttonActive : style.button
                  }
                  onClick={() => dispatch(toggleFilter("byAttack"))} // HACEMOS DISPATCH PARA SETEAR EL FILTRO POR SU CORRESPONDIENTE NOMBRE
                  disabled={filters.alfabetic}
                >
                  Ataque
                </button>
                <button
                  className={
                    filters.ascendente ? style.buttonActive : style.button
                  }
                  onClick={() => {
                    dispatch(toggleFilter("ascendente")); // HACEMOS DISPATCH PARA SETEAR EL FILTRO POR SU CORRESPONDIENTE NOMBRE
                    if (filters.descendente) {
                      // ADEMAS SETEAMOS EL OTRO EN FALSO
                      dispatch(toggleFilter("descendente"));
                    }
                  }}
                >
                  Ascendente
                </button>

                <button
                  className={
                    filters.descendente ? style.buttonActive : style.button
                  }
                  onClick={() => {
                    dispatch(toggleFilter("descendente")); // HACEMOS DISPATCH PARA SETEAR EL FILTRO POR SU CORRESPONDIENTE NOMBRE
                    if (filters.ascendente) {
                      // ADEMAS SETEAMOS EL OTRO EN FALSO
                      dispatch(toggleFilter("ascendente"));
                    }
                  }}
                >
                  Descendente
                </button>
              </div>
            </div>
            <div className={style.submitButtons}>
              <div className={style.submitButtonDiv}>
                <button onClick={applyFilters}>Aplicar Filtros</button>{" "}
                {/* EJECUTAMOS LA FUNCION APPLY FILTERS */}
              </div>
              <div className={style.deleteFiltersButtonDiv}>
                <button
                  onClick={() => {
                    handleSetFiltersInactive(); //SETEA TODOS LOS FILTROS EN FALSE Y BORRA EL VALUE DEL DROP
                    setValueDrop("");
                  }}
                >
                  Borrar Filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
