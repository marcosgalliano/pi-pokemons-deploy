import style from "./Landing.module.css";
import { Link } from "react-router-dom";
import gitLogo from "../../assets/github_logo.png";
import linkLogo from "../../assets/linkedin_logo.png";

const Landing = () => {
  const redirectLink = () => {
    window.location.href =
      "https://www.linkedin.com/in/marcos-galliano-436220223/";
  };

  const redirectGit = () => {
    window.location.href =
      "https://github.com/marcosgalliano?tab=overview&from=2023-08-01&to=2023-08-07";
  };

  return (
    <div className={style.landingDiv}>
      <div className={style.iniciarContainer}>
        <div className={style.presentation}>
          <h1>
            Henry <br /> Pokemons
          </h1>
        </div>
        <div className={style.divIniciar}>
          <button>
            <Link to="/home">
              <h2>INGRESAR</h2>
            </Link>
          </button>
          <div className={style.socialMedia}>
            <img src={gitLogo} alt="git logo" onClick={redirectGit} />
            <img src={linkLogo} alt="linkedin logo" onClick={redirectLink} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
