import * as React from 'react';
import { createContext, useState, useContext, useCallback } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  const showAlert = useCallback((message, severity) => {
    setAlert({ open: true, message, severity });
  },[]);
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
        <Snackbar 
          open={alert.open} 
          autoHideDuration={2000} 
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={alert.severity} variant="filled" sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
    </AlertContext.Provider>
  );
};
