import { Box, Paper, Typography, alpha } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

const waveVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const letterVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const GoalAnimation = React.memo(function GoalAnimation({ player, team, onClose, goalState }) {
  const [showConfetti, setShowConfetti] = useState(true);

  const text = goalState === "GOAL_SCORED" ? "¡GOAL!": "SELF GOAL";
  const teamColor = goalState === "GOAL_SCORED" && team === 0 ? "#1976d2" : (goalState === "GOAL_SCORED" && team === 1 ? "#dc004e": (team === 0 ? "#dc004e": "#1976d2"));
  const teamName = team === 0 ? "A" : "B";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
      if (onClose) onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
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
          backgroundColor: alpha("#000", 0.3),
        }}
      >
        {showConfetti && <Confetti numberOfPieces={300} recycle={false} />}

        <Paper
          component={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          elevation={24}
          sx={{
            bgcolor: alpha("#000000", 0.65),
            borderRadius: 4,
            p: { xs: 3, md: 5 },
            width: { xs: "90%", sm: "70%", md: "60%" },
            maxWidth: "800px",
            border: `4px solid ${teamColor}`,
            boxShadow: `0 0 30px ${teamColor}`,
            textAlign: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            sx={{ position: "absolute", top: -20, left: -20, opacity: 0.2 }}
          >
            <SportsSoccerIcon sx={{ fontSize: 100, color: "white" }} />
          </Box>
          <Box
            sx={{ position: "absolute", bottom: -20, right: -20, opacity: 0.2 }}
          >
            <SportsSoccerIcon sx={{ fontSize: 100, color: "white" }} />
          </Box>

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                color: teamColor,
                fontWeight: "bold",
                mb: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <EmojiEventsIcon sx={{ mr: 1 }} /> { goalState === "GOAL_SCORED" ? "TEAM " + teamName : "The point is given to team " + (teamName === "A" ? "B" : "A")}
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
              <Box
                component={motion.div}
                variants={waveVariants}
                initial="initial"
                animate="animate"
                display="flex"
              >
                {text.split("").map((char, index) => (
                  <Typography
                    key={index}
                    component={motion.span}
                    variants={letterVariants}
                    variant="h1"
                    sx={{
                      fontWeight: 900,
                      fontSize: { xs: "4rem", sm: "6rem", md: "8rem" },
                      letterSpacing: "0.05em",
                      textShadow: `0 0 20px ${teamColor}`,
                      color: teamColor,
                      lineHeight: 1,
                      mx: 0.2,
                    }}
                  >
                    {char}
                  </Typography>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <SportsSoccerIcon
                component={motion.div}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                sx={{ fontSize: { xs: 60, md: 80 }, color: "white" }}
              />
            </Box>

            <Box
              sx={{
                bgcolor: alpha(teamColor, 0.2),
                borderRadius: 2,
                p: 2,
                border: `2px solid ${alpha(teamColor, 0.5)}`,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ color: "white", mb: 1, fontWeight: "medium" }}
              >
                NOTED BY
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  textShadow: `0 0 10px ${teamColor}`,
                }}
              >
                {player ? player: "Guest"}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </AnimatePresence>
  );
})