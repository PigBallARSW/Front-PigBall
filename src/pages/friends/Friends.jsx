"use client"
import React, { useState } from "react"
import {
  Typography,
  Tabs,
  Tab,
  TextField,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  InputAdornment,
  Paper,
  alpha,
} from "@mui/material"
import {
  PersonAdd as PersonAddIcon,
  PersonRemove as PersonRemoveIcon,
  Search,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import { CustomizerUser } from "../../components/user/CustomizerUser"
import PropTypes from 'prop-types'
import { useFriends } from "../../context/friends/useFriends"
import { useFilterFriends } from "../../context/friends/useFilterFriends"
import CloseIcon from '@mui/icons-material/Close';
/**
 * Componente para abrir lista de jugadores
 * @param {Object} props - Propiedades del componente
 * @param {function} props.closeDialog - Función que cierra el dialogo
 * @returns {JSX.Element} Componente de dialogo para jugadores
 */
export const Friends = ({closeDialog}) => {
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState(0)
  const {friends, suggestions, handleAddFriend, handleRemoveFriend, setSuggestions} = useFriends()
  useFilterFriends(setSuggestions, query, tab)
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
              height: "100%",
              border: "4px solid #4CAF50",
              boxShadow: "0 0 30px #4CAF50",
              position: "relative",
              overflow: "hidden",
              
            }}
          >
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: alpha("#4CAF50", 0.2), mb: 2, p: 2}}>
         <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          indicatorColor="secondary"
          textColor="inherit"
          sx={{ color: "white" }}
        >
          <Tab label="Add Friend" />
          <Tab label="My Friends" />
        </Tabs>
        <IconButton
        onClick={closeDialog} 
        size="small"
        >
        <CloseIcon sx={{color:"white"}}/>
      </IconButton>
        </Box>
        <Box
            sx={{
              display: tab === 0 ? "flex" : "none",
              flex: 1,
              minHeight: 0,
              flexDirection: "column",
              height: "100%",
              p: 2
            }}
          >
            <TextField
              fullWidth
              placeholder="Search for a room by name, host, or type..."
              variant="outlined"
              size="small"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "white" }} />
                  </InputAdornment>
                ),
                sx: {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.8)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&::placeholder": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                },
              }}
              sx={{
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255, 255, 255, 0.7)",
                  opacity: 1,
                },
                mb: 2
              }}
            />
        {suggestions.length > 0 ? (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1, color: "white" }}>
              Suggestions:
            </Typography>
              <List disablePadding sx={{overflow: "auto", 
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent", 
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#254626",
                  borderRadius: "4px",
                }
              }} >
              {suggestions.map((f) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ListItem
                      sx={{
                        mb: 1,
                        borderRadius: 1,
                        py: 2,
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <ListItemAvatar>
                        <CustomizerUser width={40} height={40} playerName={f.username} playerColor={f.centerColor} borderColor={f.borderColor} iconType={f.iconType} iconColor={f.iconColor} icon={f.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={f.username}
                        secondary={
                          <Box sx={{display: "flex", color:"white"}}>
                            <EmojiEventsIcon sx={{color: "#FFD700"}} />
                            <Typography>
                            {f.gamesPlayed}
                            </Typography>
                            <StarIcon sx={{color: "#FFD700"}}/>
                            <Typography>
                            {f.gamesWon}
                            </Typography>
                          </Box>
                        }
                        sx={{ ml: 2, color:"white" }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => handleAddFriend(f.id)}
                          sx={{ width: 48, height: 48, color:"primary.light" }}
                        >
                          <PersonAddIcon sx={{ fontSize: 28 }} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </motion.div>
              ))}
              </List>
            </>
            ) : 
          <Typography sx={{ p: 2, textAlign: "center", color: "white" }}>
            No suggestions found.
          </Typography>
          }
          </Box>

          <Box
            sx={{
              display: tab === 1 ? "flex" : "none",
              flex: 1,
              minHeight: 0,
              flexDirection: "column",
              height: "100%",
              p: 2
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1, color: "white" }}>
              Your Friends:
            </Typography>
              <List disablePadding sx={{overflow: "auto", 
               "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent", 
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#315f33",
                  borderRadius: "4px",
                },
              }}>
                {friends.length > 0 ? (
                  friends.map((f) => (
                    <ListItem
                      key={f.id}
                      sx={{
                        mb: 1,
                        borderRadius: 1,
                        py: 2,
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <ListItemAvatar>
                        <CustomizerUser width={40} height={40} playerName={f.username} playerColor={f.centerColor} borderColor={f.borderColor} iconType={f.iconType} iconColor={f.iconColor} icon={f.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary= {<Typography sx={{color:"white"}}>{f.username}</Typography>}
                        secondary={
                        <Box sx={{display: "flex", color:"white"}}>
                        <EmojiEventsIcon sx={{color: "#FFD700"}} />
                        <Typography>
                        {f.gamesPlayed}
                        </Typography>
                        <StarIcon sx={{color: "#FFD700"}}/>
                        <Typography>
                        {f.gamesWon}
                        </Typography>
                      </Box>
                              }
                        sx={{ ml: 2 }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          color="error"
                          onClick={() => handleRemoveFriend(f.id)}
                          sx={{ width: 48, height: 48 }}
                        >
                          <PersonRemoveIcon sx={{ fontSize: 28 }} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                ) : (
                  <Typography sx={{ p: 2, textAlign: "center", color: "white" }}>
                    You have no friends yet.
                  </Typography>
                )}
              </List>
          </Box>
      </Paper>
    </Box>
  )
}
Friends.propTypes = {
  closeDialog: PropTypes.func.isRequired,
};