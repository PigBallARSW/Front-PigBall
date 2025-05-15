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

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const navigation = useNavigate();
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    const handleLogout = async () => {
      if (isAuthenticated) {
        await instance.logoutPopup();
        navigation("/")
      }
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
      }}
    >
      <Toolbar variant="dense" sx={{ minHeight: 40, px: 2 }}>
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

        <Box sx={{ display: "flex" }}>
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
        </Box>
      </Toolbar>
    </AppBar>
    <Friends isOpen={isOpen} closeDialog={closeFriends} />
    </>
    )
}