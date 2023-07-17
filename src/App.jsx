import React from "react";
import TodoList from "./components/TodoList";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import TodoContext from "./context/todoContext";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  const theme = createTheme({
    typography: {
      fontFamily: "Alexandria",
    },
    palette: {
      primary: {
        main: "#0E2954",
      },
      secondary: {
        main: "#FF8E53",
      },
    },
  });
  return (
    <>
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
    </>
  );
}

export default App;
