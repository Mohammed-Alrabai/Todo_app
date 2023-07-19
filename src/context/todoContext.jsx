import { createContext , useReducer , useContext } from "react";
import todosReducer from "../Reducers/todosReducers";
export const TodoContext = createContext([]);
export const DispatchContext = createContext(null);

const TodoProvider = ({ children }) => {
    const [todos, dispatch] = useReducer(todosReducer, []);
    return (
        <TodoContext.Provider value={{ todos }}>
            <DispatchContext.Provider value={dispatch}>
            {children}
            </DispatchContext.Provider>
        </TodoContext.Provider>
    )
}
export default TodoProvider;
export const useTodo = () => {
    return useContext(TodoContext);
}
export const useDispatch = () => {
    return useContext(DispatchContext);
}