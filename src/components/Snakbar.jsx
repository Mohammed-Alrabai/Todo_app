import * as React from "react";
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
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
      <Alert onClose={handleClose} severity={type} variant="filled" sx={{ direction: "rtl" }}>
        <span style={{padding: "0 1rem"}}>{message}</span>
      </Alert>
    </Snackbar>
  );
}
