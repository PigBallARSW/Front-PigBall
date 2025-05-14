import React from "react";
import {Avatar} from "@mui/material"
import PropTypes from 'prop-types';
/**
 * Componente de información del jugador
 * @param {Object} props - Propiedades del componente
 * @param {number} props.width - Ancho del componente
 * @param {number} props.height - Alto del componente
 * @param {number} props.name - Nombre del jugador
 * @param {string} props.color - Nombre del jugador
 * @param {string} props.shadow - Color principal del jugador
 * @param {string} props.border - Color del borde
 * @param {JSX.Element} props.children -Customizacion del jugador
 * @returns {JSX.Element} Componente para mostrar la información del jugador
 */
export const User = ({width, height, name, color, shadow, border, children}) => {
  function stringAvatar() {
    const nameParts = name.split(" ");
    return {
      sx: {
        bgcolor: "white",
        fontSize: Math.min(width, height) * 0.5
      },
      children: nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : nameParts[0][0], 
    };
  }
  
  return (
    !children ? (
      <Avatar
      {...stringAvatar}
      sx={{
        width: {width},
        height: {height},
        bgcolor: color || "secondary.main",
        border: border || "3px solid white",
        boxShadow: shadow || "0 4px 8px rgba(0,0,0,0.2)",
      }}
    >
    </Avatar>) : 
    (<Avatar
    sx={{
      width: {width},
      height: {height},
      bgcolor: color || "secondary.main",
      border: border || "3px solid white",
      boxShadow: shadow || "0 4px 8px rgba(0,0,0,0.2)",
    }}
    >
      {children}
  </Avatar>)
    )
}
User.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  name: PropTypes.string,
  color: PropTypes.string,
  shadow: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.element,
};