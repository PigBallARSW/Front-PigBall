import React from "react"
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
} from "@mui/material"
import { alpha } from "@mui/material/styles"
import { CustomizerUser } from "../user/CustomizerUser"
import { colors, winner } from "../../context/color/teamCustom"

export default function PlayerSummary({ players, message }) {
  return (
    players.length > 0 ? (
    <List sx={{ bgcolor: alpha("#333", 0.3), borderRadius: 2 }}>
    {players.map((scorer, index) => (
        <ListItem
        key={scorer.id}
        sx={{
            borderBottom: index < players.length - 1 && `1px solid ${alpha("#fff", 0.1)}`,
        }}
        >
        <ListItemAvatar>
        <CustomizerUser 
            width={40} 
            height={40} 
            playerName={scorer.name} 
            playerColor={scorer.centerColor || colors[scorer.team]} 
            borderColor={scorer.borderColor} 
            iconType={scorer.iconType} 
            iconColor={scorer.iconColor} 
            icon={scorer.image}/>
        </ListItemAvatar>
        <ListItemText
            primary={
            <Typography variant="subtitle1" sx={{ color: "white" }}>
                {scorer.name}
            </Typography>
            }
            secondary={
            <Typography variant="body2" sx={{ color: "white", opacity: 0.7 }}>
                Team {winner[scorer.team]}
            </Typography>
            }
        />
        <Chip
            label={scorer.assist ? (scorer.assist > 1 ? scorer.assist +" assist" : scorer.assist +" assists") : (scorer.goal > 1 ? scorer.goal +" goal" : scorer.goal +" goals")}
            size="small"
            sx={{
            bgcolor: alpha(colors[scorer.team], 0.2),
            color: colors[scorer.team],
            border: `1px solid ${alpha(colors[scorer.team], 0.5)}`,
            }}
        />
        </ListItem>
    ))}
    </List>) : (
        <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>{message}
            </Typography>
        </Box>
        )
    )
}