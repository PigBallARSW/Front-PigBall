"use client"

import { useState, useEffect } from "react"
import { Box } from "@mui/material"
import Scoreboard from "./Scoreboard"
import { SoccerField } from "./SoccerField"

export default function GameContainer({players,ball,movePlayer,gameState}) {
  const formatGameTime = () => {
    const minutes = Math.floor(1000 / 60)
    const seconds = 1000 % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Box
    sx={{
      mx: "auto",
      position: "relative",
    }}
    className = "containerField"
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
        blueScore={gameState.teams.first}
        redScore={gameState.teams.second}
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
