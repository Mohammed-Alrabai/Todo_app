import {
  Button,
  Card,
  Container,
  Typography,
  CardContent,
  Divider,
  Box,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import Todo from "./Todo";
import { useState, useEffect, useMemo } from "react";
import { useSnackBar } from "../context/SnackbarContext";

import { useTodo } from "../context/todoContext";
import { useDispatch } from "../context/todoContext";

function TodoList() {
  const [addTodo, setAddTodo] = useState("");

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const [dialogTodo, setDialogTodo] = useState(null);

  const { showSnackbar } = useSnackBar();
  const { todos } = useTodo();
  const dispatch = useDispatch();

  const [todoType, setTodoType] = useState("all");

  const handelAddTodo = () => {
    dispatch({
      type: "ADD_TODO",
      payload: { addTodo },
    });
    setAddTodo("");
    showSnackbar("تم الاضافة بنجاح");
  };

  useEffect(() => {
    dispatch({
      type: "GET_TODO",
    });
  }, []);

  const completed = useMemo(() => {
    return todos.filter((todo) => {
      return todo.completed;
    });
  }, [todos]);

  const uncompleted = useMemo(() => {
    return todos.filter((todo) => {
      return !todo.completed;
    });
  }, [todos]);

  let displayTodos = todos;

  if (todoType === "completed") {
    displayTodos = completed;
  } else if (todoType === "uncompleted") {
    displayTodos = uncompleted;
  } else {
    displayTodos = todos;
  }

  const showDelete = (todo) => {
    setDialogTodo(todo);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  const todoDelete = () => {
    dispatch({
      type: "DELETE_TODO",
      payload: {
        id: dialogTodo.id,
      },
    });
    showSnackbar("تم الحذف بنجاح", "error");
    setOpen(false);
  };

  const showEdit = (todo) => {
    setDialogTodo(todo);
    setEdit(true);
  };

  const handleEditClose = () => {
    setEdit(false);
  };
  const handelEdit = () => {
    dispatch({
      type: "EDIT_TODO",
      payload: {
        id: dialogTodo.id,
        title: dialogTodo.title,
        description: dialogTodo.description,
      },
    });
    setEdit(false);
    showSnackbar("تم التعديل بنجاح");
  };

  const todo = displayTodos.map((todo) => {
    return (
      <Todo
        key={todo.id}
        todo={todo}
        showDelete={showDelete}
        showEdit={showEdit}
      />
    );
  });
  const handelCheckTodo = (e) => {
    setTodoType(e.target.value);
  };

  return (
    <>
      {/* Dialog for delete */}
      <Dialog
        open={open}
        keepMounted
        style={{ direction: "rtl" }}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"هل أنت متأكد من حذف؟"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            هل أنت متأكد من حذف هذه المهمه؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>الغاء</Button>
          <Button onClick={todoDelete} autoFocus>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for update */}
      <Dialog
        open={edit}
        keepMounted
        onClose={handleEditClose}
        style={{ direction: "rtl" }}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"تعديل المهمه"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            تعديل المهمه
          </DialogContentText>
          <TextField
            sx={{ width: "100%", mt: "1rem" }}
            label="عنوان المهمه"
            id="outlined-basic"
            variant="outlined"
            value={dialogTodo?.title}
            onChange={(e) =>
              setDialogTodo({ ...dialogTodo, title: e.target.value })
            }
          />
          <TextField
            sx={{ width: "100%", mt: "1rem" }}
            label="وصف المهمه"
            id="outlined-basic"
            variant="outlined"
            value={dialogTodo?.description}
            onChange={(e) =>
              setDialogTodo({ ...dialogTodo, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>الغاء</Button>
          <Button onClick={handelEdit} autoFocus>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
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
              }}></Box>
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
