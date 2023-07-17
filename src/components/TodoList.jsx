import {
  Button,
  Card,
  Container,
  Stack,
  Typography,
  CardActions,
  CardContent,
  Divider,
  ButtonGroup,
  Box,
  Grid,
  Input,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import React from "react";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import { useState, useContext, useEffect } from "react";
import TodoContext from "../context/todoContext";
import { ColorsContext } from "../context/colorsContext";

function TodoList() {
  const [isLoading, setIsLoading] = useState(true);
  const [addTodo, setAddTodo] = useState("");
  const { todos, setTodos } = useContext(TodoContext);
  const { colors, setColors } = useContext(ColorsContext);
  const [todoType, setTodoType] = useState("all");

  const handelAddTodo = () => {
    const updateTodos = [
      ...todos,
      { id: uuidv4(), title: addTodo, description: "", completed: false },
    ];
    setTodos(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
    setAddTodo("");
  };

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem("todos"));
    if (localTodos) {
      setTodos(localTodos);
      setIsLoading(false);
    }
  }, []);

  const completed = todos.filter((todo) => todo.completed);
  const uncompleted = todos.filter((todo) => !todo.completed);
  let displayTodos = todos;
  if (todoType === "completed") {
    displayTodos = completed;
  } else if (todoType === "uncompleted") {
    displayTodos = uncompleted;
  } else {
    displayTodos = todos;
  }
  const todo = displayTodos.map((todo) => {
    return <Todo key={todo.id} todo={todo} />;
  });
  const handelCheckTodo = (e) => {
    setTodoType(e.target.value);
    console.log(e.target.value);
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 10, mb: 10 }}>
        <Card
          sx={{ minWidth: 275, overflowY: "scroll", maxHeight: "80vh" }}
          variant="outlined">
          <CardContent>
            <Typography
              variant="h1"
              sx={{
                fontSize: "3rem",
                mb: 3,
                color: "text.base",
                textAlign: "center",
                fontWeight: "extrabold",
              }}
              color="text.secondary"
              gutterBottom>
              مهامي
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
            </Box>
            <Divider sx={{ mb: 1.5 }} />
            {/* Button Group */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                  m: 1,
                },
              }}>
              <ToggleButtonGroup
                size="small"
                aria-label="small button group"
                variant="outlined"
                color="primary"
                style={{
                  direction: "ltr",
                }}
                value={todoType}
                onChange={handelCheckTodo}
                exclusive>
                <ToggleButton value="uncompleted">غير منجز</ToggleButton>
                <ToggleButton value="completed">منجز</ToggleButton>
                <ToggleButton value="all">الكل</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            {todos.length === 0 ? (
              <Typography
                variant="h2"
                sx={{
                  fontSize: "1.5rem",
                  mb: 2,
                  color: "text.secondary",
                  textAlign: "center",
                  fontWeight: "extrabold",
                  mt: 2,
                }}
                color="text.secondary"
                gutterBottom>
                لا يوجد مهمات
              </Typography>
            ) : (
              todo
            )}
            <Grid container spacing={2} sx={{ alignItems: "center", mt: 2 }}>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  label="اضافة مهمة "
                  color="primary"
                  sx={{ width: "100%" }}
                  value={addTodo}
                  onChange={(e) => {
                    setAddTodo(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    color: "primary",
                    height: "100%",
                    py: "15px",
                  }}
                  color="primary"
                  disabled={addTodo.length === 0}
                  onClick={handelAddTodo}>
                  اضافة
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default TodoList;
