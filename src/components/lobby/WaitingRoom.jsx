import React, { useEffect, useState } from "react";
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
import { useTeams } from "../../context/lobby/useTeams";
import { useUser } from "../../context/user/userContext";
import { LeaveDialog } from "../dialog/LeaveDialog";
import PropTypes from 'prop-types';

/**
 * Sala de espera
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.roomData - Configuracion del juego
 * @param {function} props.leaveRoom - Función para abandonar juego
 * @param {function} props.onStartGame - Función para empezar juego
 * @returns {JSX.Element} Componente de sala de espera
 */
export const WaitingRoom = React.memo(function WaitingRoom({ onStartGame, leaveRoom, roomData }) {
  const {playerData} = useUser();
  const currentUser = playerData?.username || sessionStorage.getItem("username");
  const{teamAPlayers, teamBPlayers, fetchCustomizations} = useTeams();
  const [host, setHost] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);

  useEffect(() => {
      fetchCustomizations(roomData.players);
      const isHost = currentUser === roomData.creatorName;
      setHost(isHost);
  }, [fetchCustomizations, roomData?.players]);

  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText(roomData.id);
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
            {roomData.gameName}
          </Typography>
          <Chip
            label={roomData.privateGame ? "Private" : "Públic"}
            size="small"
            icon={roomData.privateGame ? <Lock fontSize="small" /> : <Public fontSize="small" />}
            sx={{
              ml: 2,
              bgcolor: roomData.privateGame ? "rgba(244, 67, 54, 0.2)" : "rgba(76, 175, 80, 0.2)",
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
              <People sx={{ mr: 1 }} /> Players ({roomData.players.length}/{roomData.maxPlayers})
            </Typography>

            <Chip
              icon={<Timer fontSize="small" />}
              label={`${new Date(roomData.creationTime).toLocaleString()}`}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.1)",
                color: "white",
                "& .MuiChip-icon": { color: "white" },
              }}
            />
          </Box>
          <PlayerList teamAPlayers={teamAPlayers} teamBPlayers={teamBPlayers} onStartGame={onStartGame} host={roomData.creatorName} isHost={host} />
        </Paper>
      </Box>
      <Dialog
        open={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{
          paper: {
            sx: {
                bgcolor: "#222",
                color: "white",
                borderRadius: 2,
                border: "2px solid #4CAF50",
            },
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
      <LeaveDialog leaveRoom={handleLeaveRoom} isLeaveDialogOpen={isLeaveDialogOpen} setIsLeaveDialogOpen={setIsLeaveDialogOpen} />
    </Box>
  )
})

WaitingRoom.propTypes = {
  roomData: PropTypes.shape({
      id: PropTypes.string.isRequired,
      gameName: PropTypes.string.isRequired,
      creatorName: PropTypes.string.isRequired,
      creationTime: PropTypes.string.isRequired,
      startTime: PropTypes.string,
      maxPlayers: PropTypes.number.isRequired,
      privateGame: PropTypes.bool.isRequired,
      borderX: PropTypes.number,
      borderY: PropTypes.number,
      status: PropTypes.string,
      events: PropTypes.arrayOf(
        PropTypes.shape({
          first: PropTypes.string,
          second: PropTypes.string
        })
      ),
      players: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          team: PropTypes.number.isRequired,
          sessionId: PropTypes.string,
          kicking: PropTypes.bool,
          x: PropTypes.number,
          y: PropTypes.number
        })
      ).isRequired,
      ball: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        velocityX: PropTypes.number,
        velocityY: PropTypes.number
      }),
      teams: PropTypes.shape({
        first: PropTypes.number,
        second: PropTypes.number
      })
    }).isRequired,      
  leaveRoom: PropTypes.func.isRequired,       
  onStartGame: PropTypes.func.isRequired,    
};

