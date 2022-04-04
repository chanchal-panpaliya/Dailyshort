import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import NoteState from './my-webapp/context/NoteState';
import { ThemeProvider } from './my-webapp/context/theme-context';

// Call make Server
makeServer();

ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider>
        <NoteState> 
          <App />
        </NoteState>
      </ThemeProvider>
    </React.StrictMode>
  ,
  document.getElementById("root")
);
