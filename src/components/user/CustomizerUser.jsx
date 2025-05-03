import React from "react";
import { User } from "./User";
import { Box, Typography } from "@mui/material";
import { Bolt, EmojiEvents, Favorite, Flag, Shield, SportsBasketball, SportsFootball, SportsSoccer, SportsTennis, Star } from "@mui/icons-material";
 
export const CustomizerUser = ({ width, height, playerName, playerColor, borderColor, iconType, iconColor, icon }) => {
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

    return (
        <User
            name={playerName}
            width={width}
            height={height}
            color={playerColor}
            border={borderColor ? "3px solid " + borderColor : null}
        >
            {iconType !== "none" && icon !== "none" ? 
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    overflow: "hidden",
                }}
            >
                {iconType === "image" ? (
                    <Box
                    sx={{
                        width: "60%",
                        height: "60%",
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
                ) : iconType === "icon" ? (
                    <Box
                        sx={{
                            color: iconColor,
                            fontSize: Math.min(width, height) * 0.5,
                        }}
                    >
                        {icons[icon]}
                    </Box>
                ) : iconType === "number" ? (
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
                ) : (
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: Math.min(width, height) * 0.5,
                        }}
                    >
                        {icon}
                    </Typography>
                )
                }
            </Box> : null
            }
        </User>
    );
};



