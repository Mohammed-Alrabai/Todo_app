import React from "react";
import TodoList from "./components/TodoList";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import TodoContext from "./context/todoContext";
import { useState } from "react";
import { ColorsContext } from "./context/colorsContext";

function App() {
  const [todos, setTodos] = useState([]);
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
    },
  });
  return (
    <>
      <ColorsContext.Provider value={{ colors, setColors }}>
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

          <TodoContext.Provider value={{ todos, setTodos }}>
            <TodoList />
          </TodoContext.Provider>
        </div>
      </ThemeProvider>
      </ColorsContext.Provider>
    </>
  );
}

export default App;
