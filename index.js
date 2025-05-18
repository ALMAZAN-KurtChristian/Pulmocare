import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ContextProvider from './context/Context.jsx'

import { DarkModeContextProvider } from "./context/darkModeContext.js";
ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
    <ContextProvider>
        <App />
    </ContextProvider> 
    </DarkModeContextProvider> 
  </React.StrictMode>,
  document.getElementById("root")
);
