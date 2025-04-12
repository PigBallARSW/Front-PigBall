"use client"
import { Box, Typography, Paper } from "@mui/material"
import { alpha } from "@mui/material/styles"
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import ShieldIcon from "@mui/icons-material/Shield"

export default function Scoreboard({
  blueScore,
  redScore,
  gameTime,
}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%"}}>
    <Paper
      elevation={3}
      sx={{
        width: "auto",
        mx: "auto",
        px: 1,
        py: 0.5,
        bgcolor: alpha("#000000", 0.75),
        borderRadius: 2,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 5,
          flexWrap: "wrap",
        }}
      >
        {/* Equipo Azul */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 1,
            borderRadius: 1,
            bgcolor: alpha("#1976d2", 0.2),
            minWidth: 100,
            flex: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
            <ShieldIcon color="primary" sx={{ fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2" color="primary" sx={{ fontWeight: "bold" }}>
              BLUE
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ fontFamily: "scoreboard, monospace", color: "white" }}>
            {blueScore}
          </Typography>
          <SportsSoccerIcon sx={{ color: "#1976d2", fontSize: 18 }} />
        </Box>
  
        {/* Centro */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
            px: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 1,
              py: 0.5,
              borderRadius: 1,
              bgcolor: alpha("#ffffff", 0.1),
            }}
          >
            <EmojiEventsIcon sx={{ color: "#FFD700", fontSize: 16, mr: 0.5 }} />
            <Typography variant="caption" color="white">
              LIVE MATCH
            </Typography>
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "digital, monospace",
              color: "#ff5722",
              textShadow: "0 0 5px rgba(255, 87, 34, 0.7)",
            }}
          >
            {gameTime}
          </Typography>
        </Box>
  
        {/* Equipo Rojo */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 1,
            borderRadius: 1,
            bgcolor: alpha("#dc004e", 0.2),
            minWidth: 100,
            flex: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
            <ShieldIcon sx={{ fontSize: 18, mr: 0.5, color: "#dc004e" }} />
            <Typography variant="body2" sx={{ fontWeight: "bold", color: "#dc004e" }}>
              RED
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ fontFamily: "scoreboard, monospace", color: "white" }}>
            {redScore}
          </Typography>
          <SportsSoccerIcon sx={{ color: "#dc004e", fontSize: 18 }} />
        </Box>
      </Box>
    </Paper>
  </Box>
  
  )
}
