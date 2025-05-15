"use client"
import React, { useState } from "react"
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  DialogContentText,
} from "@mui/material"
import {
  Close,
  Check,
} from "@mui/icons-material";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useLobbyService } from "../../Modules/useLobbyService";
import PropTypes from 'prop-types';
/**
 * Componente crear sala
 * @param {Object} props - Propiedades del componente
 * @param {function} props.OpenDialog - Abrir el dialog
 * * @param {function} props.CloseDialog - Cerrar el dialog
 * @returns {JSX.Element} Componente para crear una sala
 */
export const JoinRoom = ({OpenDialog,CloseDialog}) => {
  const{joinRoom} = useLobbyService();
    const [id, setId] = useState("");
    const [formErrors, setFormErrors] = useState({
      id: false,
    })
    const handleCloseCreateDialog = () => {
      CloseDialog();
      setId("");
      setFormErrors({
        id: false,
      })
    }
  
    const handleRoomInputChange = (e) => {
      const id = e.target.value;
      setId(id);
      if (id === "") {
        setFormErrors({
          ...formErrors,
          id: id.trim() === "",
        });
      }
    }
 
    const handleJoinRoom = async () => {
      if (id.trim() === "") {
        setFormErrors({
          ...formErrors,
          id: true,
        })
        return;
      }
      joinRoom(id);
    }

  return (
    <Dialog
    open={OpenDialog}
    onClose={handleCloseCreateDialog}
    maxWidth="sm"
    fullWidth
    slotProps={{
      paper: {
        component: 'form',
        onSubmit: (e) => {
          e.preventDefault();
          handleJoinRoom();
        },
        sx: {
          borderRadius: 3,
          bgcolor: "#1d4c1f",
          border: "3px solid #4CAF50",
          boxShadow: "0 0 20px rgba(60, 145, 63, 0.42)",
          color: "white",
          overflow: "hidden",
        },
      },
    }}
  
    
  >
    <DialogTitle
      sx={{
        bgcolor: "rgb(75, 145, 61)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "2px solid #4CAF50",
        py: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Diversity3Icon sx={{ mr: 1, color: "white" }} />
        <Typography variant="h6" component="span" sx={{ fontWeight: "bold" }}>
        Join Room
        </Typography>
      </Box>
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleCloseCreateDialog}
        aria-label="close"
        sx={{ color: "white" }}
      >
        <Close />
      </IconButton>
    </DialogTitle>
    <DialogContent
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.7)",
      }}
    >
        <DialogContentText color="white" sx={{mt:2}}>
        Enter the room code to start playing!
        </DialogContentText>
        <TextField
          margin="dense"
          label="Room Id"
          type="text"
          fullWidth
          variant="outlined"
          value={id}
          onChange={handleRoomInputChange}
          error={formErrors.id}
          helperText={formErrors.id ? "The room id is required" : ""}
          required
          InputLabelProps={{
            sx: { color: "rgba(255, 255, 255, 0.7)" },
          }}
          InputProps={{
            sx: {
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.3)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4CAF50",
              },
            },
          }}
        />
      
    </DialogContent>
    <DialogActions
      sx={{
        bgcolor: "rgb(75, 145, 61)",
        borderTop: "2px solid #4CAF50",
        py: 1.5,
        px: 3,
      }}
    >
      <Button
        type="submit"
        variant="contained"
        startIcon={<Check />}
        sx={{
          bgcolor: "white",
          color: "#1b5e20",
          "&:hover": {
            bgcolor: "#e0e0e0",
          },
          ml: 2,
        }}
      >
        Join Room
      </Button>
    </DialogActions>
  </Dialog>
  )
}
JoinRoom.propTypes = {
  OpenDialog: PropTypes.func.isRequired,
  CloseDialog: PropTypes.func.isRequired,
}