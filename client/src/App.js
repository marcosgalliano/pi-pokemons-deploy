import { Route } from "react-router-dom";
import style from "./App.module.css";
import { Home, Form, Detail, Landing } from "./views/index";
import Footer from "./components/footer/Footer";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "./components/NavBar/NavBar";
import axios from "axios"
axios.defaults.baseURL = "http://localhost:3001/"

function App() {
  const location = useLocation();
  return (
    <div className={style.app}>
      {location.pathname !== "/" && <Navbar />}
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/detail/:id" component={Detail} />
      <Route path="/Form" component={Form} />
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default App;
