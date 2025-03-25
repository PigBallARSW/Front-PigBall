import {
  Typography,
  Button,
  Container,
  Box
} from "@mui/material"
import Grid from '@mui/material/Grid2';
import { usePlayerStats } from "../../components/user/playerStats";
import Character from '../../components/homepage/Character';
import Statistic from '../../components/homepage/Statistic';
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const playerStats = usePlayerStats();
  const navigation = useNavigate();
  const handleClick = () => {
    navigation("/homepage/lobby")
  }
  
  return (
      <Box
        sx={{
          color: "white",
          pb: 3,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: "bold",
                color: "secondary.main",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                mb: 1,
              }}
            >
              WELCOME
            </Typography>
            <Typography variant="h6" sx={{ color: "primary.light" }}>
              Dominate the court with your skill!
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Player Character */}
            <Character name={playerStats.name} />

            {/* Player Stats */}
            <Statistic matchesPlayed = {playerStats.matchesPlayed} 
            matchesWon={playerStats.matchesWon} 
            matchesLost={playerStats.matchesLost} 
            score={playerStats.score} 
            winRate={playerStats.winRate} />
          </Grid>

          <Box sx={{ mt: 6, textAlign: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                py: 1.5,
                px: 6,
                borderRadius: "30px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "primary.dark",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                },
                transition: "all 0.2s ease",
                border:"1px solid white"
              }}
              onClick={handleClick}
            >
              PLAY NOW!
            </Button>
          </Box>
        </Container>
      </Box>
  )
}

