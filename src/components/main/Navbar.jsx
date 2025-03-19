"use client"
import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Paper,
  Divider,
  useMediaQuery,
  useTheme,
  Chip
} from "@mui/material"
import FaceIcon from '@mui/icons-material/Face';
import {
  Logout as LogoutIcon,
  Person as UserIcon,
  Home as HomeIcon,
} from "@mui/icons-material"
import { useMsal } from "@azure/msal-react";
import { usePlayerStats } from "../user/playerStats"
import { User } from "../user/User"
import { useNavigate } from "react-router-dom";
import Photo from "../user/photo";

export const Navbar = () => {
    const playerStats = usePlayerStats();
    const navigation = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"))
    const { instance } = useMsal();
    
    const handleLogout = async () => {
      await instance.logoutPopup();
      navigation("/");
    };
    const handleProfile = () =>{
      navigation("/profile");
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)

    }
    return (
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              <Avatar sx={{ bgcolor: "secondary.main", width: 32, height: 32, mr: 1 }}>
                <Typography variant="caption" sx={{ color: "primary.main", fontWeight: "bold" }}>
                  2D
                </Typography>
              </Avatar>
              <Typography variant="h6" sx={{ color: "secondary.main", fontWeight: "bold" }}>
                PIGBALL
              </Typography>
            </Box>

            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: "flex", gap: 1, justifyContent: "center" }}>
                <Button color="inherit" startIcon={<HomeIcon />}>
                  Home
                </Button>
              </Box>
            )}

            <Box>
              <Chip 
                id="profile-button"
                aria-controls={open ? "profile-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                color="primary"
                sx={{
                  "&:hover": { bgcolor: "primary.main" },
                  px: 2,
                }}
                icon={<FaceIcon />} 
                label={playerStats.name.split(' ')[0]} variant="outlined" />
                
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableScrollLock={true}
                slotProps={{
                  "aria-labelledby": "profile-button",
                }}
              >
                <MenuItem onClick={handleProfile}>
                  <UserIcon fontSize="small" sx={{ mr: 1 }} />
                  My profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                  <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                  Log Out
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
    )
}