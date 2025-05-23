import {
  Box,
  Typography,
  Button,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  useMediaQuery,
  useTheme
} from "@mui/material"
import {
  PlayArrow,
} from "@mui/icons-material"
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import { CustomizerUser } from "../user/CustomizerUser";
import { scrollbarStyles } from "../themes/ScrollTheme";
import PropTypes from 'prop-types';

/**
 * Componente que muestra la lista de jugadores
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.teamAPlayers - Lista de jugadores del equipo A
 * @param {Array} props.teamBPlayers - Lista de jugadores del equipo B
 * @param {function} props.onStartGame - Funcion para empezar juego
 * @param {boolean} props.isHost - Indica si el usuario actual es el host
 * @param {string} props.host- Nombre del Host del juego
 * @returns {JSX.Element} Lista de jugadores
 */
export const PlayerList = ({teamAPlayers, teamBPlayers, onStartGame, isHost, host})  => {  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <>
          <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                flexGrow: 1,
                overflow: "hidden",
                height:"100vh"
            }}
          >
              {/* Equipo A */}
            <Box
              sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  borderRight: { xs: "none", md: "1px solid rgba(255,255,255,0.1)" },
                  borderBottom: { xs: "1px solid rgba(255,255,255,0.1)", md: "none" },
                  overflow: "auto",
                  ...scrollbarStyles
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography
                    variant="h6"
                    sx={{
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        color: "#2196f3",
                        fontWeight: "bold",
                    }}
              >
                    <WorkspacesIcon sx={{ mr: 1, fontSize: 24 }} /> Team A ({teamAPlayers.length}) 
                    </Typography>
                    <Box
                    sx={{
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center"

                      }}>
                      {!isMobile &&
                        <Avatar
                          sx={{
                              width: "80px",
                              height: "80px",
                              bgcolor: "#2196f3",
                              border: "2px solid white",
                              boxShadow: "0 4px 8px rgba(75, 148, 142, 0.92)",

                            }}>
                            A
                        </Avatar>}
                    </Box>
                  
                  <List dense disablePadding sx={{pt:"10px"}}>
                    {teamAPlayers.map((player) => (
                      <ListItem
                        key={player.id}
                        sx={{
                          bgcolor: "rgba(33, 150, 243, 0.1)",
                          borderRadius: 1,
                          mb: 1,
                          py: 0.5,
                        }}
                      >
                        <ListItemAvatar>
                          <CustomizerUser width={36} height={36} playerName={player.name} playerColor={player.centerColor || '#2196f3'} borderColor={player.borderColor} iconType={player.iconType} iconColor={player.iconColor} icon={player.image}/>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                {player.name}
                              </Typography>
                              {player.name === host && (
                                <Chip
                                  label="Host"
                                  size="small"
                                  sx={{
                                    ml: 1,
                                    height: 20,
                                    fontSize: "0.6rem",
                                    bgcolor: "rgba(255, 215, 0, 0.2)",
                                    color: "#FFD700",
                                  }}
                                />
                              )}
                            </Box>
                          }
                          secondary={
                            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
                              Games won: {player?.gamesWon || 0}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                    {teamAPlayers.length === 0 && (
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", textAlign: "center", py: 1 }}>
                        There are no players in this team
                      </Typography>
                    )}
                  </List>
                </Box>
              </Box>
  
              {/* Equipo B */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "auto",
                  ...scrollbarStyles
                }}
              >
                <Box sx={{ p: 2 }}>
                  
                  <Typography
                    variant="h6"
                    sx={{
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        color: "#f44336",
                        fontWeight: "bold",
                        }}
                    >
                    <WorkspacesIcon sx={{ mr: 1, fontSize: 24 }} /> Team B ({teamBPlayers.length})
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center"

                      }}>
                    {!isMobile &&
                      <Avatar
                      sx={{
                          width: "80px",
                          height: "80px",
                          bgcolor: "#f44336",
                          border: "2px solid white",
                          boxShadow: "0 4px 8px rgba(148, 75, 75, 0.92)",

                        }}>
                        B
                        </Avatar>}
                    </Box>
             
                  <List dense disablePadding sx={{pt:"10px"}}>
                    {teamBPlayers.map((player) => (
                      <ListItem
                        key={player.id}
                        sx={{
                          bgcolor: "rgba(244, 67, 54, 0.1)",
                          borderRadius: 1,
                          mb: 1,
                          py: 0.5,
                        }}
                      >
                        <ListItemAvatar>
                          <CustomizerUser width={36} height={36} playerName={player.name} playerColor={player.centerColor || '#f44336'} borderColor={player.borderColor} iconType={player.iconType} iconColor={player.iconColor} icon={player.image}/>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                {player.name}
                              </Typography>
                              {player.name === host && (
                                <Chip
                                  label="Host"
                                  size="small"
                                  sx={{
                                    ml: 1,
                                    height: 20,
                                    fontSize: "0.6rem",
                                    bgcolor: "rgba(255, 215, 0, 0.2)",
                                    color: "#FFD700",
                                  }}
                                />
                              )}
                            </Box>
                          }
                          secondary={
                            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
                              Games won:  {player?.gamesWon || 0}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                    {teamBPlayers.length === 0 && (
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", textAlign: "center", py: 1 }}>
                        There are no players in this team
                      </Typography>
                    )}
                  </List>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                p: 2,
                borderTop: "2px solid #4CAF50",
                bgcolor: "rgba(27, 94, 32, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                startIcon={<PlayArrow />}
                onClick={onStartGame}
                disabled = {!isHost}
                loadingPosition="start"
                loading = {!isHost}
                sx={{
                  bgcolor: `${isHost ? "#4CAF50" : "transparent"}`,
                  borderColor: "#4CAF50",
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(58, 128, 60, 0.81)",
                  },
                  "&.Mui-disabled": {
                    borderColor: "#4CAF50",
                    color: "rgba(93, 214, 97, 0.81)",
                  }
                }}
              >
                {isHost ? "Start game" : "Waiting for the host to start the game"}
              </Button>
            </Box>
        </>
    )
  }
  PlayerList.propTypes = {
  teamAPlayers: PropTypes.array.isRequired,   
  teamBPlayers: PropTypes.array.isRequired,    
  onStartGame: PropTypes.func.isRequired,      
  isHost: PropTypes.bool.isRequired,           
  host: PropTypes.string.isRequired            
};
