import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Paper, Typography, IconButton, Box, Collapse } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import { alpha } from '@mui/material/styles';

export default function FPSCounter({ fps, fpsHistory, showGraph }) {
  return (
    <Paper
      elevation={3}
      sx={{
        border: "2px solid rgba(255, 255, 255, 0.1)",
        bgcolor: alpha("#254626", 0.95),
        width: 200,            
        px: 1.5,                          
        py: 1,                           
        transition: 'min-width 0.3s ease',
      }}
    >
      <Box display="flex" alignItems="start" justifyContent="space-between" flexDirection="column" sx={{ width: "100%" }}>
        <Box sx={{display:"flex", alignItems:"center", justifyContent:"space-between", width: "100%"}}>
          <Typography variant="body" sx={{ fontFamily: 'monospace', color: 'white' }}>
            {fps} FPS
          </Typography>
          <BarChartIcon sx={{ color: "#2196f3" }}/>
        </Box>
        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#aaa' }}>
          Target: 60 FPS
        </Typography>
      </Box>

      <Collapse in={showGraph} sx={{ width: "100%" }}>
        {fpsHistory.length > 1 && (
          <Box sx={{ 
            height: 100, 
            mt: 1,
            width: "100%", 
            px: 0, // Eliminar cualquier padding horizontal
            mx: 0, // Eliminar cualquier margen horizontal
            "& .recharts-wrapper": {
              // Asegurar que el contenedor de Recharts no tenga márgenes internos
              margin: "0 !important",
            },
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={fpsHistory}
                margin={{ top: 5, right: 0, left: -15, bottom: 5 }} // Ajuste para alinear con el texto superior
              >
                <XAxis dataKey="time" tick={{ fill: 'white', fontSize: 10 }} tickFormatter={() => ''} />
                <YAxis domain={[0, 70]} tick={{ fill: 'white', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#333' }} itemStyle={{ color: 'white' }} />
                <ReferenceLine y={60} stroke="#4caf50" strokeDasharray="3 3" label={{
                  value: "Target",
                  position: "insideTopRight",
                  fill: '#4caf50',
                  fontSize: 10
                }} />
                <Line type="monotone" dataKey="fps" stroke="#2196f3" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )}
      </Collapse>
    </Paper>
  );
}
