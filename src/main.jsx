import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ScrollComponent from "./components/ScrollComponent.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style/main.css";

import { BrowserRouter } from "react-router-dom";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:1000";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollComponent />
      <App />
    </BrowserRouter>
  </StrictMode>
);
