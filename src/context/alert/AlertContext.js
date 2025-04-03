import { createContext, useState, useContext, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";

const AlertContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ open: false, message: "", severity: "success" });

  // Función para mostrar una alerta
  const showAlert = useCallback((message, severity) => {
    setAlert({ open: true, message, severity });
  },[]);
  // Función para cerrar la alerta
  const handleClose = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {/* Componente de alerta global */}
      <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose} >
        <Alert onClose={handleClose} severity={alert.severity} variant="filled" sx={{ width: "100%" }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
