"use client"
import { useState, useEffect } from "react"
import {  Typography, Box } from "@mui/material"
import Scoreboard from "./Scoreboard"
import { SoccerField } from "./SoccerField"
import {useLobbyService } from "../../Modules/useLobbyService";
export default function GameContainer({ id, players, ball, movePlayer, gameState }) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const {finishRoom} = useLobbyService();
  const [hasFinished, setHasFinished] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  useEffect(() => {
    if (!gameState?.creationTime) return
    if (!gameState?.creationTime || hasFinished) return;

    const startTime = new Date(gameState.startTime)
    const interval = setInterval(() => {
      const now = Date.now()
      const diff = Math.floor((now - startTime.getTime()) / 1000) 
      if (diff >= 300) { 
        setElapsedTime(300); 
        clearInterval(interval); 
        setShowGameOver(true);
        setTimeout(() => finishRoom(id), 2000);
        setHasFinished(true);
      } else {
        setElapsedTime(diff);
      }
    }, 1000);
    return () => clearInterval(interval)
  }, [gameState?.creationTime, gameState?.startTime,id,hasFinished,finishRoom]);

  const formatGameTime = () => {
    const minutes = Math.floor(elapsedTime / 60)
    const seconds = elapsedTime % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }
  return (
    <Box
      sx={{
        mx: "auto",
        position: "relative",
      }}
      className="containerField"
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        <Scoreboard
          blueScore={gameState?.teams.first || 0}
          redScore={gameState?.teams.second || 0}
          gameTime={formatGameTime()}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <SoccerField
          players={players}
          ball={ball}
          movePlayer={movePlayer}
        />
      </Box>
     {/* 🚨 Mensaje de juego terminado */}
     {showGameOver && (
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1300,
      bgcolor: "#222",
      color: "white",
      borderRadius: 2,
      border: "2px solid #f44336",
      maxWidth: 400,
      width: "90%",
      p: 3,
      boxShadow: 24,
    }}
  >
    <Box
      sx={{
        bgcolor: "rgba(244, 67, 54, 0.2)",
        color: "#f44336",
        px: 2,
        py: 1,
        borderRadius: 1,
        mb: 2,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: "1.25rem",
      }}
    >
      Game Over
    </Box>
    <Typography variant="body1" sx={{ textAlign: "center" }}>
      The game is over. Returning to the main room...
    </Typography>
  </Box>
)}
    </Box>

  )
}
