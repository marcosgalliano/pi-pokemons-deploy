import style from "./Card.module.css";
import { Link } from "react-router-dom";

// COMPONENTE CARD, ESTA ES LA CARD EN SI.

const Card = (props) => {
  const { name, image, types, id } = props;
  return (
    <div className={style.divCard}>
      <div className={style.divH1HenryPokemons}>
        <h1>Henry Pokemons</h1>
      </div>
      <div className={style.divName}>
        <h1>{name}</h1>
      </div>
      <div className={style.divImg}>
        <img src={image} alt="pokemon pic" className={style.imgpoke} />
      </div>
      <div className={style.typesAndInfo}>
        <div className={style.types}>
          <h3>{types}</h3>
        </div>
        <div className={style.infoButtonDiv}>
          <button>
            {/* ESTE BUTTON LLEVA AL CLIENTE A LA CARD DETAIL DEL POKEMON */}
            <Link to={`/detail/${id}`}>
              <h5>
                + <br /> info
              </h5>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
