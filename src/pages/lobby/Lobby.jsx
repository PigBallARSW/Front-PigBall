"use client"
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import {
  Add,
  Refresh,
  Search,
  Public
} from "@mui/icons-material";
import LoginIcon from '@mui/icons-material/Login';
import { RoomList } from '../../components/lobby/RoomList';
import { CreateRoom } from "../../components/lobby/CreateRoom";
import { JoinRoom } from "../../components/lobby/JoinRoom";
import { useRooms } from "../../context/lobby/useRooms";
import { useLobby } from "../../context/lobby/useLobby";
import Loading from "../../components/Load/Loading";

export const Lobby = () => {
  const {rooms, isRefreshing, getRooms} = useRooms();
  const {filteredRooms, searchTerm, setSearchTerm} = useLobby(rooms);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  function showForm() {
    setOpenCreateDialog(true);
  }
  function hideForm() {
    setOpenCreateDialog(false);
  }
  function showFormJoin() {
    setOpenJoinDialog(true);
  }
  function hideFormJoin() {
    setOpenJoinDialog(false);
  }
  if (isRefreshing) {
    return <Loading />
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 1,
        overflow: "hidden",
        height: "calc(100vh - 56px)"
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: 1000,
          height: "100%",
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid #fff",
          bgcolor: "#0e250f",
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: "divider",
            borderBottom: "2px solid #4CAF50",
            background: "linear-gradient(to right,rgb(69, 138, 55),rgb(90, 153, 82))",
            color: "white"
          }}
        >
          <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", display: "flex", alignItems: "center", }}>
            <Public sx={{ mr: 1 }} />
            Available Rooms
          </Typography>

          <Box>
          <Button
              variant="contained"
              onClick={showFormJoin}
              startIcon={<LoginIcon />}
              sx={{
                mr: 1,
                display: { xs: "none", sm: "inline-flex" },
                bgcolor: "primary.light",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              Join Room
            </Button>
            <Button
              variant="contained"
              onClick={showForm}
              startIcon={<Add />}
              sx={{
                mr: 1,
                display: { xs: "none", sm: "inline-flex" },
                bgcolor: "secondary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "secondary.dark",
                },
              }}
            >
              Create Room
            </Button>
            <IconButton
              color="primary"
              onClick={getRooms}
              disabled={isRefreshing}
              sx={{
                display: { xs: "none", sm: "inline-flex" },
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              {isRefreshing ? <CircularProgress size={24} sx={{ color: "secondary.main" }} /> : <Refresh />}
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ p: 2, borderColor: "divider", borderBottom: "2px solid #4CAF50", bgcolor: "rgb(75, 145, 61)" }}>
          <TextField
            fullWidth
            placeholder="Search for a room by name, host, or type..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "white" }} />
                </InputAdornment>
              ),
              sx: {
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.8)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.7)",
                },
              },
            }}
            sx={{
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(255, 255, 255, 0.7)",
                opacity: 1,
              },
            }}
          />
        </Box>

        <RoomList gameRooms={filteredRooms} />
        {/* Botones flotantes para móvil */}
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            display: { xs: "flex", sm: "none" },
            flexDirection: "column",
            gap: 1,
          }}
        >
          <IconButton
            color="primary"
            onClick={getRooms}
            disabled={isRefreshing}
            sx={{
              bgcolor: "white",
              boxShadow: 3,
              "&:hover": { bgcolor: "white" },
            }}
          >
            {isRefreshing ? <CircularProgress size={24} /> : <Refresh />}
          </IconButton>
          <IconButton
            onClick={showForm}
            sx={{
              bgcolor: "secondary.main",
              color: "white",
              boxShadow: 3,
              "&:hover": { bgcolor: "secondary.dark" },
            }}
          >
            <Add />
          </IconButton>
          <IconButton
            onClick={showFormJoin}
            sx={{
              bgcolor: "primary.light",
              color: "white",
              boxShadow: 3,
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            <LoginIcon />
          </IconButton>
        </Box>
      </Paper>
      <CreateRoom OpenDialog={openCreateDialog} CloseDialog={hideForm} getRooms={getRooms}/>
      <JoinRoom OpenDialog={openJoinDialog} CloseDialog={hideFormJoin} />
    </Box>
  )
}
