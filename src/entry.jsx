import {createRoot} from 'react-dom/client';
import './app.css';
import {StrictMode} from "react";
import {App} from "./App.jsx";

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <App/>
  </StrictMode>
);
