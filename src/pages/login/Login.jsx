import React from 'react';
import {Court} from '../../components/game/Court';
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"
import MicrosoftLoginButton from '../../components/login/MicrosoftLoginButton';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container
} from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/user/userContext';
import { UsernameInput } from '../../components/login/UsernameInput';
import { useAuth } from '../../context/auth/AuthContext';

export const Login = () => {
  const {open, loadUserFromMicrosoftLogin} = useUser()
  const {signInUser} = useAuth()
  
  const handleMicrosoftLogin = async () => {
    const response = await signInUser()
    loadUserFromMicrosoftLogin(response.homeAccountId)
    
  };
  return (
    <>
    <Court />
    <Container maxWidth="sm" sx={{ 
      position: "relative",
      zIndex: 1,
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
     }}>
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "linear-gradient(to bottom, rgba(26, 85, 26, 0.9), rgba(21, 43, 23, 0.9))",
            border: "1px solid rgb(14, 24, 14)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <SportsSoccerIcon sx={{ fontSize: 60, color: "#4caf50" }} />
            </Box>
            <Typography variant="h3" component="h1" sx={{ color: "white", fontFamily: "Alfa Slab One, sans-serif",textShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)"}} className='title'>
              PIGBALL GAME
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.7)", mt: 1 }}>
              Get ready for action on the field!
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems:"center", mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<MicrosoftLoginButton />}
              onClick={handleMicrosoftLogin}
              sx={{
                py: 1.5,
                bgcolor: "#2f7bd9",
                "&:hover": { bgcolor: "#1c5cad" },
                borderRadius: 2,
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              }}
            >
              Sign in with Microsoft
            </Button>
          </Box>
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
            By logging in, you agree to our terms and conditions.
            </Typography>
          </Box>
        </Paper>
    </Container>
    {open && <UsernameInput open={true} />}
    </>
  );
};


