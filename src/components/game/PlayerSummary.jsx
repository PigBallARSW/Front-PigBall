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
import PropTypes from 'prop-types'
/**
 * Componente para resumir los jugadores
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.players - Lista de jugadores
 * @param {string} props.message - Mnesaje en caso de no haber jugadores
 * @returns {JSX.Element} Resume el juego
 */
export const PlayerSummary = ({ players, message }) => {
    const messageChip = (scorer) => {
        if(scorer.assist){
            return scorer.assist > 1 ? scorer.assist +" assists" : scorer.assist +" assist"
        }
        return scorer.goal > 1 ? scorer.goal +" goals" : scorer.goal +" goal"
    }
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
            label={messageChip(scorer)}
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
PlayerSummary.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    team: PropTypes.number.isRequired,
    goal: PropTypes.number,
    assist: PropTypes.number,
    image: PropTypes.string,
    borderColor: PropTypes.string,
    centerColor: PropTypes.string,
    iconType: PropTypes.string,
    iconColor: PropTypes.string,
  })),
  message: PropTypes.string.isRequired
};