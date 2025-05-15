import React from "react";
import { User } from "./User";
import { Box, Typography } from "@mui/material";
import { Bolt, EmojiEvents, Favorite, Flag, Shield, SportsBasketball, SportsFootball, SportsSoccer, SportsTennis, Star } from "@mui/icons-material";
import PropTypes from 'prop-types';
/**
 * Componente customizacion del jugador
 * @param {Object} props - Propiedades del componente
 * @param {number} props.width - Ancho del componente
 * @param {number} props.height - Alto del componente
 * @param {string} props.playerName - Nombre del jugador
 * @param {string} props.playerColor - Color principal del jugador
 * @param {string} props.borderColor - Color del borde
 * @param {string} props.iconType - Tipo de ícono
 * @param {string} props.iconColor - Color del ícono
 * @param {string} props.icon - Nombre del ícono
 * @param {string} props.shadow - Sombra del jugador
 * @param {JSX.Element} props.children -Customizacion del jugador
 * @returns {JSX.Element} Componente para mostrar la customizacion del jugador
 */
export const CustomizerUser = ({ width, height, playerName, playerColor, borderColor, iconType, iconColor, icon, shadow }) => {
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
    };
    const selectCustomization = () => {
        switch (iconType) {
            case "image":
                return (
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            component="img"
                            src={icon}
                            alt="Custom"
                            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </Box>
                );
            case "icon":
                return (
                    <Box
                        sx={{
                            color: iconColor,
                            fontSize: Math.min(width, height) * 0.5,
                        }}
                    >
                        {icons[icon]}
                    </Box>
                );
            case "number":
                return (
                    <Typography
                        variant="h3"
                        component="span"
                        sx={{
                            fontWeight: "bold",
                            color: iconColor,
                            fontSize: Math.min(width, height) * 0.4,
                        }}
                    >
                        {icon}
                    </Typography>
                );
            case "emoji":
                return (
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: Math.min(width, height) * 0.5,
                        }}
                    >
                        {icon}
                    </Typography>
                );
            default:
                return null;
        }
    }


    return (
        <User
            name={playerName}
            width={width}
            height={height}
            color={playerColor}
            border={borderColor ? "3px solid " + borderColor : null}
            shadow={shadow}
        >
            {(iconType !== "none" && icon !== "none" && iconType && icon)  ? 
            selectCustomization() : null
            }
        </User>
    );
};
CustomizerUser.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  playerName: PropTypes.string,
  playerColor: PropTypes.string,
  borderColor: PropTypes.string,
  iconType: PropTypes.string,
  iconColor: PropTypes.string,
  icon: PropTypes.string,
  shadow: PropTypes.string
};



