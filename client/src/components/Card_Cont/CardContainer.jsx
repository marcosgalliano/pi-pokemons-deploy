import style from "./CardContainer.module.css";
import Card from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import { INCREMENT_PAGE, DECREMENT_PAGE, setError } from "../../redux/actions";

//CARD CONTAINER

const CardContainer = () => {
  const pokemons = useSelector((state) => state.pokemons);                  // LLAMAMOS A TODOS LOS POKEMONS
  const filter = useSelector((state) => state.filter);                     // LLAMAMOS A LA PROPIEDAD FILTER PARA SETEARLA
  const pokemon = useSelector((state) => state.byNamePokemon);             // LA CONSTANTE POKEMON ES EL POKEMON QUE BUSCAMOS POR SEARCHBAR
  const currentPGE = useSelector((state) => state.currentPGE);             // PROPIEDAD PARA SETEAR LA PAGINA ULTIMA PAGINA QUE VISITO EL CLIENTE
  const filtersActive = useSelector((state) => state.filtersActive);        // PROPIEDAD LLAMDA PARA SETEARLA EN CASO DE QUE SE ACTIVEN LOS FILTROS
  const filteredPokemons = useSelector((state) => state.filteredPokemons);  // POKEMONS FILTRADOS
  const error = useSelector((state) => state.error);                          // LLAMAMOS PARA VER SI HAY ERRORES
  const itemsPerPage = 12;                                                    // SETEAMOS LA CANTIDAD DE POKEMONS QUE RENDERIZAMOS POR PAGINA
  const dispatch = useDispatch();                                             // SETEAMOS LA CONSTANTE DISPATCH PARA HACER DISPATCH DE LAS ACTIONS
  
  let totalPages; 
                    // VALORES QUE CAMBIAN
  let paginate;

  // CONDICIONALES PARA EL PAGINATION Y SETEAR ERRORES SI NO HAY ITEMS TO DISPLAY
  let itemsToDisplay;

  if (filter) {
    itemsToDisplay = pokemon;                                      // SI FILTER ESTA EN TRUE HAY QUE MOSTRAR POKEMON (POR NOMBRE)
  } else if (filtersActive) { 
    itemsToDisplay = filteredPokemons;                              // SI FILTERSACTIVE ESTA EN TRUE SIGNIFICA QUE HAY QUE RENDERIZAR LOS POKEMONS FILTRADOS
    totalPages = Math.ceil(filteredPokemons.length / 12);               // LAS TOTAL PAGES CAMBIAN YA QUE AL FILTRAR POKEMONS, HAY MENOS
  } else {
    itemsToDisplay = pokemons;                                       // SI NO HAY NINGUN FILTRO EN ACTIVE SE RENDERIZAN TODOS LOS POKEMONS
    totalPages = Math.ceil(pokemons.length / 12);                    // LAS TOTAL PAGES CAMBIAN YA QUE AL FILTRAR POKEMONS, HAY MENOS
  }

  if (itemsToDisplay.length < 1) {
    dispatch(setError("No Hay Pokemons Con Las Busquedas Actuales..."));             //EN EL CASO DE QUE NO HAYA ITEMS TO DISPLAY SIGNIFICA QUE
  }                                                                                  // CON LOS FILTROS ACTUALES NO HAY POKEMONS

  if (filter) {                                                               // EN EL CASO DE QUE FILTER ESTE ACTIVO
    paginate = false;                                                         // SETEAR PAGINATE EN FALSO, YA QUE UN SOLO POKEMON NO DEBE TENER PAGINADO
  } else {
    paginate = true;
  }
 
  if (paginate) {                                                             // SI PAGINATE ES TRUE, SIGNIFICA QUE PUEDEN LLEGAR A HABER MAS DE 12 POKEMONS PARA RENDERIZAR
    const startIndex = currentPGE * itemsPerPage;                            // POR LO QUE HAY QUE PAGINAR
    const endIndex = startIndex + itemsPerPage;
    itemsToDisplay = itemsToDisplay.slice(startIndex, endIndex);
  }

  return (
    <div className={style.paginationAndContainer}>
      <div className={style.pagination}>
        {filter || error ? (                                                   // SI  EXISTE FILTER O ERROR NO DEBE DAR LA OPCION DE PAGINAR
          ""
        ) : (
          <div className={style.ndDivPagination}>
            <button
              onClick={() => dispatch({ type: DECREMENT_PAGE })}              // HACEMOS DISPATCH PARA SETEAR LA PAGE
              disabled={currentPGE === 0}
            >
              Previous
            </button>
            <button
              onClick={() => dispatch({ type: INCREMENT_PAGE })}              // HACEMOS DISPATCH PARA SETEAR LA PAGE
              disabled={totalPages === currentPGE + 1}
            >
              Next
            </button>
            <div>
              <h2>{`Page : ${currentPGE + 1} / ${totalPages}`}</h2>          {/* MOSTRAR PAGS DISPONIBLES Y EN QUE PAG ESTAMOS */}
            </div>{" "}
          </div>
        )}
      </div>
      <div className={style.divCardContainer}>
        {error !== null ? (                                                // SI ERROR NO ES NULL SIGNIFICA QUE HAY UN ERROR, MOSTRARLO
          <h1>{error}</h1>
        ) : (
          <>
            {itemsToDisplay.map((poke) => {
              return (
                <Card
                  id={poke.id}
                  name={poke.name}
                  image={poke.image}
                  types={
                    Array.isArray(poke.types)
                      ? poke.types
                          .map((type) =>
                            typeof type === "string" ? type : type.name           //LE MANDAMOS A CARD TODOS LOS TEMS TO DISPLAY
                          )
                          .join(", ")
                      : "Unknown"
                  }
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default CardContainer;
