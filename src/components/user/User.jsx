import React from "react";
import {Avatar} from "@mui/material"
 
export const User = ({width, height, name, color, shadow, border, children}) => {
  function stringAvatar() {
    const nameParts = name.split(" ");
    return {
      sx: {
        bgcolor: "white",
      },
      children: nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : nameParts[0][0], 
    };
  }
  
  return (
    !children ? (
      <Avatar
      {...stringAvatar(`${name}`)}
      sx={{
        width: {width},
        height: {height},
        bgcolor: color ? color : "secondary.main",
        border: border ? border : "3px solid white",
        boxShadow: shadow ? shadow : "0 4px 8px rgba(0,0,0,0.2)",
      }}
    >
    </Avatar>) : 
    (<Avatar
    sx={{
      width: {width},
      height: {height},
      bgcolor: color ? color : "secondary.main",
      border: border ? border : "3px solid white",
      boxShadow: shadow ? shadow : "0 4px 8px rgba(0,0,0,0.2)",
    }}
    >
      {children}
  </Avatar>)
    )
}