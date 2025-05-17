import React, { useState } from "react"
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  TextField as MuiTextField,
  Slider,
  FormHelperText,
  RadioGroup,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Radio,
} from "@mui/material"
import {
  SportsSoccer,
  Lock,
  Close,
  Check,
  Groups,
  Public,
} from "@mui/icons-material"
import {useLobbyService } from "../../Modules/useLobbyService";
import { useUser } from "../../context/user/userContext";
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import backgroundAsset from '../../assets/images/tile2.png'; 
import backgroundAsset2 from '../../assets/images/tile3.png';
import backgroundAsset3 from '../../assets/images/tile4.png';
import { useStyle } from "../../context/style/styleContext";
const availableStyles = [
  {
    id: "classic",
    name: "Classic",
    description: "The traditional style of football.",
    image: backgroundAsset,
  },
  {
    id: "urban",
    name: "Urban",
    description: "Street courts and urban environments.",
    image:
     backgroundAsset2,
  },
  {
    id: "dessert",
    name: "Dessert",
    description: "Dry and dusty terrain.",
    image:
      backgroundAsset3,
  },
]
/**
 * Componente crear sala
 * @param {Object} props - Propiedades del componente
 * @param {function} props.OpenDialog - Abrir el dialog
 * * @param {function} props.CloseDialog - Cerrar el dialog
 * @returns {JSX.Element} Componente para crear una sala
 */
