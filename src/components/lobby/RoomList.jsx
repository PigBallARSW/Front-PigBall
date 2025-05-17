"use client"
import React from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import {
  SportsSoccer,
  People,
  EmojiEvents,
  AccessTime,
} from "@mui/icons-material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { motion } from "framer-motion"
import PropTypes from 'prop-types';

/**
 * Componente que muestra la lista de jugadores
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.gameRooms - Lista delas salas
 * @param {func} props.joinRoom
 * @returns {JSX.Element} Lista de jugadores
 */

export const RoomList = ({ gameRooms, joinRoom }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const getStatusColor = (status) => {
    switch (status) {
      case "WAITING_FOR_PLAYERS":
        return theme.palette.success.main;
      case "IN_PROGRESS":
        return theme.palette.warning.main;
      case "ABANDONED":
        return theme.palette.info.main;
      default:
        return theme.palette.error.main;
    }
  }
  const getGameTypeIcon = (gameType) => {
    switch (gameType) {
      case "Liga":
        return <EmojiEvents fontSize="small" />
      case "Torneo":
        return <SportsSoccer fontSize="small" />
      case "Amistoso":
        return <People fontSize="small" />
      case "Entrenamiento":
        return <AccessTime fontSize="small" />
      default:
        return <SportsSoccer fontSize="small" />
    }
  }
  return (
    <List sx={{
      overflow: "auto",
      maxHeight: "calc(100vh - 215px)",
      "& .MuiListItem-root": {
        borderBottom: "1px solid #333",
      },
      "& .MuiListItemText-primary": {
        color: "white",
      },
      "& .MuiListItemText-secondary": {
        color: "rgba(255, 255, 255, 0.7)",
      },
      "&::-webkit-scrollbar": {
        width: "8px",
        opacity: 0,
        transition: "opacity 0.3s ease",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#315f33",
        borderRadius: "4px",
      }
    }}>
      {gameRooms.length > 0 ? (
        gameRooms.map((room) => (
          room.status !== "ABANDONED" && room.status !== "FINISHED" &&
          <React.Fragment key={room.id}>
            <ListItem
              onClick = {isMobile ? () => joinRoom(room.id) : undefined}
              component={motion.div}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              sx={{
                cursor: "pointer",
                py: 1.5,
              }}
              secondaryAction = {
                <Box sx={{ display: "flex", flexDirection: "column",  width: "auto" }}>
                  <Button
                    onClick={() => joinRoom(room.id)}
                    variant="contained"
                    size="small"
                    disabled={room.status === "FINISHED"}
                    sx={{
                      ml: 1,
                      display: { xs: "none", sm: "inline-flex" },
                      bgcolor: "#4CAF50",
                      "&:hover": {
                        bgcolor: "#388E3C",
                      },
                      "&.Mui-disabled": {
                        bgcolor: "rgba(255, 255, 255, 0.27)",
                        color: "rgba(255, 255, 255, 0.49)",
                      },
                    }}
                  >
                    Join
                  </Button>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: `${getStatusColor(room.status)}`,
                    color: "white",
                  }}
                >
                  {getGameTypeIcon("Liga")}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography variant="subtitle1" component="span" sx={{ fontWeight: "bold", mr: 1, color: "white" }}>
                      {room.lobbyName}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" component="span" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                      Host: {room.creatorName}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 0.5, flexWrap: "wrap" }}>
                      <Chip
                        label={`${room.players.length}/${room.maxPlayers}`}
                        size="small"
                        icon={<People fontSize="small" />}
                        sx={{
                          mr: 1,
                          mb: { xs: 0.5, sm: 0 },
                          bgcolor: "rgba(255, 255, 255, 0.1)",
                          color: "white",
                          "& .MuiChip-icon": {
                            color: "white",
                          },
                        }}
                      />
                      <Chip
                        label={room.status}
                        size="small"
                        sx={{
                          mr: 1,
                          mb: { xs: 0.5, sm: 0 },
                          bgcolor: `${getStatusColor(room.status)}`,
                          color: "white",
                        }}
                      />
                      <Chip 
                      icon={<CalendarMonthIcon />} 
                      label={new Date(room.creationTime*1000).toLocaleString()} 
                      size="small"
                      variant="outlined" 
                      sx={{
                        mr: 1,
                        mb: { xs: "0.5", sm: 0 },
                        borderColor: "rgba(255, 255, 255, 0.3)",
                        display: { xs: "none", sm: "flex" },
                        color: "white",
                        "& .MuiChip-icon": {
                          color: "white",
                        },
                      }}/>
                    </Box>
                  </>
                }
                slotProps={{ 
                  secondary: {
                    component: "div", 
                }, }}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))
      ) : (
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>No rooms were found that match your search.
          </Typography>
        </Box>
      )}
    </List>
  )
}
RoomList.propTypes = {
  gameRooms: PropTypes.array.isRequired,
  joinRoom: PropTypes.func
};

