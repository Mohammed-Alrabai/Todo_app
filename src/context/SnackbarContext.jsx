import { createContext, useState , useContext } from "react";
import Snakbar from "../components/Snakbar";

export const SnackBarContext = createContext({});
export const SnckBarProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [open, setOpen] = useState(false);
  const showSnackbar = (message, type) => {
    setOpen(true);
    setMessage(message);
    setType(type);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };
  return (
    <SnackBarContext.Provider value={{ showSnackbar }}>
      <Snakbar open={open} setOpen={setOpen} message={message} type={type} />
      {children}
    </SnackBarContext.Provider>
  );
};
export const useSnackBar = () => {
  return useContext(SnackBarContext);
}