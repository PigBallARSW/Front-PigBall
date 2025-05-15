import React from "react"
import {
  Box,
  Typography,
  Paper,
  Grid,
} from "@mui/material"
import { alpha } from "@mui/material/styles"
import ShieldIcon from "@mui/icons-material/Shield"
import PropTypes from 'prop-types';
/**
 * Componente para mostrar estadisticas de el juego
 * @param {Object} props - Propiedades del componente
 * @param {number} props.blueAssistPct - Porcentaje de goles del equipo azul
 * @param {number} props.redAssistPct - Porcentaje de goles del equipo rojo
 * @param {Object} props.teamGoals - Goles por equipo
 * @returns {JSX.Element} Resume estadisticas
 */
export const SummaryStatistic = ({blueAssistPct, redAssistPct, teamGoals }) => {
  return (
    <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Paper
            sx={{
            p: 2,
            bgcolor: alpha("#333", 0.5),
            borderRadius: 2,
            }}
        >
            <Typography variant="subtitle2" sx={{ color: "white", mb: 1 }}>
            Assists
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ color: "#1976d2", width: "40px" }}>
            {blueAssistPct}
            </Typography>
            <Box sx={{ flexGrow: 1, mx: 1 }}>
                <Box
                sx={{
                    height: "8px",
                    borderRadius: "4px",
                    bgcolor: "#333",
                    position: "relative",
                    overflow: "hidden",
                }}
                >
                <Box
                    sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: `${blueAssistPct}%`,
                    bgcolor: "#1976d2",
                    }}
                />
                <Box
                    sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    height: "100%",
                    width: `${redAssistPct}%`,
                    bgcolor: "#dc004e",
                    }}
                />
                </Box>
            </Box>
            <Typography variant="body2" sx={{ color: "#dc004e", width: "40px", textAlign: "right" }}>
            {redAssistPct}
            </Typography>
            </Box>
        </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Paper
            sx={{
            p: 2,
            bgcolor: alpha("#333", 0.5),
            borderRadius: 2,
            }}
        >
            <Typography variant="subtitle2" sx={{ color: "white", mb: 1 }}>
            Goals
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box
                sx={{
                display: "flex",
                alignItems: "center",
                color: "#1976d2",
                }}
            >
                <ShieldIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="h6">{teamGoals[0]}</Typography>
            </Box>
            <Box sx={{ mx: 2, color: "white" }}>-</Box>
            <Box
                sx={{
                display: "flex",
                alignItems: "center",
                color: "#dc004e",
                }}
            >
                <Typography variant="h6">{teamGoals[1]}</Typography>
                <ShieldIcon fontSize="small" sx={{ ml: 0.5 }} />
            </Box>
            </Box>
        </Paper>
        </Grid>
    </Grid>
  )
}

SummaryStatistic.propTypes = {
  blueAssistPct: PropTypes.number.isRequired,
  redAssistPct: PropTypes.number.isRequired,
  teamGoals: PropTypes.shape({
    0: PropTypes.number.isRequired, 
    1: PropTypes.number.isRequired  
  }).isRequired
};