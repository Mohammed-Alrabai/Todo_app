import React from "react";
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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Input,
  TextField,
} from "@mui/material";

import "../App.css";
// icon
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import TodoContext from "../context/todoContext";
import { useContext } from "react";
import { useState } from "react";
function Todo({ todo, key, check, todoDel }) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(todo);
  const { todos, setTodos } = useContext(TodoContext);
  const todoCheck = (id) => {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  };
  const todoDelete = (id) => {
    const newTodo = todos.filter((todo) => todo.id !== id);
    setTodos(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const todoEdit = (id) => {
    setEdit(true);
  };
  const handelEdit = () => {
    const newTodo = todos.map((todo) => {
      if (todo.id === editTodo.id) {
        todo.title = editTodo.title;
        todo.description = editTodo.description;
      }
      return todo;
    })
    setTodos(newTodo);
    setEdit(false);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  }
  const handleEditClose = () => {
    setEdit(false);
  };
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
                  todoEdit();
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
                  handleClickOpen();
                }}>
                <MdDeleteOutline />
              </IconButton>
            </Box>
            {open && (
              <Model
                onClick={handleClose}
                open={open}
                handleClose={handleClose}
                id={todo.id}
                todoDelete={todoDelete}
              />
            )}
            {edit && (
              <ModelEdit
                id={todo.id}
                todoEdit={todoEdit}
                handleEditClose={handleEditClose}
                editTodo={editTodo}
                setEditTodo={setEditTodo}
                handelEdit={handelEdit}
              />
            )}
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default Todo;

const Model = ({ open, handleClose, id, todoDelete }) => {
  return (
    <>
      <Dialog
        open={true}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle sx={{ color: "#D61600" }}>
          {"            هل انت متاكد من رغبتك في الحذف هذه المهمه؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{ color: "#D61600" }}
            id="alert-dialog-slide-description">
            لايمكنك التراجع عن الحذف بعد إتمامة
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "left", alignItems: "center" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => todoDelete(id)}>
            متاكد
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            الغاء
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
const ModelEdit = ({ open, handleEditClose, id, editTodo, setEditTodo , handelEdit}) => {
  return (
    <>
      <Dialog
        open={true}
        keepMounted
        onClose={handleEditClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"            تعديل المهمه؟"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "300px",
              direction: "rtl",
            }}>
            <TextField
              sx={{ width: "100%", mt: "1rem" }}
              label="عنوان المهمه"
              id="outlined-basic"
              variant="outlined"
              value={editTodo.title}
              onChange={(e) =>
                setEditTodo({ ...editTodo, title: e.target.value })
              }
            />
            <TextField
              label="وصف المهمه"
              id="outlined-basic"
              variant="outlined"
              value={editTodo.description}
              onChange={(e) =>
                setEditTodo({ ...editTodo, description: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "left", alignItems: "center" }}>
          <Button variant="outlined" onClick={() => handelEdit(id)}>
            متاكد
          </Button>
          <Button variant="outlined" color="primary" onClick={handleEditClose}>
            الغاء
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
