import React from "react";
import {
  Card,
  Typography,
  CardContent,
  Box,
  Grid,
  IconButton,
} from "@mui/material";

import "../App.css";
// icon
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { useSnackBar } from "../context/SnackbarContext";
import { useTodo } from "../context/todoContext";
import { useDispatch } from "../context/todoContext";
function Todo({ todo, showDelete , showEdit }) {
  const { showSnackbar } = useSnackBar();
  const todos = useTodo();
  const dispatch = useDispatch();
  const todoCheck = (id) => {
    dispatch({
      type: "CHECK_TODO",
      payload: { id },
    })
    showSnackbar("تم التعديل بنجاح");
  };

  const handleDeleteClick = () => {
    showDelete(todo);
  }

  const handleEditClick = () => {
    showEdit(todo);
  }

  return (
    <>
      <Card
        sx={{
          minWidth: 275,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "primary.main",
          mb: 1,
        }}
        variant="outlined">
        <Grid container spacing={2} style={{ alignItems: "center" }}>
          <Grid item xs={8}>
            <CardContent>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "1.5rem",
                  mb: 1.5,
                  color: "white",
                  textAlign: "right",
                  fontWeight: "extrabold",
                  fontFamily: "Alexandria",
                  textDecoration: todo.completed ? "line-through" : " none",
                }}
                color="text.secondary"
                gutterBottom>
                {todo.title}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "1rem",
                  mb: 1.5,
                  color: "white",
                  textAlign: "right",
                  fontWeight: "extrabold",
                  fontFamily: "Alexandria",
                  textDecoration: todo.completed ? "line-through" : " none",
                }}
                color="text.secondary"
                gutterBottom>
                {todo.description}
              </Typography>
              {/* Button Group */}
            </CardContent>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                ":hover": {
                  cursor: "pointer",
                },
              }}>
              {/* check */}
              <IconButton
                size="medium"
                aria-label="check"
                color="secondary"
                sx={{
                  backgroundColor: todo.completed ? "#8bc34c" : "white",
                  ml: "1rem",
                  color: todo.completed ? "white" : "#8bc34c",
                  fontSize: "20px",
                  border: "2px solid",
                  ":hover": {
                    backgroundColor: "#8bc34c",
                    color: "white",
                  },
                }}
                onClick={() => {
                  todoCheck(todo.id);
                }}>
                <AiOutlineCheck />
              </IconButton>
              {/* Edit */}
              <IconButton
                size="medium"
                aria-label="edit"
                sx={{
                  backgroundColor: "white",
                  ml: "1rem",
                  color: "primary.main",
                  fontSize: "20px",
                  border: "2px solid",
                  ":hover": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
                onClick={() => {
                  handleEditClick();
                }}>
                <AiOutlineEdit />
              </IconButton>
              {/* Delete */}
              <IconButton
                size="medium"
                aria-label="delete"
                color="error"
                sx={{
                  backgroundColor: "white",
                  ml: "1rem",
                  color: "error.main",
                  fontSize: "20px",
                  border: "2px solid",
                  ":hover": {
                    backgroundColor: "error.main",
                    color: "white",
                  },
                }}
                onClick={() => {
                  handleDeleteClick();
                }}>
                <MdDeleteOutline />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default Todo;