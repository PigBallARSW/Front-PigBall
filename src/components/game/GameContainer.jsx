import React, { useState, useEffect, useRef } from "react"
import {  Box, Fab, useMediaQuery, useTheme } from "@mui/material"
import {Scoreboard} from "./Scoreboard"
import {useLobbyService } from "../../Modules/useLobbyService";
import Summary from "./Summary"
import { Field } from "./draw/Field"
//import FPSMeter from "../fps/FPSMeter";
import FPSMeter from "../fps/FPSCounter";
import { useMoveGame } from "../../context/game/useMoveGame";
import { useIsTouchDevice } from "../../context/game/useIsTouchDevice";
import MobileControls from "./MobileControls";
import { ExitToApp } from "@mui/icons-material";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { LeaveDialog } from "../dialog/LeaveDialog";

export const GameContainer = React.memo(function GameContainer({ id, players, ball, movePlayer, gameState, leaveRoom, fps, fpsHistory }) {
  const isTouch = useIsTouchDevice();
  const [elapsedTime, setElapsedTime] = useState(0)
  const {finishRoom} = useLobbyService();
  const [hasFinished, setHasFinished] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const fieldWrapperRef = useRef();
  const {onMoveStart,onMoveEnd, onActionStart, onActionEnd} = useMoveGame(movePlayer);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  const handleLeaveRoom = () => {
    setIsLeaveDialogOpen(false);
    leaveRoom();
  }
  const OpenLeaveRoom = () => {
    setIsLeaveDialogOpen(true);
  }

  useEffect(() => {
    if (!gameState?.creationTime) return
    if (!gameState?.creationTime || hasFinished) return;
    const startTime = new Date(gameState.startTime)
    const interval = setInterval(() => {
      const now = Date.now()
      const diff = Math.floor((now - startTime.getTime()) / 1000) 
      setElapsedTime(diff);
      /*if (diff >= 300) { 
        setElapsedTime(300); 
        clearInterval(interval); 
        setShowGameOver(true);
        setHasFinished(true);
      } else {
        setElapsedTime(diff);
      }*/
    }, 1000);
    return () => clearInterval(interval)
  }, [gameState?.creationTime, gameState?.startTime,id,hasFinished,finishRoom]);

  const formatGameTime = () => {
    const minutes = Math.floor(elapsedTime / 60)
    const seconds = elapsedTime % 60
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }
  const exitGame = () => {
    finishRoom(id);
    leaveRoom();
  }
  return (
    <>
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
      }}
    >
      <Scoreboard
        blueScore={gameState?.teams.first || 0}
        redScore={gameState?.teams.second || 0}
        gameTime={formatGameTime()}
      />
    </Box>

    {isMobile ? (
      <Box
        sx={{
          position: "absolute",
          top: 100,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          zIndex: 20,
        }}
      >
        <Box
          sx={{
            top: 8,
            right: 8,
            display: "flex",
            gap: 1,
            zIndex: 20,
          }}
        >
          <Fab color="error" onClick={OpenLeaveRoom}>
            <ExitToApp />
          </Fab>
          <Fab color="success">
            <VolumeOffIcon />
          </Fab>
        </Box>
      </Box>
    ) : (
      <>
        {/* 🖥️ FPS en esquina superior izquierda */}
        <Box
          sx={{
            position: "absolute",
            left: 8,
            zIndex: 20,
            bottom: 8,
          }}
        >
          <FPSMeter fps={fps} fpsHistory={fpsHistory} showGraph={!isMobile} />
        </Box>

        {/* 🖥️ Botones en esquina superior derecha */}
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 1,
            zIndex: 20,
          }}
        >
          <Fab color="error" onClick={OpenLeaveRoom}>
            <ExitToApp />
          </Fab>
          <Fab color="success">
            <VolumeOffIcon />
          </Fab>
        </Box>
      </>
    )}
 
    <Box
      ref={fieldWrapperRef}
      sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }}
    >
      <Field
        wrapperRef={fieldWrapperRef}
        players={players}
        ball={ball}
        movePlayer={movePlayer}
        borderX={gameState.borderX}
        borderY={gameState.borderY}
      />
    </Box>

    {showGameOver && (
      <Summary gameState={gameState} onExit={exitGame} />
    )}
    {isTouch && <MobileControls onMoveStart={onMoveStart} onMoveEnd={onMoveEnd} onActionStart={onActionStart} onActionEnd={onActionEnd} />}
    <LeaveDialog leaveRoom={handleLeaveRoom} isLeaveDialogOpen={isLeaveDialogOpen} setIsLeaveDialogOpen={setIsLeaveDialogOpen} />
    </>
  )
})
