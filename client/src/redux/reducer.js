//IMPORTAMOS TODOS LOS ACTION TYPES

import {
  GET_POKEMONS,
  GET_NAME,
  SET_FILTER,
  TOGGLE_FILTER,
  SET_FILTERED_POKEMONS,
  SET_FILTERS_INACTIVE,
  INCREMENT_PAGE,
  DECREMENT_PAGE,
  SET_ERROR,
  SET_PAGE,
} from "./actions";

//INICIAMOS EL INITIAL STATE CON LAS PROPIEDADES QUE VAMOS A USAR EN LA APP
const initialState = {
  pokemons: [],                                                       // TODOS LOS POKEMONS, SIN FILTROS
  byNamePokemon: [],                                                  // GUARDAMOS EL POKEMON QUE SE RECIBE POR NOMBRE
  filter: false,                                                      // SI ESTE FILTER ESTA EN TRUE SIGNIFICA QUE SE BUSCO UN POKEMON POR NOMBRE
  error: null,                                                        // PROPIEDAD CREADA PARA GUARDAR ALGUN ERROR
  filters: {
    // FILTROS Y ORDENAMIENTO
    byAttack: false,                                                  // SI ES TRUE SIGNIFICA QUE ESTE FILTRO ESTA PRENDIDO
    alfabetic: false,                                                 // SI ES TRUE SIGNIFICA QUE ESTE FILTRO ESTA PRENDIDO
    ascendente: false,                                                // SI ES TRUE SIGNIFICA QUE ESTE FILTRO ESTA PRENDIDO
    descendente: true,                                                // SI ES TRUE SIGNIFICA QUE ESTE FILTRO ESTA PRENDIDO
    byApi: false,                                                     // SI ES TRUE SIGNIFICA QUE ESTE FILTRO ESTA PRENDIDO
    byDB: false,                                                      // SI ES TRUE SIGNIFICA QUE ESTE FILTRO ESTA PRENDIDO
    byType: false,                                                    // SI ES TRUE SIGNIFICA QUE ESTE FILTRO ESTA PRENDIDO
  },
  filtersActive: false,                                               // SI ES TRUE SIGNIFICA QUE ALGUN FILTRO ESTA ACTIVO
  filteredPokemons: [],                                               // ARRAY QUE GUARDA LOS POKEMON SEGUN SUS FILTROS
  currentPGE: 0,                                                      // PROPIEDAD QUE GUARDA LA PAGE POR LA QUE NAVEGA EL CLIENTE
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return { ...state, pokemons: action.payload, error: null };

    case GET_NAME:
      return {
        ...state,
        filter: true,
        byNamePokemon: action.payload,
        error: null,
      };

    case SET_FILTER:
      return { ...state, filter: action.payload, error: null };

    case SET_ERROR:
      return { ...state, error: action.payload };

    case TOGGLE_FILTER:
      if (action.payload === "byType") {               // EN CASO DE QUE SEA BYTYPE SIEMPRE SETEAR EN TRUE, NO INTERCALAR
        return {
          ...state,
          filters: {
            ...state.filters,
            [action.payload]: true,
          },
        };
      }
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload]: !state.filters[action.payload],
        },
      };

    case SET_FILTERED_POKEMONS:
      return {
        ...state,
        error: null,
        filtersActive: true,
        filteredPokemons: action.payload,
      };

    case SET_FILTERS_INACTIVE:
      return {
        ...state,
        filtersActive: false,
        error: null,
        filters: {
          byAttack: false,
          alfabetic: false,
          ascendente: false,
          descendente: true,
          byApi: false,
          byDB: false,
          byType: false,
        },
      };

    case INCREMENT_PAGE:
      return {
        ...state,
        currentPGE: state.currentPGE + 1,
      };

    case SET_PAGE:
      return {
        ...state,
        currentPGE: action.payload,
      };

    case DECREMENT_PAGE:
      return {
        ...state,
        currentPGE: state.currentPGE - 1,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
