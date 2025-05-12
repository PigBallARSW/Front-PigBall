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
        bgcolor: alpha("#000000", 0.65),
        border: "2px solid rgba(255, 255, 255, 0.1)",
        backgroundColor: 'rgba(33, 33, 33, 0.9)',
        minWidth: showGraph ? 300 : 50,
        transition: 'min-width 0.3s ease'
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" >
        <Box>
          <Typography variant="h6" sx={{ fontFamily: 'monospace', color: 'white' }}>
            {fps} FPS
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#aaa' }}>
            Target: 60 FPS
          </Typography>
        </Box>
          <BarChartIcon  sx={{ color: "#2196f3" }}/>
      </Box>

      <Collapse in={showGraph}>
        {fpsHistory.length > 1 && (
          <Box sx={{ height: 150, mt: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fpsHistory}>
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
