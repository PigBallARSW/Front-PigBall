import React from "react";
import {Avatar} from "@mui/material"
 
export const User = ({width, height, name, move, border, color}) => {
  function stringAvatar() {
    const nameParts = name.split(" ");
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : nameParts[0][0], // Si solo tiene un nombre, toma la primera letra.
    };
  }
  
  function stringToColor(string) {
    console.log(move);
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }
  return (
      <Avatar
      {...stringAvatar(`${name}`)}
      sx={{
        width: {width},
        height: {height},
        bgcolor: color ? color : "secondary.main",
        border: "3px solid "+`${border}`,
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
    </Avatar>
    )
}