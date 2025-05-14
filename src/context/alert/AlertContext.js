import React, { createContext, useState, useContext, useCallback, useMemo } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types';


const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

/**Mostrar alertas
 * @param {JSX.Element} props.children -Elmentos donde mostrar alertas
 * @returns {JSX.Element} Contexto para mostrar alertas
 */
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

  const contextValue = useMemo(() => ({ showAlert }), [showAlert]);

  return (
    <AlertContext.Provider value={contextValue }>
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
AlertProvider.propTypes = {
  children: PropTypes.node.isRequired
};