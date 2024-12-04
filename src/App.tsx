import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/auth/Login";
import theme from "./theme";
import { ThemeProvider } from "styled-components";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Dashboard/>
      </ThemeProvider>
    </>
  );
}

export default App;
