import { Box, CircularProgress, Typography, Backdrop } from "@mui/material"
import { alpha } from "@mui/material/styles"
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"
import { keyframes } from "@emotion/react"
import PropTypes from 'prop-types'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const pulse = keyframes`
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 0.9;
  }
`

/**
 * Componente de overlay de carga para solicitudes a la API
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.open - Controla si el overlay está visible
 * @param {string} props.message - Mensaje opcional para mostrar durante la carga
 * @param {function} props.onClose - Función opcional para cerrar el overlay
 * @returns {JSX.Element} Componente de overlay de carga
 */
export const LoadResponse = ({ open = false, message = "Cargando datos...", onClose = () => {} }) => {
  return (
    <Backdrop
      open={open}
      onClick={onClose}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: alpha("#000", 0.7),
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          borderRadius: 2,
          backgroundColor: alpha("#1b5e20", 0.8),
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          border: "1px solid #4CAF50",
          maxWidth: "80%",
          animation: `${pulse} 2s infinite ease-in-out`,
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          {/* Círculo de progreso */}
          <CircularProgress
            size={60}
            thickness={4}
            sx={{
              color: "#4CAF50",
              position: "absolute",
            }}
          />

          {/* Balón de fútbol giratorio */}
          <SportsSoccerIcon
            sx={{
              fontSize: 30,
              color: "white",
              animation: `${spin} 1.5s infinite linear`,
              filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))",
            }}
          />
        </Box>

        {/* Mensaje de carga */}
        <Typography
          variant="body1"
          sx={{
            color: "white",
            textAlign: "center",
            fontWeight: "medium",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
          }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  )
}

LoadResponse.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  onClose: PropTypes.func
}