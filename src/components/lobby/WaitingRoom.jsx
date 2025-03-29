"use client"
import { useEffect, useState } from "react"
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
import {getGame} from "../../APIServices/gameAPI"
import { PlayerList } from "./PlayerList";
  
export const WaitingRoom = ({currentUser, id,onStartGame,players, leaveRoom})  => {
    const [roomData, setRoomData] = useState({
        gameName: "Sala",
        creatorName: "",
        maxPlayers: 0,
        privateGame: false,
        creationTime: 1743132809.893817300,
        players: []
    });
    const [isInviteOpen, setIsInviteOpen] = useState(false)
    const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false)
    const[teamAPlayers, setTeamAPlayers] = useState([]);
    const[teamBPlayers, setTeamBPlayers] = useState([]);
    const[host, setHost] = useState(false);
    const getRoom = async () => {
        if(id) {
            const response = await getGame(id);
            console.log(response);
            if(response){
            setRoomData(response.data);
            }
        }
      }
      useEffect(() => {
        const fetchRoom = async () => {
          await getRoom();
        };
        if (id && players) { 
            const teamAPlayers = players.filter((player) => player.team === 0);
            setTeamAPlayers(teamAPlayers);
            const teamBPlayers = players.filter((player) => player.team === 1);
            setTeamBPlayers(teamBPlayers);
            console.log(currentUser);
            const host = currentUser === roomData.creatorName;
            setHost(host);
        }
        fetchRoom()
    
    }, [id, players, currentUser, roomData.creatorName]); 

    const startGame = () => {
      if(players.length > 1){
        onStartGame();
      }else{
        alert("Debe haber almenos dos integrantes");
      }
    }

    
  
    const handleCopyInviteCode = () => {
      navigator.clipboard.writeText(roomData.id)
      // Aquí se podría mostrar un mensaje de éxito
    }
  
    const handleLeaveRoom = () => {
      setIsLeaveDialogOpen(false)
      leaveRoom();
      alert("Has abandonado la sala")
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
              {roomData.gameName}
            </Typography>
            <Chip
              label={roomData.privateGame ? "Privada" : "Pública"}
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
            <Tooltip title="Invitar jugadores">
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
            <Tooltip title="Abandonar sala">
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
                <People sx={{ mr: 1 }} /> Jugadores ({players.length}/{roomData.maxPlayers})
              </Typography>
  
            <Chip
                icon={<Timer fontSize="small" />}
                label={`${new Date(roomData.creationTime*1000).toLocaleString()}`}
                size="small"
                sx={{
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: "white",
                    "& .MuiChip-icon": { color: "white" },
                }}
            />
            </Box>
            {/* Contenedor de equipos */}
            <PlayerList teamAPlayers={teamAPlayers} teamBPlayers={teamBPlayers} onStartGame={startGame} host={host}/>
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
            <PersonAdd sx={{ mr: 1 }} /> Invitar Jugadores
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Typography variant="body2" paragraph>
              Comparte este código con tus amigos para que puedan unirse a la sala:
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
              El código expirará cuando finalice la partida o cuando el anfitrión cierre la sala.
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
          <DialogTitle sx={{ bgcolor: "rgba(244, 67, 54, 0.2)", color: "#f44336" }}>¿Abandonar la sala?</DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
            <Typography variant="body1">
                ¿Estás seguro de que quieres abandonar la sala? Perderás tu lugar si la sala está llena.
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
              Cancelar
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
              Abandonar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
  }
  
  
