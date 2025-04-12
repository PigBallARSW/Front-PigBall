"use client"
import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import Scoreboard from "./Scoreboard"
import { SoccerField } from "./SoccerField"
export default function GameContainer({ players, ball, movePlayer, gameState }) {
  const [elapsedTime, setElapsedTime] = useState(0)
  useEffect(() => {
    if (!gameState?.creationTime) return
    const startTime = new Date(gameState.startTime)
    const interval = setInterval(() => {
      const now = Date.now()
      const diff = Math.floor((now - startTime.getTime()) / 1000) 
      if (diff >= 300) { 
        setElapsedTime(300); 
        clearInterval(interval); 
      } else {
        setElapsedTime(diff);
      }
    }, 1000);
    return () => clearInterval(interval)
  }, [gameState?.creationTime, gameState?.startTime]);

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
    </Box>

  )
}
