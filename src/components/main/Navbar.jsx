"use client"
import React, { useState } from "react"
import {
  Box,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Tooltip,
} from "@mui/material"
import {
  SportsSoccer,
  Home,
  Logout,
  PersonAdd,
} from "@mui/icons-material"
import { useMsal,useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import {Friends} from "../../pages/friends/Friends";
import { useUser } from "../../context/user/userContext";
import { useAuth } from "../../context/auth/AuthContext";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const navigation = useNavigate();
    const {setPlayer} = useUser()
    const {signOut} = useAuth()
    const handleLogout = async () => {
      signOut()
      setPlayer(null)
      navigation("/")
    };
    const handleGoHome = () => {
      navigation("/homepage");
    }
    const openFriends = () =>{
      setIsOpen(true)
    }
    const closeFriends = () => {
      setIsOpen(false)
    }
    return (
      <>
      <AppBar
      position="static"
      elevation={0}
      sx={{
        height: 40,
        bgcolor: "#0e250f",
        width: "100%"
      }}
    >
      <Toolbar variant="dense" sx={{ minHeight: 40, px: 2}}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SportsSoccer sx={{ color: "white", fontSize: 20, mr: 1 }} />
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              color: "white",
              fontWeight: "bold",
              display: { xs: "none", sm: "block" },
            }}
          >
            PigBall
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

            <Tooltip title="Add Friends">
              <IconButton size="small" onClick={openFriends} sx={{ color: "white", ml: 1 }}>
                <PersonAdd fontSize="small" />
              </IconButton>
            </Tooltip>
          <Tooltip title="Go Home">
            <IconButton size="small" onClick={handleGoHome} sx={{ color: "white" }}>
              <Home fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Log Out">
            <IconButton size="small" onClick={handleLogout} sx={{ color: "white", ml: 1 }}>
              <Logout fontSize="small" />
            </IconButton>
          </Tooltip>
      </Toolbar>
    </AppBar>
    {isOpen && <Friends closeDialog={closeFriends} />}
    </>
    )
}