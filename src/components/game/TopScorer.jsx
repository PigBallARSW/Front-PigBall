import React from "react"
import {
  Box,
  Typography,
  Paper,
  Chip,
} from "@mui/material"
import { alpha } from "@mui/material/styles"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import StarIcon from "@mui/icons-material/Star"
import { motion } from "framer-motion";
import { CustomizerUser } from "../user/CustomizerUser"
import { colors, winner } from "../../context/color/teamCustom"
import PropTypes from 'prop-types';
/**
 * Componente para mostrar el jugador con mas goles
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.topScorer - Jugador
 * @returns {JSX.Element} Resume el juego
 */
export const TopScorer = ({ topScorer }) => {
  
  return (
    <>
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
        bgcolor: alpha((colors[topScorer.team]), 0.2),
        borderRadius: 2,
        border: `1px solid ${alpha(
            (colors[topScorer.team]),
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
        playerColor={topScorer.centerColor || colors[topScorer.team]} 
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
            Team {winner[topScorer.team]}
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
    </>    
  )
}
TopScorer.propTypes = {
  topScorer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    team: PropTypes.number.isRequired,
    goal: PropTypes.number,
    image: PropTypes.string,
    borderColor: PropTypes.string,
    centerColor: PropTypes.string,
    iconType: PropTypes.string,
    iconColor: PropTypes.string,
  }).isRequired
};