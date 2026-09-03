import ReactDOM from "react-dom/client";
import "./assets/styles/index.scss";
import App from "./App.jsx";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

ReactDOM.createRoot(
  document.getElementById("app")
).render(<App />);