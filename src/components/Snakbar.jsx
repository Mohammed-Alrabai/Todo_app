import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { SnackBarContext } from "../context/SnackbarContext";
import { useContext } from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ open, setOpen , message , type }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{ width: "100%", textAlign: "right", ml: "1rem", direction: "rtl" }}>
        {message} 
      </Alert>
    </Snackbar>
  );
}
