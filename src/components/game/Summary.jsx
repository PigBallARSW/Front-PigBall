"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Grid,
} from "@mui/material"
import { alpha, keyframes } from "@mui/material/styles"
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import ShieldIcon from "@mui/icons-material/Shield"
import StarIcon from "@mui/icons-material/Star"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import BarChartIcon from "@mui/icons-material/BarChart"
import ReplayIcon from "@mui/icons-material/Replay"
import CompareArrowsIcon from "@mui/icons-material/CompareArrows"
import { motion } from "framer-motion";
import { useCalculateInfo } from "../../context/game/useCalculateInfo"
import { useGoal } from "../../context/game/useGoal"
import { useUserLogin } from "../../Modules/useUserLogin"
import { CustomizerUser } from "../user/CustomizerUser"
import { useUser } from "../../context/user/userContext"
import { scrollbarStyles } from "../themes/ScrollTheme"

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export default function Summary({ gameState, onExit }) {
  const {usersCharacters} = useUserLogin();
  const {playersGoal, updatesGoal} = useGoal()
  const [showContent, setShowContent] = useState(false)
  const {assists, playersAssist, playersGoals, calculateGoalNumber, calculateAssistNumber} = useCalculateInfo();
  const {playerData} = useUser();
  const blueWins = gameState?.teams.first > gameState?.teams.second || 0
  const redWins = gameState?.teams.second > gameState?.teams.first || 0
  const isDraw = gameState?.teams.first === gameState?.teams.second || 0

  const winnerColor = blueWins ? "#1976d2" : redWins ? "#dc004e" : "#4caf50"
  const winnerTeam = blueWins ? "A" : redWins ? "B" : "DRAW"

  const topScorer = playersGoal.length > 0
  ? playersGoal.reduce((max, player) => player.goal > max.goal ? player : max)
  : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const fetchCustomizations = async () => {
      const players = []
      if(playerData.authenticated){
        const users = gameState.players.map((p) => p.id)
        let characters = await usersCharacters(users)
        if(characters){
            gameState.players.forEach((player) => {
                let customization = {}
                const custom = characters.find((p) => p.id === player.id);
                if(custom){
                  customization = {
                    image: custom.image,
                    borderColor: custom.borderColor,
                    centerColor: custom.centerColor,
                    iconType: custom.iconType,
                    iconColor: custom.iconColor
                  };
                }else{
                  customization = {
                    image: null,
                    borderColor: null,
                    centerColor: null,
                    iconType: null,
                    iconColor: null
                  };
                }
                const data = {
                    id: player.id,
                    name: player.name,
                    team: player.team,
                    x: player.x,
                    y: player.y,
                    ...customization
                };
                players.push(data)
            });
        }
      }else{
        gameState.players.forEach((player) => {
          const data = {
              id: player.id,
              name: player.name,
              team: player.team,
              x: player.x,
              y: player.y,
              image: null,
              borderColor: null,
              centerColor: null,
              iconType: null,
              iconColor: null
          };
          players.push(data)
        });
      }
      updatesGoal(gameState, players)
      calculateGoalNumber(playersGoal);
      calculateAssistNumber(gameState, players);
    }
    fetchCustomizations()
  }, [])

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backgroundColor: alpha("#000", 0.7),
        backdropFilter: "blur(8px)",
        p: 2,
      }}
    >
      <Paper
        elevation={24}
        sx={{
          bgcolor: alpha("#121212", 0.95),
          borderRadius: 4,
          width: "100%",
          maxWidth: 900,
          maxHeight: "90vh",
          overflow: "auto",
          border: `4px solid ${winnerColor}`,
          boxShadow: `0 0 30px ${alpha(winnerColor, 0.5)}`,
          animation: `${fadeIn} 0.8s ease-out`,
          position: "relative",
          overflowX: "hidden",
          ...scrollbarStyles,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            opacity: 0.05,
            animation: `${rotate} 20s linear infinite`,
            zIndex: 0,
          }}
        >
          <SportsSoccerIcon sx={{ fontSize: 200, color: "white" }} />
        </Box>
        <Box
          sx={{
            p: { xs: 2, md: 4 },
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            bgcolor: alpha(winnerColor, 0.2),
            borderBottom: `2px solid ${alpha(winnerColor, 0.5)}`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "white",
              mb: 1,
              animation: showContent ? `${fadeIn} 0.8s ease-out` : "none",
            }}
          >
            MATCH OVER
          </Typography>

          {isDraw ? (
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: winnerColor,
                mb: 2,
                animation: showContent ? `${fadeIn} 1s ease-out, ${pulse} 2s infinite` : "none",
              }}
            >
              DRAW!
            </Typography>
          ) : (
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: winnerColor,
                mb: 2,
                animation: showContent ? `${fadeIn} 1s ease-out, ${pulse} 2s infinite` : "none",
              }}
            >
              TEAM {winnerTeam} VICTORY!
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
              animation: showContent ? `${fadeIn} 1.2s ease-out` : "none",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: alpha("#1976d2", blueWins ? 0.3 : 0.1),
                p: 2,
                borderRadius: 2,
                border: blueWins ? `2px solid #1976d2` : "none",
              }}
            >
              <ShieldIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
              {gameState?.teams.first || 0}
              </Typography>
            </Box>

            <Typography variant="h5" sx={{ mx: 2, color: "white" }}>
              -
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: alpha("#dc004e", redWins ? 0.3 : 0.1),
                p: 2,
                borderRadius: 2,
                border: redWins ? `2px solid #dc004e` : "none",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#dc004e" }}>
              {gameState?.teams.second || 0}
              </Typography>
              <ShieldIcon sx={{ ml: 1, fontSize: 30, color:"#dc004e" }} />
            </Box>
          </Box>
          {!isDraw && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2,
                animation: showContent ? `${fadeIn} 1.4s ease-out` : "none",
              }}
            >
              <EmojiEventsIcon
                sx={{
                  fontSize: 60,
                  color: "#FFD700",
                  animation: `${pulse} 2s infinite`,
                  filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))",
                }}
              />
            </Box>
          )}
        </Box>
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Box
            sx={{
              mb: 4,
              animation: showContent ? `${fadeIn} 1.6s ease-out` : "none",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                color: "white",
              }}
            >
              <BarChartIcon sx={{ mr: 1 }} />
              MATCH STATS
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: alpha("#333", 0.5),
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: "white", mb: 1 }}>
                  Assists
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body2" sx={{ color: "#1976d2", width: "40px" }}>
                    {playersAssist.blue > 0 || playersAssist.red > 0 ? (playersAssist.blue*100)/(playersAssist.blue+playersAssist.red) +"%" : "%0"}
                    </Typography>
                    <Box sx={{ flexGrow: 1, mx: 1 }}>
                      <Box
                        sx={{
                          height: "8px",
                          borderRadius: "4px",
                          bgcolor: "#333",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            height: "100%",
                            width: `${playersAssist.blue > 0 || playersAssist.red > 0 
                                ? Math.round((playersAssist.blue * 100) / (playersAssist.blue + playersAssist.red)) 
                                : 0}%`,
                            bgcolor: "#1976d2",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            height: "100%",
                            width: `${playersAssist.blue > 0 || playersAssist.red > 0 
                                ? Math.round((playersAssist.red * 100) / (playersAssist.blue + playersAssist.red)) 
                                : 0}%`,
                            bgcolor: "#dc004e",
                          }}
                        />
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#dc004e", width: "40px", textAlign: "right" }}>
                    {playersAssist.blue > 0 || playersAssist.red > 0 ? (playersAssist.red*100)/(playersAssist.blue+playersAssist.red) +"%" : "%0"}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper
                  sx={{
                    p: 2,
                    bgcolor: alpha("#333", 0.5),
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: "white", mb: 1 }}>
                  Goals
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "#1976d2",
                      }}
                    >
                      <ShieldIcon fontSize="small" sx={{ mr: 0.5 }} />
                      <Typography variant="h6">{playersGoals.blue}</Typography>
                    </Box>
                    <Box sx={{ mx: 2, color: "white" }}>-</Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "#dc004e",
                      }}
                    >
                      <Typography variant="h6">{playersGoals.red}</Typography>
                      <ShieldIcon fontSize="small" sx={{ ml: 0.5 }} />
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {topScorer &&
          <Box
            sx={{
              mb: 4,
              animation: showContent ? `${fadeIn} 1.8s ease-out` : "none",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                color: "white",
              }}
            >
            <StarIcon sx={{ mr: 1, color: "#FFD700" }} />
              MOST VALUABLE PLAYER
            </Typography>
            <Paper
              sx={{
                p: 3,
                bgcolor: alpha((topScorer.team === 0 ? "#1976d2" : "#dc004e"), 0.2),
                borderRadius: 2,
                border: `1px solid ${alpha(
                   (topScorer.team === 0 ? "#1976d2" : "#dc004e"),
                  0.5,
                )}`,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
              }}
            >
              <motion.div
                animate={{ y: [0, -20, 0, -20, 0] }} 
                transition={{
                  duration: 1.5, 
                  times: [0, 0.2, 0.4, 0.6, 1], 
                  repeat: Infinity, 
                  repeatDelay: 3, 
                  ease: "easeInOut", 
                  }}
              >
                <CustomizerUser 
                width={80} 
                height={80} 
                playerName={topScorer.name} 
                playerColor={topScorer.centerColor || topScorer.team === 0 ? "#1976d2" : "#dc004e"} 
                borderColor={"#FFD700"} 
                iconType={topScorer.iconType} 
                iconColor={topScorer.iconColor} 
                icon={topScorer.image}
                shadow={"0 0 15px rgba(255, 215, 0, 0.5)"} />
                </motion.div>
              <Box sx={{ textAlign: { xs: "center", sm: "left" }, ml: { xs: 0, sm: 3 } }}>
                <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
                    {topScorer.name}
                </Typography>
                <Typography variant="body1" sx={{ color: "white", opacity: 0.7, mb: 1 }}>
                  {topScorer.team === 0 ? "Team A" : "Team B"}
                </Typography>
                <Chip
                  icon={<EmojiEventsIcon />}
                  label="MVP of the match"
                  sx={{
                    bgcolor: "#FFD700",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                />
              </Box>
            </Paper>
          </Box>}
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <Box
                sx={{
                mb: 4,
                animation: showContent ? `${fadeIn} 2s ease-out` : "none",
                }}
            >
                <Typography
                variant="h6"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    color: "white",
                }}
                >
                <SportsSoccerIcon sx={{ mr: 1 }} />
                GOAL SCORES
                </Typography>
                {playersGoal.length > 0 ? (
                <List sx={{ bgcolor: alpha("#333", 0.3), borderRadius: 2 }}>
                {playersGoal.map((scorer, index) => (
                    <ListItem
                    key={index}
                    sx={{
                        borderBottom: index < playersGoal.length - 1 ? `1px solid ${alpha("#fff", 0.1)}` : "none",
                    }}
                    >
                    <ListItemAvatar>
                    <CustomizerUser 
                      width={40} 
                      height={40} 
                      playerName={scorer.name} 
                      playerColor={scorer.centerColor || scorer.team === 0 ? "#1976d2" : "#dc004e"} 
                      borderColor={scorer.borderColor} 
                      iconType={scorer.iconType} 
                      iconColor={scorer.iconColor} 
                      icon={scorer.image}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                        <Typography variant="subtitle1" sx={{ color: "white" }}>
                            {scorer.name}
                        </Typography>
                        }
                        secondary={
                        <Typography variant="body2" sx={{ color: "white", opacity: 0.7 }}>
                            Team {scorer.team === 0 ? "A" : "B"}
                        </Typography>
                        }
                    />
                    <Chip
                        label={`${scorer.goal} ${scorer.goal === 1 ? "goal" : "goals"}`}
                        size="small"
                        sx={{
                        bgcolor: alpha(scorer.team === 0 ? "#1976d2" : "#dc004e", 0.2),
                        color: scorer.team === 0 ? "#1976d2" : "#dc004e",
                        border: `1px solid ${alpha(scorer.team === 0 ? "#1976d2" : "#dc004e", 0.5)}`,
                        }}
                    />
                    </ListItem>
                ))}
                </List>) : (
                        <Box sx={{ p: 3, textAlign: "center" }}>
                          <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>There are no players who made goals.
                          </Typography>
                        </Box>
                      )}
            </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Box
                sx={{
                mb: 4,
                animation: showContent ? `${fadeIn} 2s ease-out` : "none",
                }}
            >
                <Typography
                variant="h6"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    color: "white",
                }}
                >
                <CompareArrowsIcon sx={{ mr: 1 }} />
                ASSISTS
                </Typography>
                {assists.length > 0 ? (
                <List sx={{ bgcolor: alpha("#333", 0.3), borderRadius: 2 }}>
                {assists.map((scorer, index) => (
                    <ListItem
                    key={index}
                    sx={{
                        borderBottom: index < playersGoal.length - 1 ? `1px solid ${alpha("#fff", 0.1)}` : "none",
                    }}
                    >
                    <ListItemAvatar>
                    <CustomizerUser 
                      width={40} 
                      height={40} 
                      playerName={scorer.name} 
                      playerColor={scorer.centerColor || scorer.team === 0 ? "#1976d2" : "#dc004e"} 
                      borderColor={scorer.borderColor} 
                      iconType={scorer.iconType} 
                      iconColor={scorer.iconColor} 
                      icon={scorer.image}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                        <Typography variant="subtitle1" sx={{ color: "white" }}>
                            {scorer.name}
                        </Typography>
                        }
                        secondary={
                        <Typography variant="body2" sx={{ color: "white", opacity: 0.7 }}>
                            Team {scorer.team === 0 ? "A" : "B"}
                        </Typography>
                        }
                    />
                    <Chip
                        label={`${scorer.assist} ${scorer.assist === 1 ? "assist" : "assists"}`}
                        size="small"
                        sx={{
                        bgcolor: alpha(scorer.team === 0 ? "#1976d2" : "#dc004e", 0.2),
                        color: scorer.team === 0 ? "#1976d2" : "#dc004e",
                        border: `1px solid ${alpha(scorer.team === 0 ? "#1976d2" : "#dc004e", 0.5)}`,
                        }}
                    />
                    </ListItem>
                ))}
                </List>) : (
                        <Box sx={{ p: 3, textAlign: "center" }}>
                          <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>There are no players who made assists.
                          </Typography>
                        </Box>
                      )}
            </Box>
            </Grid>
            </Grid>
          <Button
              variant="outlined"
              size="large"
              startIcon={<ExitToAppIcon />}
              onClick={onExit}
              sx={{
                width: "100%",
                py: 1.5,
                px: 4,
                borderRadius: 2,
                color: "white",
                borderColor: "white",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: alpha("#fff", 0.1),
                },
              }}
            >
              Go out
            </Button>
        </Box>
      </Paper>
    </Box>
  )
}
