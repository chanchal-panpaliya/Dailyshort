import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import NoteState from './my-webapp/context/NoteState';
import { ThemeProvider } from './my-webapp/context/theme-context';
import {AuthProvider} from "./my-webapp/context/login/AuthContext";

// Call make Server
makeServer();

ReactDOM.render(
    <React.StrictMode>
      <AuthProvider> 
        <ThemeProvider>
          <NoteState> 
            <App />
          </NoteState>
        </ThemeProvider>
      </AuthProvider>
    </React.StrictMode>
  ,
  document.getElementById("root")
);
