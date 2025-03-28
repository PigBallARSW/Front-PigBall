"use client"
import { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar
} from "@mui/material"
import {
  SportsSoccer,
  ExitToApp,
  PlayArrow,
  PersonAdd,
  ContentCopy,
  People,
  EmojiEvents,
  AccessTime,
  Public,
  Lock,
  ArrowBack,
  Timer,
} from "@mui/icons-material"
import Groups2Icon from '@mui/icons-material/Groups2';
import { User } from "../user/User"
import {getGame} from "../../APIServices/gameAPI"
  
export const PlayerList = ({teamAPlayers, teamBPlayers, onStartGame, host})  => {
    // Estados para los nombres de los equipos
        const [teamNames, setTeamNames] = useState({
          A: "Equipo A",
          B: "Equipo B",
        })
    return (
        <>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                flexGrow: 1,
                overflow: "hidden",
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
                    <Groups2Icon sx={{ mr: 1, fontSize: 24 }} /> {teamNames.A} ({teamAPlayers.length})
                    </Typography>
                    <Box
                    sx={{
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center"

                      }}>
                    <Avatar
                    sx={{
                        width: "80px",
                        height: "80px",
                        bgcolor: "#2196f3",
                        border: "2px solid white",
                        boxShadow: "0 4px 8px rgba(75, 148, 142, 0.92)",

                      }}>
                        {teamNames.A[0]}
                        </Avatar>
                    </Box>
                  
                  <List dense disablePadding sx={{pt:"10px"}}>
                    {teamAPlayers.map((player,i) => (
                      <ListItem
                        key={i}
                        sx={{
                          bgcolor: "rgba(33, 150, 243, 0.1)",
                          borderRadius: 1,
                          mb: 1,
                          py: 0.5,
                        }}
                      >
                        <ListItemAvatar>
                            <User width={36} height={36} name={player.name} move={false} border={"transparent"} color={"#2196f3"}/>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                {player.name}
                              </Typography>
                              {host && (
                                <Chip
                                  label="Anfitrión"
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
                              Partidas ganadas: 30
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                    {teamAPlayers.length === 0 && (
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", textAlign: "center", py: 1 }}>
                        No hay jugadores en este equipo
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
                    <Groups2Icon sx={{ mr: 1, fontSize: 24 }} /> {teamNames.B} ({teamBPlayers.length})
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center"

                      }}>
                    <Avatar
                    sx={{
                        width: "80px",
                        height: "80px",
                        bgcolor: "#f44336",
                        border: "2px solid white",
                        boxShadow: "0 4px 8px rgba(148, 75, 75, 0.92)",

                      }}>
                        {teamNames.B[0]}
                        </Avatar>
                    </Box>
             
                  <List dense disablePadding sx={{pt:"10px"}}>
                    {teamBPlayers.map((player,i) => (
                      <ListItem
                        key={i}
                        sx={{
                          bgcolor: "rgba(244, 67, 54, 0.1)",
                          borderRadius: 1,
                          mb: 1,
                          py: 0.5,
                        }}
                      >
                        <ListItemAvatar>
                            <User width={36} height={36} name={player.name} move={false} border={"transparent"} color={"#f44336"}/>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                {player.name}
                              </Typography>
                              {host && (
                                <Chip
                                  label="Anfitrión"
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
                              Partidas ganadas: 30
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                    {teamBPlayers.length === 0 && (
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", textAlign: "center", py: 1 }}>
                        No hay jugadores en este equipo
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
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                startIcon={<PlayArrow />}
                onClick={onStartGame}
                disabled = {!host}
                sx={{
                  flex: 1,
                  mr: 1,
                  bgcolor: "transparent",
                  borderColor: "#4CAF50",
                  color: "#4CAF50",
                  "&:hover": {
                    bgcolor: "rgba(76, 175, 80, 0.1)",
                  },
                  "&.Mui-disabled": {
                    borderColor: "#4CAF50",
                    color: "rgba(255, 255, 255, 0.49)",
                      }
                }}
              >
                {host ? "Empezar partida" : "Esperando a que el anfitrión inicie partida"}
              </Button>
            </Box>
        </>
    )
  }