import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
} from "@mui/material"
import { alpha, keyframes } from "@mui/material/styles"
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"
import ShieldIcon from "@mui/icons-material/Shield"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import BarChartIcon from "@mui/icons-material/BarChart"
import CompareArrowsIcon from "@mui/icons-material/CompareArrows"
import { scrollbarStyles } from "../themes/ScrollTheme"
import PropTypes from 'prop-types';
import { useSummary } from "../../context/game/useSummary"
import {PlayerSummary} from "./PlayerSummary"
import {TopScorer} from "./TopScorer"
import { SummaryStatistic } from "./SummaryStatistic"
import { colors } from "../../context/color/teamCustom"
import { playSound } from "../../utils/sounds"
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
/**
 * Componente para resumir el juego
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.gameState - Configuracion del juego
 * @param {function} props.onExit - Función para salir del juego
 * @returns {JSX.Element} Resume el juego
 */
export const Summary = ({ gameState, onExit }) => {
  const [showContent, setShowContent] = useState(false)
  const{ teamGoals, playerGoals, assistsByTeam, assists, topScorer } = useSummary(gameState)
  const firstTeamScore = gameState?.teams.first || 0;
  const secondTeamScore = gameState?.teams.second || 0;

  let winnerInfo;

  if (firstTeamScore > secondTeamScore) {
    winnerInfo = { team: 0, message: "TEAM A VICTORY!" };
  } else if (secondTeamScore > firstTeamScore) {
    winnerInfo = { team: 1, message: "TEAM B VICTORY!" };
  } else {
    winnerInfo = { team: 2, message: "DRAW!" };
  }

  const totalAssists = assistsByTeam[0] + assistsByTeam[1];
  const blueAssistPct = totalAssists > 0 ? Math.round((assistsByTeam[0] * 100) / totalAssists) : 0;
  const redAssistPct = totalAssists > 0 ? 100 - blueAssistPct : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
      playSound("/sounds/end.mp3",0.03)
    }, 500)

    return () => clearTimeout(timer)
      
  }, [])


  return (
    <Box
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
        backgroundColor: alpha("#000", 0.7),
        backdropFilter: "blur(8px)",
        p: 2,
      }}
    >
      <Paper
        elevation={24}
        sx={{
          bgcolor: alpha("#121212", 0.95),
          borderRadius: 4,
          width: "100%",
          maxWidth: 900,
          maxHeight: "90vh",
          overflow: "auto",
          border: `4px solid ${colors[winnerInfo.team]}`,
          boxShadow: `0 0 30px ${alpha(colors[winnerInfo.team], 0.5)}`,
          animation: `${fadeIn} 0.8s ease-out`,
          position: "relative",
          overflowX: "hidden",
          ...scrollbarStyles,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            opacity: 0.05,
            animation: `${rotate} 20s linear infinite`,
            zIndex: 0,
          }}
        >
          <SportsSoccerIcon sx={{ fontSize: 200, color: "white" }} />
        </Box>
        <Box
          sx={{
            p: { xs: 2, md: 4 },
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            bgcolor: alpha(colors[winnerInfo.team], 0.2),
            borderBottom: `2px solid ${alpha(colors[winnerInfo.team], 0.5)}`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "white",
              mb: 1,
              animation: showContent ? `${fadeIn} 0.8s ease-out` : "none",
            }}
          >
            MATCH OVER
          </Typography>
          <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: colors[winnerInfo.team],
                mb: 2,
                animation: showContent ? `${fadeIn} 1s ease-out, ${pulse} 2s infinite` : "none",
              }}
          >
            {winnerInfo.message} 
          </Typography>
        
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
              animation: showContent ? `${fadeIn} 1.2s ease-out` : "none",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: alpha("#1976d2", 0.3),
                p: 2,
                borderRadius: 2,
                border: "2px solid #1976d2",
              }}
            >
              <ShieldIcon color="primary" sx={{ mr: 1, fontSize: 30 }} />
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1976d2" }}>
              {firstTeamScore}
              </Typography>
            </Box>

            <Typography variant="h5" sx={{ mx: 2, color: "white" }}>
              -
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: alpha("#dc004e", 0.3),
                p: 2,
                borderRadius: 2,
                border: "2px solid #dc004e",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "#dc004e" }}>
              {secondTeamScore}
              </Typography>
              <ShieldIcon sx={{ ml: 1, fontSize: 30, color:"#dc004e" }} />
            </Box>
          </Box>
        </Box>
        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Box
            sx={{
              mb: 4,
              animation: showContent ? `${fadeIn} 1.6s ease-out` : "none",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                color: "white",
              }}
            >
              <BarChartIcon sx={{ mr: 1 }} />
              MATCH STATS
            </Typography>
            <SummaryStatistic blueAssistPct={blueAssistPct} redAssistPct={redAssistPct} teamGoals={teamGoals} />
          </Box>
          {topScorer &&
          <Box
            sx={{
                mb: 4,
                animation: showContent ? `${fadeIn} 1.8s ease-out` : "none",
            }}
          >
          <TopScorer topScorer={topScorer} /></Box>}
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
            <Box
                sx={{
                mb: 4,
                animation: showContent ? `${fadeIn} 2s ease-out` : "none",
                }}
            >
                <Typography
                variant="h6"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    color: "white",
                }}
                >
                <SportsSoccerIcon sx={{ mr: 1 }} />
                GOAL SCORES
                </Typography>
                <PlayerSummary players={playerGoals} message={"There are no players who made goals."} />
            </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
            <Box
                sx={{
                mb: 4,
                animation: showContent ? `${fadeIn} 2s ease-out` : "none",
                }}
            >
                <Typography
                variant="h6"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    color: "white",
                }}
                >
                <CompareArrowsIcon sx={{ mr: 1 }} />
                ASSISTS
                </Typography>
                <PlayerSummary players={assists} message={"There are no players who made assists."} />
            </Box>
            </Grid>
            </Grid>
          <Button
              variant="outlined"
              size="large"
              startIcon={<ExitToAppIcon />}
              onClick={onExit}
              sx={{
                width: "100%",
                py: 1.5,
                px: 4,
                borderRadius: 2,
                color: "white",
                borderColor: "white",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: alpha("#fff", 0.1),
                },
              }}
            >
              Go out
            </Button>
        </Box>
      </Paper>
    </Box>
  )
}
Summary.propTypes = {
  gameState: PropTypes.shape({
    id: PropTypes.string.isRequired,
    gameName: PropTypes.string.isRequired,
    creatorName: PropTypes.string.isRequired,
    creationTime: PropTypes.string.isRequired,
    startTime: PropTypes.string,
    maxPlayers: PropTypes.number.isRequired,
    privateGame: PropTypes.bool.isRequired,
    borderX: PropTypes.number.isRequired,
    borderY: PropTypes.number.isRequired,
    status: PropTypes.string,
    events: PropTypes.arrayOf(
      PropTypes.shape({
        first: PropTypes.string.isRequired,
        second: PropTypes.string.isRequired
      })
    ),
    players: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        team: PropTypes.number.isRequired,
        sessionId: PropTypes.string.isRequired,
        kicking: PropTypes.bool,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      })
    ).isRequired,
    ball: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      velocityX: PropTypes.number.isRequired,
      velocityY: PropTypes.number.isRequired
    }).isRequired,
    teams: PropTypes.shape({
      first: PropTypes.number.isRequired,
      second: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  onExit: PropTypes.func.isRequired
};