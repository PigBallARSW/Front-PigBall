import { useState, useEffect } from "react"
import {
  Button,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"
import { useUserLogin } from "../../Modules/useUserLogin";
import { useMsal } from "@azure/msal-react";
import { useUser } from "../../context/user/userContext";
import { useNavigate } from "react-router-dom";
export const UsernameInput = (showUsernameDialog=true) => {
    const { accounts } = useMsal();
    const {setPlayer} = useUser()
    const [isUsernameValid, setIsUsernameValid] = useState(false)
    const [username, setUsername] = useState("")
    const {createNewUser} = useUserLogin();
    const navigate = useNavigate()
     useEffect(() => {
    setIsUsernameValid(username.length >= 3 && username.length <= 15)
  }, [username])
  const navigateToHome = (response) => {
    setPlayer(response)
    navigate("/homepage")
  }
    const handleUsernameSubmit = () => {
        if(isUsernameValid){
            const id = accounts[0].homeAccountId;
            createNewUser(id, username,navigateToHome)
        }
    }
  return(
    <Dialog
        open={showUsernameDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: "rgba(0, 50, 0, 0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "white",
            padding: 2,
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: { xs: "1.5rem", md: "1.75rem" } }}>
          <SportsSoccerIcon sx={{ mr: 1, verticalAlign: "middle" }} />
            Choose your player name
        </DialogTitle>

        <DialogContent>
          <Typography variant="body1" sx={{ mb: 3, color: "rgba(255, 255, 255, 0.8)", textAlign: "center" }}>
            Welcome! Now, choose how you want to be known on the field.
          </Typography>

          <TextField
            autoFocus
            margin="dense"
            label="Player name"
            fullWidth
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            helperText={
              username ? (isUsernameValid ? "Valid name" : "The name must be between 3 and 15 characters long.") : ""
            }
            error={username !== "" && !isUsernameValid}
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
                  borderColor: "#4caf50",
                },
              },
            }}
            InputLabelProps={{
              sx: { color: "rgba(255, 255, 255, 0.7)" },
            }}
            FormHelperTextProps={{
              sx: { color: isUsernameValid ? "#4caf50" : "error.main" },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 3, px: 3 }}>
          <Button
            onClick={handleUsernameSubmit}
            variant="contained"
            disabled={!isUsernameValid}
            sx={{
              py: 1,
              px: 4,
              borderRadius: "50px",
              background: "linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)",
              boxShadow: "0 4px 8px rgba(46, 125, 50, 0.3)",
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Enter the game!
          </Button>
        </DialogActions>
      </Dialog>
  )
};