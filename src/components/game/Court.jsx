import React from 'react';
import { Box, Grid, Typography, Button } from "@mui/material";
import '../../styles/login.css';
export const Court = () => {
    return(
        <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "absolute",
          width: "100vw",
          height: "100vh",
          overflow: "hidden", 
          boxSizing: "border-box",
          zIndex: 1
        }}
        className="field"
      >
        {/* Cancha */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            border: "4px solid white",
            display: "flex",
            boxSizing: "border-box",
          }}
        >
          {/* Lado izquierdo */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              borderRight: "2px solid white",
            }}
          >
            <Box
              sx={{
                width: { xs: "100px", md: "250px" },
                height: { xs: "300px", md: "450px" },
                border: "4px solid white",
                position: "relative",
                borderLeft: "0px",
              }}
            >
              <Box
                sx={{
                  width: { xs: "50px", md: "125px" },
                  height: { xs: "150px", md: "225px" },
                  border: "4px solid white",
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: 0,
                  borderLeft: "0px",
                }}
              />
            </Box>
          </Box>
      
          {/* Lado derecho */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              borderLeft: "2px solid white",
            }}
          >
            <Box
              sx={{
                width: { xs: "100px", md: "250px" },
                height: { xs: "300px", md: "450px" },
                border: "4px solid white",
                position: "relative",
                borderRight: "0px",
              }}
            >
              <Box
                sx={{
                  width: { xs: "50px", md: "125px" },
                  height: { xs: "150px", md: "225px" },
                  border: "4px solid white",
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: 0,
                  borderRight: "0px",
                }}
              />
            </Box>
          </Box>
        </Box>
      
        {/* Círculo central */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "150px", md: "300px" },
            height: { xs: "150px", md: "300px" },
            borderRadius: "50%",
            border: "4px solid white",
            zIndex: 1,
          }}
        />
      </Box>
      
    );
}