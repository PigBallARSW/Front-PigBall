import { useEffect, useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
  styled,
  CardHeader,
  alpha,
  AppBar,
} from "@mui/material"
import {
  CloudUpload,
  Download,
  SportsSoccer,
  EmojiEvents,
  Star,
  Flag,
  Shield,
  SportsTennis,
  Bolt,
  Favorite,
  SportsBasketball,
  SportsFootball,
} from "@mui/icons-material"
import { useUser } from "../../context/user/userContext"
import { useUserLogin } from "../../Modules/useUserLogin"
import { useNavigate } from "react-router-dom"
import { CustomizerUser } from "../user/CustomizerUser"
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})


function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`player-tabpanel-${index}`}
      aria-labelledby={`player-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}
TabPanel.propTypes = {
  children: PropTypes.node.isRequired, 
  value: PropTypes.any.isRequired, 
  index: PropTypes.any.isRequired, 
};
/**
 * Componente mostrar caracterizacion del jugador
 * @returns {JSX.Element} Componente para mostrar info del jugador
 */
export default function CustomPlayer() {
    const navigate = useNavigate();
  const {playerData, setPlayer} = useUser();
  const {updateCharacter} = useUserLogin();
  const username = playerData?.username;
  const [playerColor, setPlayerColor] = useState(playerData?.centerColor || "#ffc107")
  const [emblemType, setEmblemType] = useState(playerData?.iconType || "none")
  const [emblemColor, setEmblemColor] = useState(playerData?.iconColor || "#ffffff")
  const [playerNumber, setPlayerNumber] = useState(playerData?.iconType === "number" ? playerData?.image : "10")
  const [borderColor, setBorderColor] = useState(playerData?.borderColor || "#ffffff")
  const [selectedIcon, setSelectedIcon] = useState(playerData?.iconType === "icon" ? playerData?.image : "football")
  const [selectedEmoji, setSelectedEmoji] = useState(playerData?.iconType === "emoji" ? playerData?.image : "😎")
  const [customImage, setCustomImage] = useState(playerData?.iconType === "image" ? playerData?.image : "")
  const [playerName, setPlayerName] = useState(username || "")
  const [showField, setShowField] = useState(true)
  const [tabValue, setTabValue] = useState(0)
  const [isUsernameValid, setIsUsernameValid] = useState(false)
  const icons = {
    football: <SportsSoccer fontSize="inherit" />,
    trophy: <EmojiEvents fontSize="inherit" />,
    star: <Star fontSize="inherit" />,
    flag: <Flag fontSize="inherit" />,
    shield: <Shield fontSize="inherit" />,
    tennis: <SportsTennis fontSize="inherit" />,
    bolt: <Bolt fontSize="inherit" />,
    heart: <Favorite fontSize="inherit" />,
    basketball: <SportsBasketball fontSize="inherit" />,
    american: <SportsFootball fontSize="inherit" />,
  }

  const emojis = ["😎", "😁", "😂", "🤩", "😍", "🤔", "😤", "🥳", "🤑", "😈", "👑", "🔥"]

  const teamColors = [
    { name: "Barcelona", primary: "#a50044", secondary: "#004d98" },
    { name: "Real Madrid", primary: "#ffffff", secondary: "#00529f" },
    { name: "Liverpool", primary: "#c8102e", secondary: "#ffffff" },
    { name: "Man City", primary: "#6cabdd", secondary: "#ffffff" },
    { name: "Bayern Munich", primary: "#dc052d", secondary: "#0066b2" },
    { name: "PSG", primary: "#004170", secondary: "#e30613" },
  ]

  const customColors = [
    "#3498db",
    "#e74c3c",
    "#2ecc71",
    "#f1c40f",
    "#9b59b6",
    "#1abc9c",
    "#e67e22",
    "#34495e",
    "#7f8c8d",
    "#16a085",
    "#d35400",
    "#8e44ad",
  ]

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCustomImage(e.target.result)
        setEmblemType("image")
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const getIcon = () => {
    switch (emblemType){
        case "emoji":
            return selectedEmoji
        case "number":
            return playerNumber.toString()
        case "icon":
            return selectedIcon
        case "image":
            if(customImage || customImage!== "")  return customImage
            return "none"
        default:
            return "none"
    }
  }
  useEffect(() => {
      setIsUsernameValid(playerName.length >= 3 && playerName.length <= 15)
    }, [playerName])
    const cancelCustom = () =>{
        navigate("/homepage")
    }
    const update = (response) => {
        setPlayer(response)
        navigate("/homepage")
    }
  const saveCharacter = async () => {
    let centerIcon = getIcon()
    if(playerData?.id && isUsernameValid){
        const requestBody = {
            username: playerName,
            image: centerIcon,
            centerColor: playerColor,
            borderColor: borderColor,
            iconColor: emblemColor,
            iconType: emblemType
        }
        await updateCharacter(playerData.id, requestBody, update)
    }
  }

  return (
    <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                backgroundColor: alpha("#000", 0.7),
                p: 2,
              }}
            >
    
        <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ color: "secondary.light" }}>
            At the time of playing the team color will be assigned
             </Typography>
        </Box>
        
            <Grid container spacing={3} sx={{ flex: 1 }}>
                {/* Vista previa */}
                <Grid item xs={12} md={4}>
                <Card sx={{bgcolor:alpha("#1b5e20", 0.3)}}>
                    <CardHeader
                            title="Customize Character"
                            slotProps={{ align: "center", variant: "h5" }}
                            sx={{ borderBottom: "1px solid #6da76f", color: "secondary.main" }}
                    />
                    <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
                    {showField ? (
                        <Paper
                        elevation={0}
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: 240,
                            bgcolor: "#4caf50",
                            borderRadius: 2,
                            mb: 2,
                            overflow: "hidden",
                        }}
                        >
                        {/* Campo de fútbol */}
                        <Box
                            sx={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            }}
                        >
                            <Box
                            sx={{
                                width: 180,
                                height: 180,
                                border: "2px solid rgba(255,255,255,0.5)",
                                borderRadius: "50%",
                            }}
                            />
                            <Box
                            sx={{
                                position: "absolute",
                                width: 1,
                                height: 180,
                                bgcolor: "rgba(255,255,255,0.5)",
                            }}
                            />
                        </Box>

                        {/* Jugador */}
                        <Box
                            sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            }}
                        >
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                           <CustomizerUser width={80} height={80} playerName={playerName} playerColor={playerColor} borderColor={borderColor} iconType={emblemType} iconColor={emblemColor} icon={getIcon()}/>
                            </Box>
                            <Paper
                            elevation={1}
                            sx={{
                                mt: 1,
                                px: 1,
                                py: 0.5,
                                bgcolor: "rgba(0,0,0,0.6)",
                                color: "white",
                                textAlign: "center",
                                borderRadius: 1,
                            }}
                            >
                            <Typography variant="body2" sx={{ fontWeight: "bold"}}>
                                {playerName}
                            </Typography>
                            </Paper>
                        </Box>
                        </Paper>
                    ) : (
                        <Box sx={{ mb: 2, textAlign: "center" }}>
                             <Box sx={{ display: "flex", justifyContent: "center" }}>
                             <CustomizerUser width={180} height={180} playerName={playerName} playerColor={playerColor} borderColor={borderColor} iconType={emblemType} iconColor={emblemColor} icon={getIcon()}/>
                            </Box>
                        <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold", color:"primary.light" }}>
                            {playerName}
                        </Typography>
                        </Box>
                    )}
                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                        <Button
                        variant={showField ? "contained" : "outlined"}
                        size="small"
                        onClick={() => setShowField(true)}
                        color="secondary"
                        >
                        In Field
                        </Button>
                        <Button
                        variant={!showField ? "contained" : "outlined"}
                        size="small"
                        onClick={() => setShowField(false)}
                        color="secondary"
                        >
                        Single Player
                        </Button>
                    </Box>

                    <Button variant="contained" color="primary" startIcon={<Download />} sx={{ mt: 3}} onClick={saveCharacter} fullWidth>
                        Save Player
                    </Button>
                    <Button variant="contained" color="error" startIcon={<CancelIcon />} sx={{ mt: 3 }} onClick={cancelCustom} fullWidth>
                        Cancel
                    </Button>
                    </CardContent>
                </Card>
                </Grid>

                {/* Opciones de personalización */}
                <Grid item xs={12} md={8} >
                <Box sx={{bgcolor:alpha("#1b5e20", 0.3)}} >
                    <AppBar position="static" sx={{color:"primary.light"}} enableColorOnDark>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        textColor="secondary"
                        indicatorColor="secondary"
                    >
                        <Tab label="Basic" sx={{color:"secondary.main"}}/>
                        <Tab label="Color" sx={{color:"secondary.main"}}/>
                        <Tab label="Emblem" sx={{color:"secondary.main"}}/>
                    </Tabs>
                    </AppBar>

                    {/* Pestaña básica */}
                    <TabPanel value={tabValue} index={0} >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                        <TextField
                            fullWidth
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            variant="outlined"
                            label="Player Name" color="secondary"
                            helperText={
                            isUsernameValid ? "Valid name" : "The name must be between 3 and 15 characters long."
                            }
                            error={!playerName && !isUsernameValid}
                            InputProps={{
                            sx: {
                                color: "white",
                                "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "secondary.main",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "secondary.main",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "secondary.main",
                                },
                            },
                            }}
                            InputLabelProps={{
                            sx: { color: "secondary.main" },
                            }}
                            FormHelperTextProps={{
                            sx: { color: isUsernameValid ? "secondary.main" : "error.main" },
                            }}
                            autoFocus
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            label="Player Number" color="secondary"
                            value={playerNumber}
                            onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "")
                            setPlayerNumber(val.slice(0, 2))
                            if (val) setEmblemType("number")
                            }}
                            inputProps={{ sx: {
                                color: "secondary.main",
                              }, maxLength: 2 }}
                            variant="outlined"
                            focused
                        />
                        </Grid>
                    </Grid>
                    </TabPanel>

                    {/* Pestaña de colores */}
                    <TabPanel value={tabValue} index={1}>
                    <Typography variant="h6" sx={{color:"secondary.main"}} gutterBottom>
                        Colors of Popular Teams
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 4 }}>
                        {teamColors.map((team) => (
                        <Grid item xs={6} sm={4} key={team.name}>
                            <Button
                            fullWidth
                            sx={{
                                height: 64,
                                textAlign: "center",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                color: "secondary.main",
                                borderColor: "secondary.main",
                            }}
                            onClick={() => {
                                setPlayerColor(team.primary)
                                setBorderColor(team.secondary)
                            }}
                            >
                            <Box sx={{ display: "flex", mb: 1 }}>
                                <Box
                                sx={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                    mr: 0.5,
                                    bgcolor: team.primary,
                                }}
                                />
                                <Box
                                sx={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                    bgcolor: team.secondary,
                                }}
                                />
                            </Box>
                            <Typography variant="body2">{team.name}</Typography>
                            </Button>
                        </Grid>
                        ))}
                    </Grid>

                    <Typography variant="h6" sx={{color:"secondary.main"}} gutterBottom>
                    Custom Color
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                            {customColors.map((color) => (
                            <IconButton
                                key={color}
                                sx={{
                                width: 40,
                                height: 40,
                                bgcolor: color,
                                border: playerColor === color ? "2px solid black" : "none",
                                "&:hover": { bgcolor: color },
                                }}
                                onClick={() => setPlayerColor(color)}
                            />
                            ))}
                        </Box>
                        </Grid>
                        <Grid item xs={12}>
                        <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Custom Color" color="secondary"
                            value={playerColor}
                            onChange={(e) => setPlayerColor(e.target.value)}
                            variant="outlined"
                            error={playerName !== "" && !isUsernameValid}
                            fullWidth
                            InputProps={{
                            startAdornment: (
                                <Box
                                component="input"
                                type="color"
                                value={playerColor}
                                onChange={(e) => setPlayerColor(e.target.value)}
                                sx={{
                                    width: 40,
                                    height: 40,
                                    border: "none",
                                    padding: 0,
                                    mr: 1,
                                    backgroundColor: "transparent"
                                }}
                                />
                            ),
                            sx: {color: "secondary.main"}
                            }}
                            focused
                        />
                        <TextField
                            label="Border Color" color="secondary"
                            value={borderColor}
                            onChange={(e) => setBorderColor(e.target.value)}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                            startAdornment: (
                                <Box
                                component="input"
                                type="color"
                                value={borderColor}
                                onChange={(e) => setBorderColor(e.target.value)}
                                sx={{
                                    width: 40,
                                    height: 40,
                                    border: "none",
                                    padding: 0,
                                    mr: 1,
                                    backgroundColor: "transparent"
                                }}
                                />
                            ),
                            sx: {color: "secondary.main"}
                            }}
                            focused
                        />
                        </Box>
                        </Grid>
                    </Grid>
                    </TabPanel>

                    {/* Pestaña de emblema */}
                    <TabPanel value={tabValue} index={2}>
                    <Box sx={{ mb: 3 }}>
                    <FormControl fullWidth>
                        <Select
                        labelId="emblem-type-label"
                        value={emblemType}
                        onChange={(e) => setEmblemType(e.target.value)}
                        sx={{
                            color: "secondary.main",                        
                            ".MuiOutlinedInput-notchedOutline": {
                            borderColor: "secondary.main",               
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "secondary.main",              
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "secondary.main",               
                            },
                            ".MuiSvgIcon-root": {
                            color: "secondary.main"                      
                            }
                        }}
                        >
                        <MenuItem value="number">Number</MenuItem>
                        <MenuItem value="icon" >Icon</MenuItem>
                        <MenuItem value="emoji" >Emoji</MenuItem>
                        <MenuItem value="image" >Image</MenuItem>
                        <MenuItem value="none" >None</MenuItem>
                        </Select>
                    </FormControl>
                    </Box>


                    {emblemType === "icon" && (
                        <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" gutterBottom color="secondary">
                            Select a football icon
                        </Typography>
                        <Grid container spacing={1}>
                            {Object.entries(icons).map(([name, icon]) => (
                            <Grid item xs={4} sm={2} key={name}>
                                <Button
                                variant={selectedIcon === name ? "contained" : "outlined"}
                                sx={{
                                    minWidth: 64,
                                    height: 64,
                                    fontSize: 32,
                                    color: "secondary.main",
                                    borderColor: "secondary.main"
                                }}
                                onClick={() => {
                                    setSelectedIcon(name)
                                }}
                                fullWidth
                                >
                                {icon}
                                </Button>
                            </Grid>
                            ))}
                        </Grid>
                        </Box>
                    )}

                    {emblemType === "emoji" && (
                        <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" gutterBottom color="secondary">
                        Select an emoji
                        </Typography>
                        <Grid container spacing={1}>
                            {emojis.map((emoji) => (
                            <Grid item xs={3} sm={2} key={emoji}>
                                <Button
                                variant={selectedEmoji === emoji ? "contained" : "outlined"}
                                sx={{
                                    minWidth: 56,
                                    height: 56,
                                    fontSize: 24,
                                    borderColor: "secondary.main"
                                }}
                                onClick={
                                    () => {
                                        setSelectedEmoji(emoji)
                                    }
                                }
                                fullWidth
                                >
                                {emoji}
                                </Button>
                            </Grid>
                            ))}
                        </Grid>
                        </Box>
                    )}

                    {emblemType === "image" && (
                        <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" gutterBottom color="secondary">
                        Upload your own image
                        </Typography>
                        <Paper
                            variant="outlined"
                            sx={{
                            p: 3,
                            textAlign: "center",
                            border: "2px dashed rgba(0, 0, 0, 0.2)",
                            borderRadius: 2,
                            backgroundColor:"#6da570"
                            }}
                        >
                            {customImage ? (
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    mb: 2,
                                }}
                                >
                                <Box
                                    component="img"
                                    src={customImage}
                                    alt="Custom"
                                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                                </Box>
                                <Button variant="outlined" size="small" onClick={() => setCustomImage("")}>
                                Change image
                                </Button>
                            </Box>
                            ) : (
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <CloudUpload sx={{ fontSize: 48, color: "text.secondary", mb: 1 }} />
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Click to upload or drag an image here
                                </Typography>
                                <Button component="label" variant="contained" startIcon={<CloudUpload />}>
                                Select image
                                <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageUpload} />
                                </Button>
                            </Box>
                            )}
                        </Paper>
                        </Box>
                    )}

                    {emblemType !== "none" && emblemType !== "emoji" && emblemType !== "image" && (
                        <Box sx={{ mt: 3 }}>
                        <TextField
                            label="Emblem Color" color="secondary"
                            value={emblemColor}
                            onChange={(e) => setEmblemColor(e.target.value)}
                            variant="outlined"
                            fullWidth
                            InputProps={{
                            startAdornment: (
                                <Box
                                component="input"
                                type="color"
                                value={emblemColor}
                                onChange={(e) => setEmblemColor(e.target.value)}
                                sx={{
                                    width: 40,
                                    height: 40,
                                    border: "none",
                                    padding: 0,
                                    mr: 1,
                                    backgroundColor: "transparent"
                                }}
                                />
                            ),
                            sx: {color: "secondary.main"}
                            }}
                            focused
                        />
                        </Box>
                    )}
                    </TabPanel>
                </Box>
                </Grid>
            </Grid>
            </Box>
  )
}
