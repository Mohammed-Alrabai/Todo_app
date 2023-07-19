import React from "react";
import { v4 as uuidv4 } from "uuid";
export default function reducer(state, action) {
    switch (action.type) {
        case "ADD_TODO":{
            const { addTodo } = action.payload;
            const updateTodos = [
              ...state,
              {
                id: uuidv4(),
                title: addTodo,
                description: "",
                completed: false,
              },
            ];
                localStorage.setItem("todos", JSON.stringify(updateTodos));
            return updateTodos
        }
        case "DELETE_TODO":{
            const { id } = action.payload;
            const newTodos = state.filter((todo) => todo.id !== id);
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos
        }
        case "EDIT_TODO":{
            const { id, title, description } = action.payload;
            const newTodos = state.map((todo) => {
                if (todo.id === id) {
                    todo.title = title;
                    todo.description = description;
                }
                return todo;
            });
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos
        }
        case "GET_TODO":{
            const localTodos =
            JSON.parse(localStorage.getItem("todos")) ?? [];
            return localTodos
        }
        case "CHECK_TODO":{
            const { id } = action.payload;
            const newTodos = state.map((todo) => {
                if (todo.id === id) {
                    const updatedTodo = {
                        ...todo,
                        completed: !todo.completed,
                    }
                    return updatedTodo
                }
                return todo;
            });
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos
        }
        default:{
            throw Error("Invalid action" + action.type);
        }
    }        
    }