import style from "./DetailCard.module.css";
import attackLogo from "../../assets/logo_attack-removebg-preview.png";
import escudoLogo from "../../assets/logo_escudo-removebg-preview.png";
import logoHp from "../../assets/logo_hp-removebg-preview.png";

const DetailCard = (props) => {
  const { character, formattedTypes, createPage } = props;

  // CONECTAMOS TODOS LOS TYPES CON UN NUMERO (ID)
  const typeMapping = {
    1: "normal",
    2: "fighting",
    3: "flying",
    4: "poison",
    5: "ground",
    6: "rock",
    7: "bug",
    8: "ghost",
    9: "steel",
    10: "fire",
    11: "water",
    12: "grass",
    13: "electric",
    14: "psychic",
    15: "ice",
    16: "dragon",
    17: "dark",
    18: "fairy",
    19: "unknown",
    20: "shadow",
  };


  // SE USA EN CASO DE QUE CHARACTER.TYPES TENGA ALGO YA QUE ,SI ES ASI, EL COMPONENTE QUE ESTA LLAMANDO A DETAILCARD ES EL DEL FORM
  // SI ES DEL FORM, LOS TYPES VIENEN EN UN ARRAY DE NUMEROS POR LO QUE HAY QUE MAPEARLOS CONECTANDO ESE NUMERO A SU RESPECTIVO TYPE
  let typesToShow;

  let typesCreate = character.types;
  if (typesCreate) {
    const typesArray = typesCreate.map((type) => {
      if (!isNaN(type)) {
        // Verificar si es un número
        return typeMapping[type]; 
      }
      return false;
    });

    typesToShow = typesArray.join(", ");
  }

  return (
    <div
      className={
        createPage ? style.divCardDetailCreationPage : style.divCardDetail       // SI CREATEPAGE ES TRUE SIGNIFICA QUE DETAIL CARD SE VA A RENDERIZAR
      }                                                                         // EN EL FORM, POR LOQUE HAY QUE DARLE OTROS ESTILOS
    >
      <div className={style.divName}>
        <h1>{character.name}</h1>
      </div>
      <div className={style.imageAndTypes}>
        <div className={style.divImageDetail}>
          <img src={character.image} alt="pokemon" />
        </div>
        <div className={style.typesContainer}>
          <h2>Types :</h2>
          {createPage ? <h3>{typesToShow}</h3> : <h3>{formattedTypes}</h3>}         {/* SI VIENE DEL FORM, TYPES RENDERIZA TYPESTOSHOW SINO  formattedTypes*/}
        </div>
      </div>
      <div className={style.divStats}>
        <div className={style.statsContainer}>
          <img src={logoHp} alt="logo stat" />
          <h2>{`HP Points : ${character.hp}`}</h2>
        </div>
        <div className={style.statsContainer}>
          <img src={attackLogo} alt="logo stat" />
          <h2>{`ATTACK Points : ${character.attack}`}</h2>
        </div>
        <div className={style.statsContainer}>
          <img src={escudoLogo} alt="logo stat" />
          <h2>{`DEFENSE Points : ${character.defense}`}</h2>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
