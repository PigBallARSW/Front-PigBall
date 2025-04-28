"use client"
import { useCallback, useEffect, useState } from "react"
import { Box, Typography, Paper, Tabs, Tab, Chip, Grid, Divider, IconButton, Tooltip } from "@mui/material"
import { alpha } from "@mui/material/styles"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ShieldIcon from "@mui/icons-material/Shield"
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun"
import { useUser } from "../../context/user/userContext"
import { useTeams } from "../../context/lobby/useTeams"
import { User } from "../user/User"
import { useCalculateInfo } from "../../context/game/useCalculateInfo"

export default function TeamDetails({gameState, playersGoal}) {
    const user = useUser();
    const currentUser = user?.username || sessionStorage.getItem("username");
    const {teamAPlayers, teamBPlayers} = useTeams(gameState?.players, currentUser, gameState?.creatorName)
    const [selectedTeam, setSelectedTeam] = useState("blue")
    const [expanded, setExpanded] = useState(false)
    const [currentTeam, setCurrentTeam] = useState([]);
    const {playersAssist, playersGoals, calculateGoalNumber, calculateAssistNumber} = useCalculateInfo();
    const handleTeamChange = (event, newValue) => {
        setSelectedTeam(newValue)
    }
    const toggleExpand = () => {
        setExpanded(!expanded)
    }
    const teamColor = selectedTeam === "blue" ? "#1976d2" : "#dc004e"
    const teamName = selectedTeam === "blue" ? "Team A" : "Team B"
    const calculateTeam = useCallback(() => {
        const current = selectedTeam === "blue" ? teamAPlayers : teamBPlayers
        const updatedTeam = current.map((player) => {
          const goal = playersGoal.find((p) => p.id === player.id);
          if (goal) {

            return { ...player, goal: goal.goal }; 
          } else {
            return { ...player, goal: 0 };
          }
        });
        setCurrentTeam(updatedTeam);
        calculateGoalNumber(updatedTeam);
        calculateAssistNumber(gameState);
    },[calculateAssistNumber, calculateGoalNumber, gameState, playersGoal, selectedTeam, teamAPlayers, teamBPlayers]);

    useEffect(() => {
        calculateTeam();
    },[selectedTeam, gameState?.events?.length, playersGoal, calculateTeam])

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        bgcolor: alpha("#000000", 0.65),
        borderRadius: 2,
        border: "2px solid rgba(255, 255, 255, 0.1)",
        overflow: "hidden",
        transition: "all 0.3s ease",
        mb: 2,
        "&:hover": {
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1,
          bgcolor: alpha("#ffffff", 0.05),
        }}
      >
        <Tabs
          value={selectedTeam}
          onChange={handleTeamChange}
          sx={{
            minHeight: 40,
            "& .MuiTabs-indicator": {
              backgroundColor: teamColor,
            },
          }}
        >
          <Tab
            value="blue"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ShieldIcon sx={{ mr: 0.5, color: "#1976d2" }} />
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Team A
                </Typography>
              </Box>
            }
            sx={{
              minHeight: 40,
              color: "white",
              "&.Mui-selected": { color: "#1976d2" },
            }}
          />
          <Tab
            value="red"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ShieldIcon sx={{ mr: 0.5, color: "#dc004e" }} />
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  Team B
                </Typography>
              </Box>
            }
            sx={{
              minHeight: 40,
              color: "white",
              "&.Mui-selected": { color: "#dc004e" },
            }}
          />
        </Tabs>
        <IconButton size="small" sx={{ color: "white" }} onClick={toggleExpand}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Box sx={{ p: 2, borderBottom: expanded ? `1px solid ${alpha(teamColor, 0.3)}` : "none" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ color: teamColor, fontWeight: "bold" }}>
            {teamName}
          </Typography>
          <Chip
            label={currentTeam.length > 1 ?  currentTeam.length + " Players" : currentTeam.length + " Player"}
            size="small"
            sx={{
              bgcolor: alpha(teamColor, 0.2),
              color: "white",
              fontWeight: "bold",
            }}
          />
        </Box>

        {/* Team stats summary */}
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={4}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SportsSoccerIcon sx={{ fontSize: 16, mr: 0.5, color: "#FFD700" }} />
                <Typography variant="caption" sx={{ color: "#aaa" }}>
                  Goals
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
                {selectedTeam === "blue" ? playersGoals.blue : playersGoals.red}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DirectionsRunIcon sx={{ fontSize: 16, mr: 0.5, color: "#4caf50" }} />
                <Typography variant="caption" sx={{ color: "#aaa" }}>
                  Assists
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
              {selectedTeam === "blue" ? playersAssist.blue : playersAssist.red}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {expanded && (
        <Box sx={{ maxHeight: "300px", overflowY: "auto", p: 1 }}>
          {currentTeam.map((player) => (
            <Paper
              key={player.id}
              sx={{
                p: 1.5,
                mb: 1,
                bgcolor: alpha(teamColor, 0.1),
                borderRadius: 1,
                border: `1px solid ${alpha(teamColor, 0.2)}`,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center"}}>
                  <User width={36} height={36} name={player.name} color={teamColor} />
                  <Box sx={{ml: {xs: 0, md: 3}}}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle1" sx={{ color: "white", fontWeight: "bold", lineHeight: 1.2 }}>
                        {player.name}
                        </Typography>
                        {player.name === gameState?.creatorName && (
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
                    <Typography variant="caption" sx={{ color: "#aaa" }}>
                      Position: {player.x}, {player.y}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ my: 1, bgcolor: alpha("#ffffff", 0.1) }} />
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Tooltip title="Goals">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <SportsSoccerIcon sx={{ fontSize: 14, mr: 0.5, color: "#FFD700" }} />
                      <Typography variant="body2" sx={{ color: "white" }}>
                        {player.goal}
                      </Typography>
                    </Box>
                  </Tooltip>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>
      )}
    </Paper>
  )
}
