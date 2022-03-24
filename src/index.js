import ReactDOM from 'react-dom';
import App from "./components/App/index";

import "./css/reset.css";
import "./css/style.css";

const elemento = document.querySelector(".root");
ReactDOM.render(<App />, elemento);