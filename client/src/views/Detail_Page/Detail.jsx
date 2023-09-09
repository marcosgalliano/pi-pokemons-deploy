import style from "../Detail_Page/Detail.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import DetailCard from "../../components/DetailCard/DetailCard";

const Detail = () => {
  const params = useParams();
  const id = params.id;                                                         // USAMOS USEPARAMS PARA RECIBIR EL ID
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(true);                                 // CONESTE ESTADO SABEMOS SI TODAVIA SE ESTA HACEINDO LA PETICION O NO

  useEffect(() => {
    axios(`http://localhost:3001/pokemons/${id}`).then(({ data }) => {
      if (data.name) {
        setCharacter(data);                                                      // SETEAMOS EL POKEMON EN CHARACTER
      }
      setLoading(false); // Marcar como completado cuando se reciban los datos
    });
  }, [id]);

  let formattedTypes = "Unknown";                                                 // EN CASO DE QUE EL POKEMON NO TENGA TYPES, ESTE SEA UNKNOWN

  if (character.types) {
    if (Array.isArray(character.types)) {
      formattedTypes = character.types
        .map((type) => (typeof type === "string" ? type : type.name))           // MISMA FUNCION DE SIEMPRE PARA LOS TYPES
        .join(", ");
    } else if (typeof character.types === "string") {
      formattedTypes = character.types;
    }
  }

  return (
    <div className={style.divDetail}>
      {loading ? (
        <h1>Cargando Pokemon...</h1>
      ) : (
        <DetailCard character={character} formattedTypes={formattedTypes} />
      )}
    </div>
  );
};

export default Detail;
