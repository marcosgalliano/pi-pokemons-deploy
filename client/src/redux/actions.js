import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_NAME = "GET_NAME";
export const SET_FILTER = "SET_FILTER";
export const TOGGLE_FILTER = "TOGGLE_FILTER";
export const SET_FILTERED_POKEMONS = "SET_FILTERED_POKEMONS";
export const SET_FILTERS_INACTIVE = "SET_FILTERS_INACTIVE";
export const INCREMENT_PAGE = "INCREMENT_PAGE";
export const DECREMENT_PAGE = "DECREMENT_PAGE";
export const SET_ERROR = "SET_ERROR";
export const SET_PAGE = "SET_PAGE";


// ACTION PARA CONSEGUIR TODOS LOS POKEMONS
export const getPokemons = () => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(`/pokemons/`);

      const myApiPokemon = apiData.data;
      dispatch({ type: GET_POKEMONS, payload: myApiPokemon });
    } catch (error) {
      alert("Error 505, Internal Server Error");
    }
  };
};


// ACTION PARA CONSEGUIR POKEMONS POR SU NAME
export const getPokemonByName = (name) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.get(
        `/pokemons?name=${name}`
      );

      const poke = apiData.data;
      dispatch({ type: GET_NAME, payload: poke });
    } catch (error) {
      // Manejamos el error de la llamada a la API
      alert(error);
    }
  };
};


// ACTION PARA SETEAR EL FILTER DEL NAME EN FLASE
export const setFilter = (set) => {
  return async function (dispatch) {
    try {
      dispatch({ type: SET_FILTER, payload: set });
    } catch (error) {
      alert(error);
    }
  };
};


// ACTION PARA SETEAR TODOS LOS FILTERS 
export const toggleFilter = (filterName) => ({
  type: TOGGLE_FILTER,
  payload: filterName,
});


// FUNCION QUE RECIBE LOS POKEMONS FILTRADOS
export const setFilteredPokemons = (filtered) => {
  return async function (dispatch) {
    try {
      dispatch({ type: SET_FILTERED_POKEMONS, payload: filtered });
    } catch (error) {
      alert(error);
    }
  };
};


// FUNCION PARA SETEAR TODOS LOS FILTROS EN FALSO
export const setFiltersInactive = () => {
  return {
    type: SET_FILTERS_INACTIVE,
  };
};

// FUNCION QUE SETEA UN ERROR SI ES QUE LO HAY
export const setError = (set) => {
  return async function (dispatch) {
    try {
      dispatch({ type: SET_ERROR, payload: set });
    } catch (error) {
      alert(error);
    }
  };
};


// FUNCION PARA SETEAR LA PAGINA QUE ESTA EL CLIENTE
export const setPage = (nro) => ({
  type: SET_PAGE,
  payload: nro,
});
