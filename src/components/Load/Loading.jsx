import { useState, useEffect, useRef } from "react"
import { Box, Typography, LinearProgress, CircularProgress } from "@mui/material"
import { alpha, keyframes } from "@mui/material/styles"
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import WhatshotIcon from "@mui/icons-material/Whatshot"

// Animación de rebote para el balón
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`

// Animación de rotación para el balón
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

// Animación de desvanecimiento para los mensajes
const fadeInOut = keyframes`
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`

// Mensajes de carga con temática de fútbol
const loadingMessages = [
  "Warming up on the sidelines...",
  "Preparing the playing field...",
  "Checking the goal nets...",
  "Inflating the balloons...",
  "Lining up the players...",
  "Waiting for the starting whistle...",
  "Reviewing the VAR...",
  "Preparing the tactics...",
  "Adjusting the heels of the boots...",
]

export default function Loading() {
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2000);
    const progressTimer = setInterval(() => {
      setProgress((prevProgress) => {
        const next = prevProgress + Math.random() * 5;
        return next < 95 ? next : 95; 
      });
    }, 500);

    return () => {
      clearInterval(messageTimer);
      clearInterval(progressTimer);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >

      {/* Overlay para mejorar la legibilidad */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: -1,
        }}
      />

      {/* Título */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          backgroundColor: alpha("#000", 0.7),
          p: 2,
          borderRadius: 2,
          border: "2px solid #4CAF50",
          boxShadow: "0 0 20px rgba(76, 175, 80, 0.5)",
        }}
      >
        <EmojiEventsIcon
          sx={{
            fontSize: { xs: 40, md: 60 },
            color: "#FFD700",
            mr: 2,
            filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.7))",
          }}
        />
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          PigBall Game
        </Typography>
      </Box>

      {/* Balón animado */}
      <Box
        sx={{
          mb: 4,
          animation: `${bounce} 1s infinite ease-in-out, ${spin} 2s infinite linear`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <SportsSoccerIcon
          sx={{
            fontSize: { xs: 60, md: 80 },
            color: "white",
            filter: "drop-shadow(0 0 10px rgba(255,255,255,0.7))",
          }}
        />

        {/* Efecto de fuego */}
        <WhatshotIcon
          sx={{
            position: "absolute",
            fontSize: { xs: 80, md: 100 },
            color: "#FF5722",
            opacity: 0.7,
            zIndex: -1,
            filter: "blur(4px)",
          }}
        />
      </Box>

      {/* Mensaje de carga */}
      <Box
        sx={{
          height: 30,
          mb: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "white",
            textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
            animation: `${fadeInOut} 2s infinite`,
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          {loadingMessages[messageIndex]}
        </Typography>
      </Box>

      {/* Barra de progreso */}
      <Box
        sx={{
          width: { xs: "80%", sm: "60%", md: "40%" },
          position: "relative",
          mb: 2,
        }}
      >
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: alpha("#fff", 0.2),
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#4CAF50",
              borderRadius: 5,
            },
          }}
        />

        {/* Círculo de progreso en el extremo de la barra */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: `${progress}%`,
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        >
          <CircularProgress
            variant="determinate"
            value={100}
            size={24}
            thickness={5}
            sx={{
              color: "#4CAF50",
              boxShadow: "0 0 10px rgba(76, 175, 80, 0.8)",
            }}
          />
        </Box>
      </Box>

      {/* Porcentaje de carga */}
      <Typography
        variant="body1"
        sx={{
          color: "white",
          fontWeight: "bold",
          fontFamily: "monospace",
          fontSize: { xs: "1rem", md: "1.2rem" },
        }}
      >
        {`${Math.round(progress)}%`}
      </Typography>

      {/* Texto de pie de página */}
      <Typography
        variant="caption"
        sx={{
          color: alpha("#fff", 0.7),
          position: "absolute",
          bottom: 16,
          textAlign: "center",
          width: "100%",
        }}
      >
        Get ready for action! The match is about to begin...
      </Typography>
    </Box>
  )
}