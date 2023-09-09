import style from "./Home.module.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPokemons } from "../../redux/actions";
import CardContainer from "../../components/Card_Cont/CardContainer";

const Home = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);                 // CON ESTE ETSADO SABEMOS SI TODAVIA SE ESTA HACIENDO LA SOLICITUS PARA RECIBBIR LOS POKEMONS
  
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getPokemons());
      setLoading(false);
    };
    
    fetchData();
  }, [dispatch]);

  
  return (
    <div className={style.homeDiv}>
      {loading ? (
        <div className={style.divDeCarga}>
          <h1>Cargando Pokémons...</h1>
        </div>
      ) : (
        <CardContainer />
      )}
    </div>
  );
};

export default Home;
