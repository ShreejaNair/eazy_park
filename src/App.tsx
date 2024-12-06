import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/auth/Login";
import theme from "./theme";
import { ThemeProvider } from "styled-components";
import Dashboard from "./pages/dashboard";
import DefaultLayout from "./DefaultLayout";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <DefaultLayout>
          <Dashboard/>
        </DefaultLayout>

      </ThemeProvider>
    </>
  );
}

export default App;
