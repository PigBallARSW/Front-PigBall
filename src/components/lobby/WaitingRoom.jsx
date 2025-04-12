import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import {
  SportsSoccer,
  ExitToApp,
  PersonAdd,
  ContentCopy,
  People,
  Public,
  Lock,
  Timer,
} from "@mui/icons-material"
import { PlayerList } from "./PlayerList";
import { useWaitingRoom } from "../../context/lobby/useWaitingRoom";
import { useTeams } from "../../context/lobby/useTeams";
import { useUser } from "../../context/user/userContext";

export const WaitingRoom = ({ id, onStartGame, players, leaveRoom }) => {
  const user = useUser();
  const currentUser = user?.username || sessionStorage.getItem("username");
  const{roomData} = useWaitingRoom(id);
  const{teamAPlayers, teamBPlayers, host} = useTeams(players, currentUser, roomData.creatorName);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const startGame = () => {
    if (players.length > 1) {
      onStartGame();
    } else {
      alert("There must be at least two members");
    }
  }
  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText(roomData.id);
    // Aquí se podría mostrar un mensaje de éxito
  }
  const handleLeaveRoom = () => {
    setIsLeaveDialogOpen(false);
    leaveRoom();
  }
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        padding: 0,
        overflow: "hidden",
        boxSizing: "border-box",
        position: "relative",
      }}
    >

      {/* Barra superior */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(5px)",
          borderBottom: "2px solid #4CAF50",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "white",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
            }}
          >
            <SportsSoccer sx={{ mr: 1, color: "#4CAF50" }} />
            {roomData.lobbyName}
          </Typography>
          <Chip
            label={roomData.privateLobby ? "Privada" : "Pública"}
            size="small"
            icon={roomData.privateLobby ? <Lock fontSize="small" /> : <Public fontSize="small" />}
            sx={{
              ml: 2,
              bgcolor: roomData.privateLobby ? "rgba(244, 67, 54, 0.2)" : "rgba(76, 175, 80, 0.2)",
              color: "white",
              "& .MuiChip-icon": { color: "white" },
              display: { xs: "none", sm: "flex" },
            }}
          />
          <Chip
            label={roomData.status}
            size="small"
            sx={{
              ml: 1,
              color: "white",
              display: { xs: "none", sm: "flex" },
              border: "1px solid rgba(33, 150, 243, 0.7)",
              fontWeight: "bold",
            }}
            variant="outlined"
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Invite players">
            <IconButton
              onClick={() => setIsInviteOpen(true)}
              sx={{
                color: "white",
                mr: { xs: 0, sm: 1 },
                bgcolor: "rgba(255,255,255,0.1)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              }}
            >
              <PersonAdd />
            </IconButton>
          </Tooltip>
          <Tooltip title="Leave room">
            <IconButton
              onClick={() => setIsLeaveDialogOpen(true)}
              sx={{
                color: "white",
                bgcolor: "rgba(244, 67, 54, 0.2)",
                "&:hover": { bgcolor: "rgba(244, 67, 54, 0.3)" },
              }}
            >
              <ExitToApp />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Contenido principal */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            height: "auto",
            flexGrow: 0,
            display: "flex",
            flexDirection: "column",
            bgcolor: "rgba(0,0,0,0.7)",
            color: "white",
            borderRadius: 0,
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}
        >
          {/* Cabecera con información del partido */}
          <Box
            sx={{
              p: 2,
              borderBottom: "2px solid #4CAF50",
              bgcolor: "rgba(27, 94, 32, 0.5)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1, sm: 0 },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
              <People sx={{ mr: 1 }} /> Players ({players.length}/{roomData.maxPlayers})
            </Typography>

            <Chip
              icon={<Timer fontSize="small" />}
              label={`${new Date(roomData.creationTime * 1000).toLocaleString()}`}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                color: "white",
                "& .MuiChip-icon": { color: "white" },
              }}
            />
          </Box>
          {/* Contenedor de equipos */}
          <PlayerList teamAPlayers={teamAPlayers} teamBPlayers={teamBPlayers} onStartGame={startGame} host={roomData.creatorName} isHost={host} />
        </Paper>
      </Box>

      {/* Diálogo de invitación */}
      <Dialog
        open={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#222",
            color: "white",
            borderRadius: 2,
            border: "2px solid #4CAF50",
          },
        }}
      >
        <DialogTitle sx={{ bgcolor: "rgba(27, 94, 32, 0.9)", display: "flex", alignItems: "center" }}>
          <PersonAdd sx={{ mr: 1 }} /> Invite Players
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography variant="body2" paragraph>
          Share this code with your friends so they can join the room:
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "rgba(255,255,255,0.1)",
              p: 2,
              borderRadius: 1,
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "monospace",
                fontWeight: "bold",
                color: "#4CAF50",
                flexGrow: 1,
                textAlign: "center",
              }}
            >
              {roomData.id}
            </Typography>
            <IconButton
              onClick={handleCopyInviteCode}
              sx={{
                color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
              }}
            >
              <ContentCopy />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
          The code will expire when the match ends or when the host closes the room.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "rgba(27, 94, 32, 0.5)", p: 2 }}>
          <Button
            onClick={() => setIsInviteOpen(false)}
            variant="contained"
            sx={{
              bgcolor: "white",
              color: "#1b5e20",
              "&:hover": {
                bgcolor: "#e0e0e0",
              },
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de confirmación para abandonar */}
      <Dialog
        open={isLeaveDialogOpen}
        onClose={() => setIsLeaveDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#222",
            color: "white",
            borderRadius: 2,
            border: "2px solid #f44336",
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
    </Box>
  )
}


