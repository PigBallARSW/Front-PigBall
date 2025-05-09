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
} from "@mui/material"
import {
  PersonAdd as PersonAddIcon,
  PersonRemove as PersonRemoveIcon,
  Search as SearchIcon,
  Person as PersonIcon
} from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"
import { useUserLogin } from "../../Modules/useUserLogin"
import { useUser } from "../../context/user/userContext"

export default function Friends() {
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
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
        px: 2,
      }}
    >

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
              FRIENDS
            </Typography>


      <Card
        elevation={4}
        sx={{
          width: "80%",
          maxWidth: 800,
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
        }}
      >

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          indicatorColor="secondary"
          textColor="inherit"
          sx={{ bgcolor: "primary.dark", color: "white" }}
        >
          <Tab label="Add Friend" />
          <Tab label="My Friends" />
        </Tabs>

        <CardContent
          sx={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            p: 2,
            bgcolor: "background.paper",
          }}
        >

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
                    <SearchIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
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
                            secondary={`Games: ${f.gamesPlayed ?? 0} • Win Rate: ${(f.winningPercentage ?? 0).toFixed(0)}%`}
                            sx={{ ml: 2 }}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              color="secondary"
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
                        secondary={`Games: ${f.gamesPlayed ?? 0} • Win Rate: ${(f.winningPercentage ?? 0).toFixed(0)}%`}
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
        </CardContent>
      </Card>
    </Container>
  )
}
