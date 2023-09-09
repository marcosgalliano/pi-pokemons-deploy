import React, { useState, useEffect } from "react";
import { getPokemons } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import style from "./Form.module.css";
import DetailCard from "../../components/DetailCard/DetailCard";

const Form = () => {
  const dispatch = useDispatch();

  // ESTADOS (ERRORS, DATA DEL FORM Y TYPES)

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    attack: "",
    defense: "",
    hp: "",
    types: [],
  });

  const [errors, setErrors] = useState({
    name: "*",
    image: "*",
    attack: "*",
    defense: "*",
    hp: "*",
    types: "*",
  });

  const [typesData, setTypesData] = useState([]);

  // USEEFFECT PARA QUE LA PROPIEDAD POKEMONS DEL ESTADO TENGA LOS POKEMONS Y MAPEAR SUS IMAGES PARA GENERAR LAS IMAGENES RANDOM
  // TAMBIEN PARA RECIBIR LOS TYPES DISPONIBLES

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPokemons());
    };

    const fetchTypes = async () => {
      try {
        const response = await axios.get("/types/");
        // Extraer el array de tipos de la respuesta del servidor
        const typesArray = response.data;
        console.log(typesArray);
        setTypesData(typesArray);
      } catch (error) {
        console.error("Error al cargar los tipos de pokémon:", error);
      }
    };

    if (formData.types.length < 2) {
      setErrors({ ...errors, types: "Min 2 Types" });
    } else {
      setErrors({ ...errors, types: "" });
    }

    fetchData();
    fetchTypes();
  }, [dispatch, formData.types.length]);

  // LLAMAMOS A POKEMONS DEL ESTADO Y MAPEAMOS SUS IMAGES
  const pokemons = useSelector((state) => state.pokemons);

  const randomImages = pokemons.map((poke) => poke.image);

  // VALIDACIONES ///////////////////////////////////////////////////

  // Regex validar si un valor es un URL válido
  const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      if (!urlRegex.test(value)) {
        setErrors({ ...errors, [name]: "Debe ser una URL válida" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }

    // Validación de attack, defense y hp
    if (name === "attack" || name === "defense" || name === "hp") {
      if (value < 1 || value > 150) {
        setErrors({ ...errors, [name]: "Máximo permitido 150" });
      } else if (value === "") {
        setErrors({ ...errors, [name]: "Obligatorio" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }

    if (name === "name") {
      if (value === "") {
        setErrors({ ...errors, [name]: "Obligatorio" });
      } else {
        setErrors({ ...errors, [name]: "" });
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  // HANDLE CHANGES //////////////////////////////////////////////////////////////////////////

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;

    console.log(formData.types);

    if (checked) {
      // Si está marcado, agrega el tipo a la matriz
      setFormData((prevData) => ({
        ...prevData,
        types: [...prevData.types, parseInt(value, 10)],
      }));
    } else {
      // Si no está marcado, elimina el tipo de la matriz
      setFormData((prevData) => ({
        ...prevData,
        types: prevData.types.filter((tipo) => tipo !== parseInt(value, 10)),
      }));
    }
  };

  // BOTON SUBMIT DEL FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si no se han seleccionado tipos, y si es así, agrega "unknown" (ID 19) como predeterminado
    const typesArray = formData.types.length === 0 ? [19] : formData.types;

    // HACE LA PETICION POST Y PASA POR BODY EL ESTADO FORMDATA
    try {
      await axios.post("/pokemons/", {
        ...formData,
        types: typesArray,
      });

      setFormData({
        name: "",
        image: "",
        attack: "",
        defense: "",
        hp: "",
        types: [],
      });

      setErrors({
        name: "*",
        image: "*",
        attack: "*",
        defense: "*",
        hp: "*",
      });

      alert("¡El Pokémon se ha creado con éxito!");
    } catch (error) {
      if (
        error.response.data.error ===
        "llave duplicada viola restricción de unicidad «pokemons_name_key»"
      ) {
        alert("Ya existe un pokemon con ese nombre");
      } else {
        alert(`Error al crear el Pokémon`);
      }
    }
  };

  // FUNCION PARA QUE AL TOCAR EL BOTON GENERAR IMAGEN SE SETEE EN EL FOMRDATA UNA IMAGEN RANDOM DE RANDOMIMAGES
  const generateRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    const randomImage = randomImages[randomIndex];

    //SETEMOS ERRORES SI LOS HAY Y LOS BORRAMOS SI ES QUE HABIA

    if (!urlRegex.test(randomImage)) {
      setErrors({ ...errors, image: "Debe ser una URL válida" });
    } else {
      setErrors({ ...errors, image: "" });
    }

    setFormData({ ...formData, image: randomImage });
  };

  // CHEQUEAR SI HAY ERRORES /////////////////////////////////

  const hasErrors = Object.values(errors).some((error) => error !== "");

  ///////////////////////////////////////////////////////////////

  return (
    <div className={style.containerForm}>
      <div className={style.divCreaTuPokemon}>
        <h1>Crea Tu Pokemon !</h1>
      </div>
      <div className={style.ndContainerForm}>
        <form className={style.divForm} onSubmit={handleSubmit}>
          <div className={style.decoImageDiv}>
            <div className={style.cargaOimagen}>
              <DetailCard character={formData} createPage={true} />
            </div>
          </div>
          <div className={style.form}>
            <label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Nombre Del Pokemon"
              />
              {/* Mostrar el mensaje de error */}
              {errors.name && (
                <span className={style.error}>{errors.name}</span>
              )}
            </label>

            <label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
                placeholder="Link De La Imagen"
                className={style.inputImage}
              />
              {/* Mostrar el mensaje de error */}
              {errors.image && (
                <span className={style.error}>{errors.image}</span>
              )}
            </label>
            {/* BOTON PARA GENERAR UNA NUEVA IMAGEN */}
            <button type="button" onClick={generateRandomImage}>
              Generar Imagen
            </button>

            <label>
              <input
                type="number"
                name="hp"
                value={formData.hp}
                onChange={handleInputChange}
                required
                placeholder="Stat de Vida Max(150)"
              />
              {/* Mostrar el mensaje de error */}
              {errors.hp && <span className={style.error}>{errors.hp}</span>}
            </label>

            <label>
              <input
                type="number"
                name="attack"
                value={formData.attack}
                onChange={handleInputChange}
                required
                placeholder="Stat de Ataque Max(150)"
              />
              {/* Mostrar el mensaje de error */}
              {errors.attack && (
                <span className={style.error}>{errors.attack}</span>
              )}
            </label>

            <label>
              <input
                type="number"
                name="defense"
                value={formData.defense}
                onChange={handleInputChange}
                required
                placeholder="Stat de Defensa Max(150)"
              />
              {/* Mostrar el mensaje de error */}
              {errors.defense && (
                <span className={style.error}>{errors.defense}</span>
              )}
            </label>

            <label>Tipos:</label>
            <div className={style.typesDiv}>
              {errors.types && (
                <span className={style.error}>{errors.types}</span>
              )}
              {/* MAPEAR LOS TYPES PARA MOSTRARLOS EN LABELS */}
              {typesData.map((type) => (
                <label key={type.id}>
                  {type.name}
                  <input
                    type="checkbox"
                    name="types"
                    value={type.id}
                    checked={formData.types.includes(type.id)}
                    onChange={handleTypeChange}
                  />
                </label>
              ))}
            </div>

            <div className={style.submitDiv}>
              <button
                type="submit"
                className={hasErrors ? style.disabledButton : ""}
                disabled={hasErrors}
              >
                Crear Pokémon
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