export const CreateRoom = ({OpenDialog,CloseDialog}) => {
  const {createNewRoom} = useLobbyService();
  const {playerData} = useUser();
  const [style, setStyle] = useState("classic")
  const { setSelectedStyle } = useStyle();
    const [newRoom, setNewRoom] = useState({
      name: "",
      isPrivate: false,
      maxPlayers: 2,
      description: ""
    })
    const [formErrors, setFormErrors] = useState({
      name: false,
    })
    const handleCloseCreateDialog = () => {
      CloseDialog();
      setNewRoom({
        name: "",
        isPrivate: false,
        maxPlayers: 2,
        description: ""
      })
      setFormErrors({
        name: false,
      })
    }
  
    const handleRoomInputChange = (e) => {
      const { name, value } = e.target
      setNewRoom({
        ...newRoom,
        [name]: value,
      })
      if (name === "name") {
        setFormErrors({
          ...formErrors,
          name: value.trim() === "",
        })
      }
    }
  
    const handleSwitchChange = (e) => {
      setNewRoom({
        ...newRoom,
        isPrivate: e.target.checked,
      })
    }
  
    const handleSliderChange = (e, newValue) => {
      setNewRoom({
        ...newRoom,
        maxPlayers: newValue,
      })
    } 
    const handleCreateRoom = async () => {
      if (newRoom.name.trim() === "") {
        setFormErrors({
          ...formErrors,
          name: true,
        })
        return;
      }
      handleCloseCreateDialog();
      setSelectedStyle(style)
      createNewRoom(newRoom, playerData.username);
    }
    const handleStyleChange = (e) => {
      setStyle(e.target.value)
    }

  return (
    <Dialog
    open={OpenDialog}
    onClose={handleCloseCreateDialog}
    maxWidth="sm"
    fullWidth
    slotProps={{
      paper: {
        component: 'form',
        onSubmit: (e) => {
          e.preventDefault();
          handleCreateRoom();
        },
        sx: {
          borderRadius: 3,
          bgcolor: "#1d4c1f",
          border: "3px solid #4CAF50",
          boxShadow: "0 0 20px rgba(60, 145, 63, 0.42)",
          color: "white",
          overflow: "hidden",
        },
      },
    }}
    
  >
    <DialogTitle
      sx={{
        bgcolor: "rgb(75, 145, 61)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "2px solid #4CAF50",
        py: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <SportsSoccer sx={{ mr: 1, color: "white" }} />
        <Typography variant="h6" component="span" sx={{ fontWeight: "bold" }}>
        Create New Room
        </Typography>
      </Box>
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleCloseCreateDialog}
        aria-label="close"
        sx={{ color: "white" }}
      >
        <Close />
      </IconButton>
    </DialogTitle>
    <DialogContent
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.7)",
        padding: 3
      }}
    >
        <MuiTextField
          margin="dense"
          label="Room Name"
          type="text"
          fullWidth
          variant="outlined"
          name="name"
          value={newRoom.name}
          onChange={handleRoomInputChange}
          error={formErrors.name}
          helperText={formErrors.name ? "The room name is required" : ""}
          required
          InputLabelProps={{
            sx: { color: "rgba(255, 255, 255, 0.7)" },
          }}
          InputProps={{
            sx: {
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.3)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.5)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4CAF50",
              },
            },
          }}
          sx={{ mb: 3 }}
        />

        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
          Maximum Number of Players: {newRoom.maxPlayers}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Groups sx={{ color: "rgba(255, 255, 255, 0.7)", mr: 1 }} />
            <Slider
              value={newRoom.maxPlayers}
              onChange={handleSliderChange}
              step={2}
              marks
              min={2}
              max={20}
              valueLabelDisplay="auto"
              sx={{
                color: "#4CAF50",
                "& .MuiSlider-thumb": {
                  bgcolor: "white",
                },
                "& .MuiSlider-rail": {
                  bgcolor: "rgba(255, 255, 255, 0.3)",
                },
                "& .MuiSlider-mark": {
                  bgcolor: "rgba(255, 255, 255, 0.5)",
                },
              }}
            />
          </Box>
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={newRoom.isPrivate}
              onChange={handleSwitchChange}
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#4CAF50",
                  "&:hover": {
                    backgroundColor: "rgba(76, 175, 80, 0.08)",
                  },
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#4CAF50",
                },
              }}
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {newRoom.isPrivate ? (
                <Lock fontSize="small" sx={{ mr: 0.5, color: "rgba(255, 255, 255, 0.9)" }} />
              ) : (
                <Public fontSize="small" sx={{ mr: 0.5, color: "rgba(255, 255, 255, 0.9)" }} />
              )}
              <Typography sx={{ color: "rgba(255, 255, 255, 0.9)" }}>
                {newRoom.isPrivate ? "Private Room" : "Public Room"}
              </Typography>
            </Box>
          }
          sx={{ mb: 1 }}
        />
        <FormHelperText sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          {newRoom.isPrivate
            ? "Only players with the code will be able to join"
            : "Any player will be able to find and join this room"}
        </FormHelperText>
        <Box sx={{mt: 3}}>
         <Typography variant="h6" sx={{ color: "white", mb: 2, fontWeight: "bold" }}>
                  Select an Style
                </Typography>
                <RadioGroup
                  aria-label="style"
                  name="style"
                  value={style}
                  onChange={handleStyleChange}
                  sx={{ mb: 2 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    {availableStyles.map((styleOption) => (
                      <Card
                        key={styleOption.id}
                        component={motion.div}
                        whileHover={{ scale: 1.03 }}
                        sx={{
                          bgcolor: "rgba(0, 0, 0, 0.7)",
                          border: style === styleOption.id ? "2px solid #4CAF50" : "2px solid transparent",
                          borderRadius: 2,
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                          boxShadow: style === styleOption.id ? "0 0 15px rgba(76, 175, 80, 0.7)" : "none",
                          width: { xs: "100%", sm: "32%" },
                        }}
                      >
                        <CardActionArea onClick={() => setStyle(styleOption.id)}>
                          <CardMedia
                            component="img"
                            height="100"
                            image={styleOption.image}
                            alt={styleOption.name}
                            sx={{
                              opacity: style === styleOption.id ? 1 : 0.7,
                              transition: "opacity 0.3s ease",
                              objectFit: "cover",
                            }}
                          />
                          <CardContent sx={{ p: 1.5 }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                              <Radio
                                checked={style === styleOption.id}
                                value={styleOption.id}
                                name="style-radio"
                                sx={{
                                  color: "rgba(255, 255, 255, 0.7)",
                                  "&.Mui-checked": {
                                    color: "#4CAF50",
                                  },
                                  p: 0.5,
                                  mr: 0.5,
                                }}
                              />
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  fontWeight: "bold",
                                  color: "white",
                                  fontSize: "0.9rem",
                                }}
                              >
                                {styleOption.name}
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "rgba(255, 255, 255, 0.7)",
                                fontSize: "0.75rem",
                                ml: 3.5, // Alinear con el texto del título
                              }}
                            >
                              {styleOption.description}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    ))}
                  </Box>
                </RadioGroup>
                </Box>
    </DialogContent>
    <DialogActions
      sx={{
        bgcolor: "rgb(75, 145, 61)",
        borderTop: "2px solid #4CAF50",
        py: 1.5,
        px: 3,
      }}
    >
      <Button
        type="submit"
        variant="contained"
        startIcon={<Check />}
        sx={{
          bgcolor: "white",
          color: "#1b5e20",
          "&:hover": {
            bgcolor: "#e0e0e0",
          },
          ml: 2,
        }}
      >
        Create Room
      </Button>
    </DialogActions>
  </Dialog>
  )
}

CreateRoom.propTypes = {
  OpenDialog: PropTypes.func.isRequired,
  CloseDialog: PropTypes.func.isRequired,
}