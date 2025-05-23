import React from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import {
  ExitToApp,
} from "@mui/icons-material"
import PropTypes from 'prop-types'

/**
 * Componente para abrir confirmar si se desea salir del juego
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.isLeaveDialogOpen - Booleano para abrir el dialogo
 * @param {function} props.leaveRoom - Función que llama al broker para abandonar juego
 * @param {function} props.setIsLeaveDialogOpen - Función para cerrar el dialogo
 * @returns {JSX.Element} Componente de dialogo para dejar el juego
 */
export const LeaveDialog = ({leaveRoom, isLeaveDialogOpen, setIsLeaveDialogOpen}) => {
  const handleLeaveRoom = () => {
    setIsLeaveDialogOpen(false);
    leaveRoom();
  }

  return (
    <Dialog
        open={isLeaveDialogOpen}
        onClose={() => setIsLeaveDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              bgcolor: "#222",
              color: "white",
              borderRadius: 2,
              border: "2px solid #f44336",
            },
          },
        }}
      >
        <DialogTitle sx={{ bgcolor: "rgba(244, 67, 54, 0.2)", color: "#f44336" }}>Leave the room?</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="body1">
          Are you sure you want to leave the room? You'll lose your spot if the room is full.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setIsLeaveDialogOpen(false)}
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
                bgcolor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLeaveRoom}
            variant="contained"
            color="error"
            startIcon={<ExitToApp />}
            sx={{
              ml: 1,
            }}
          >
            Leave
          </Button>
        </DialogActions>
    </Dialog>
  )
}

LeaveDialog.propTypes = {
    isLeaveDialogOpen: PropTypes.bool.isRequired,
    leaveRoom: PropTypes.func.isRequired,
    setIsLeaveDialogOpen: PropTypes.func.isRequired
};
