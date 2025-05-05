import React from 'react';
import {Court} from '../../components/game/Court';
import { alpha } from "@mui/material/styles"
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import MicrosoftLoginButton from '../../components/login/MicrosoftLoginButton';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Container
} from "@mui/material"
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const handleMicrosoftLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      instance.setActiveAccount(loginResponse.account);
      navigate("/homepage");
    } catch (e) {
      console.error("Error durante login con Microsoft:", e);
    }
  };
  const handleGuestLogin =  () => {
    navigate("/homepage");
  }
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
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
            <Divider sx={{ my: 2, color: "rgba(255,255,255,0.5)" }}>or</Divider>
            <Button
              variant="outlined"
              size="large"
              startIcon={<PersonOutlineIcon />}
              onClick={handleGuestLogin}
              sx={{
                py: 1.5,
                color: "white",
                borderColor: "rgba(255,255,255,0.3)",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: alpha("#ffffff", 0.1),
                },
                borderRadius: 2,
              }}
            >
              Enter as a guest
            </Button>
          </Box>
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
            By logging in, you agree to our terms and conditions.
            </Typography>
          </Box>
        </Paper>
    </Container>
    </>
  );
};


