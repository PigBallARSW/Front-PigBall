"use client"
import React, { useState, useEffect } from "react"
import {
  Container,
  Typography,
  Card,
  CardContent,
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
  Avatar,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material"
import {
  PersonAdd as PersonAddIcon,
  PersonRemove as PersonRemoveIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  PersonAdd,
  Search
} from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"
import { useUserLogin } from "../../Modules/useUserLogin"
import { useUser } from "../../context/user/userContext"
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"

export default function Friends({closeDialog, isOpen}) {
  const [tab, setTab] = useState(0)
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [friends, setFriends] = useState([])

  const {
    getFriendSuggestions,
    sendFriendRequest,
    fetchFriends,
    deleteFriend
  } = useUserLogin()
  const { playerData } = useUser()

  //Carga sugerencias
  useEffect(() => {
    if (!playerData?.id) return
    const timeout = setTimeout(() => {
      getFriendSuggestions(playerData.id, { search: query })
        .then(setSuggestions)
        .catch(() => setSuggestions([]))
    }, 500)
    return () => clearTimeout(timeout)
  }, [query, playerData, getFriendSuggestions])


  useEffect(() => {
    if (!playerData?.id) return
    fetchFriends(playerData.id, setFriends)
  }, [playerData, fetchFriends])

  const handleAddFriend = async (id) => {
    await sendFriendRequest(playerData.id, id, () => {
      setSuggestions(s => s.filter(u => u.id !== id))
      fetchFriends(playerData.id, setFriends)
    })
  }
  const handleRemoveFriend = async (id) => {
    await deleteFriend(playerData.id, id, () => {
      setFriends(f => f.filter(u => u.id !== id))
    })
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      fullWidth
      slotProps={{
      paper: {
        sx: {
            bgcolor: "#222",
            color: "white",
            borderRadius: 2,
            border: "2px solid #4CAF50",
            height: "100%"
        },
      },
      }}
    >
      <DialogTitle sx={{ bgcolor: "rgba(27, 94, 32, 0.9)", display: "flex", alignItems: "center" }}>
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
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
          <Box
            sx={{
              display: tab === 0 ? "flex" : "none",
              flex: 1,
              minHeight: 0,
              flexDirection: "column",
            }}
          >
            <TextField
              variant="outlined"
              size="medium"
              fullWidth
              label="Search Friends"
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
                }
              }}
              sx={{
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgb(255, 255, 255)",
                opacity: 1,
              },
            }}
            />
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Suggestions:
            </Typography>
            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                pr: 1,
              }}
            >
              <List disablePadding>
                <AnimatePresence>
                  {suggestions.length > 0 ? (
                    suggestions.map((f) => (
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
                            <Avatar sx={{ width: 40, height: 40 }}>
                              <PersonIcon sx={{ fontSize: 28 }} />
                            </Avatar>
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
                              color="primary"
                              onClick={() => handleAddFriend(f.id)}
                              sx={{ width: 48, height: 48 }}
                            >
                              <PersonAddIcon sx={{ fontSize: 28 }} />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </motion.div>
                    ))
                  ) : (
                    <Typography sx={{ p: 2, textAlign: "center", color: "text.disabled" }}>
                      No suggestions found.
                    </Typography>
                  )}
                </AnimatePresence>
              </List>
            </Box>
          </Box>

          <Box
            sx={{
              display: tab === 1 ? "flex" : "none",
              flex: 1,
              minHeight: 0,
              flexDirection: "column",
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Your Friends:
            </Typography>
            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                pr: 1,
              }}
            >
              <List disablePadding>
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
                        <Avatar sx={{ width: 40, height: 40 }}>
                          <PersonIcon sx={{ fontSize: 28 }} />
                        </Avatar>
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
                  <Typography sx={{ p: 2, textAlign: "center", color: "text.disabled" }}>
                    You have no friends yet.
                  </Typography>
                )}
              </List>
            </Box>
          </Box>
      </DialogContent>
    </Dialog>
  )
}
