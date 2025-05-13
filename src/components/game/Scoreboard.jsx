import { Box, Typography, Paper } from "@mui/material"
import { alpha } from "@mui/material/styles"
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import ShieldIcon from "@mui/icons-material/Shield"
import React from "react"

export const Scoreboard = React.memo(function({
  blueScore,
  redScore,
  gameTime,
}) {

  return (
    <Paper
      elevation={3}
        sx={{
          width: "100%",
          p: 1,
          bgcolor: alpha("#000000", 0.75),
          borderRadius: 2,
          border: "2px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
        }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 5,
          flexWrap: "nowrap",
        }}
      >
        <Box
          sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 0.5,
              borderRadius: 1,
              bgcolor: alpha("#1976d2", 0.2),
               minWidth: { xs: 60, sm: 70 }, 
              flexShrink: 1, 
            }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
            <ShieldIcon color="primary" sx={{ fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2" color="primary" 
            sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "0.65rem",  
              sm: "0.9rem",   
              md: "1rem",     
            },
            whiteSpace: "nowrap", 
          }}>
              TEAM A
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ fontFamily: "scoreboard, monospace", color: "white" }}>
            {blueScore}
          </Typography>
          <SportsSoccerIcon sx={{ color: "#1976d2", fontSize: 18 }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
            px: 1,
          }}
        >
          <EmojiEventsIcon sx={{ color: "#FFD700", fontSize: 30}} />
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
        <Box
           sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 0.5,
              borderRadius: 1,
              bgcolor: alpha("#dc004e", 0.2),
               minWidth: { xs: 60, sm: 70 }, 
              flexShrink: 1, 
            }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
            <ShieldIcon sx={{ fontSize: 18, mr: 0.5, color: "#dc004e" }} />
            <Typography variant="body2" 
            sx={{
            fontWeight: "bold",
            fontSize: {
              xs: "0.65rem",  
              sm: "0.9rem",   
              md: "1rem",     
            },
            whiteSpace: "nowrap",
            color: "#dc004e" 
          }}>
              TEAM B
            </Typography>
          </Box>
          <Typography variant="h5" sx={{ fontFamily: "scoreboard, monospace", color: "white" }}>
            {redScore}
          </Typography>
          <SportsSoccerIcon sx={{ color: "#dc004e", fontSize: 18 }} />
        </Box>
      </Box>
    </Paper>
  
  )
})
