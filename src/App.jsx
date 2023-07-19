import React from "react";
import TodoList from "./components/TodoList";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { ColorsContext } from "./context/colorsContext";
import { SnckBarProvider } from "./context/SnackbarContext";
import TodoProvider from "./context/todoContext";
function App() {
  const [colors, setColors] = useState("#0E2954");

  const theme = createTheme({
    typography: {
      fontFamily: "Alexandria",
    },
    palette: {
      primary: {
        main: colors,
      },
      secondary: {
        main: "#FF8E53",
      },
      mode: "light" 
    },
  });
  return (
    <>
      <ColorsContext.Provider value={{ colors, setColors }}>
      <TodoProvider>
        <SnckBarProvider>
          <ThemeProvider theme={theme}>
            <div
              className="App"
              dir="rtl"
              style={{
                fontFamily: "El Messiri",
                height: "100%",
                minHeight: "100vh",
                width: "100%",
                background: "#2C3333",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <TodoList />
            </div>
          </ThemeProvider>
        </SnckBarProvider>
      </TodoProvider>
      </ColorsContext.Provider>
    </>
  );
}

export default App;
