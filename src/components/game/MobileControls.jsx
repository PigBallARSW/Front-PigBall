"use client"
import { Box, IconButton, Fab } from "@mui/material"
import { alpha } from "@mui/material/styles"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"

export default function MobileControls({ onMoveStart, onMoveEnd, onActionStart, onActionEnd }) {

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        p: 2,
        zIndex: 100,
      }}
    >
      {/* Controles direccionales (izquierda) */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gap: 0.5,
          width: "150px",
          height: "150px",
        }}
      >
        {/* Fila superior */}
        <Box sx={{ gridColumn: "1 / 2", gridRow: "1 / 2" }} /> {/* Espacio vacío */}
        <IconButton
          onTouchStart={() => onMoveStart("ArrowUp")}
          onTouchEnd={() => onMoveEnd("ArrowUp")}
          sx={{
            gridColumn: "2 / 3",
            gridRow: "1 / 2",
            bgcolor: alpha("#000000", 0.6),
            color: "white",
            "&:hover": { bgcolor: alpha("#000000", 0.8) },
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <KeyboardArrowUpIcon fontSize="large" />
        </IconButton>
        <Box sx={{ gridColumn: "3 / 4", gridRow: "1 / 2" }} /> {/* Espacio vacío */}
        {/* Fila media */}
        <IconButton
        onTouchStart={() => onMoveStart("ArrowLeft")}
        onTouchEnd={() => onMoveEnd("ArrowLeft")}
          sx={{
            gridColumn: "1 / 2",
            gridRow: "2 / 3",
            bgcolor: alpha("#000000", 0.6),
            color: "white",
            "&:hover": { bgcolor: alpha("#000000", 0.8) },
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <KeyboardArrowLeftIcon fontSize="large" />
        </IconButton>
        <Box
          sx={{
            gridColumn: "2 / 3",
            gridRow: "2 / 3",
            borderRadius: "50%",
            bgcolor: alpha("#333333", 0.4),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              bgcolor: alpha("#ffffff", 0.6),
            }}
          />
        </Box>
        <IconButton
        onTouchStart={() => onMoveStart("ArrowRight")}
        onTouchEnd={() => onMoveEnd("ArrowRight")}
          sx={{
            gridColumn: "3 / 4",
            gridRow: "2 / 3",
            bgcolor: alpha("#000000", 0.6),
            color: "white",
            "&:hover": { bgcolor: alpha("#000000", 0.8) },
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <KeyboardArrowRightIcon fontSize="large" />
        </IconButton>
        <Box sx={{ gridColumn: "1 / 2", gridRow: "3 / 4" }} /> 
        <IconButton
        onTouchStart={() => onMoveStart("ArrowDown")}
        onTouchEnd={() => onMoveEnd("ArrowDown")}
          sx={{
            gridColumn: "2 / 3",
            gridRow: "3 / 4",
            bgcolor: alpha("#000000", 0.6),
            color: "white",
            "&:hover": { bgcolor: alpha("#000000", 0.8) },
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          <KeyboardArrowDownIcon fontSize="large" />
        </IconButton>
        <Box sx={{ gridColumn: "3 / 4", gridRow: "3 / 4" }} /> 
      </Box>

      {/* Botón de acción (derecha) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <Fab
        onTouchStart={onActionStart}
        onTouchEnd={onActionEnd}
          color="primary"
          size="large"
          sx={{
            width: 70,
            height: 70,
            bgcolor: alpha("#1976d2", 0.8),
            "&:hover": { bgcolor: alpha("#1976d2", 0.9) },
            boxShadow: "0 0 15px rgba(25, 118, 210, 0.5)",
          }}
        >
          <SportsSoccerIcon sx={{ fontSize: 40 }} />
        </Fab>
      </Box>
    </Box>
  )
}
