import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
// Importa los componentes específicos que usas de Material UI
// Por ejemplo:
import { 
  Paper, 
  Typography, 
  IconButton, 
  Box, 
  Collapse 
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function FPSCounter() {
  const [fps, setFps] = useState(0);
  const [fpsHistory, setFpsHistory] = useState([]);
  const [showGraph, setShowGraph] = useState(true);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationRef = useRef();
  
  const MAX_DATA_POINTS = 30;

  const TARGET_FPS = 60;
  const FRAME_RATE = 60; 

  const calculateFps = () => {
    frameCount.current++;
    const now = performance.now();
    const delta = now - lastTime.current;
    
    if (delta >= 1000) {
      const currentFps = Math.round((frameCount.current * 1000) / delta);
      
      const efficiency = Math.min(100, Math.round((currentFps / TARGET_FPS) * 100));
      
      setFps(currentFps);
      
      // Update history for the graph
      setFpsHistory(prevHistory => {
        const timestamp = new Date().toLocaleTimeString('en-US', { 
          hour12: false,
          minute: '2-digit',
          second: '2-digit'
        });
        
        const newHistory = [
          ...prevHistory, 
          { 
            time: timestamp, 
            fps: currentFps,
            target: TARGET_FPS 
          }
        ];
        
        if (newHistory.length > MAX_DATA_POINTS) {
          return newHistory.slice(newHistory.length - MAX_DATA_POINTS);
        }
        return newHistory;
      });
      
      frameCount.current = 0;
      lastTime.current = now;
    }
    
    animationRef.current = requestAnimationFrame(calculateFps);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(calculateFps);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <Paper
      elevation={3}
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1300,
        backgroundColor: 'rgba(33, 33, 33, 0.9)',
        padding: 8,
        minWidth: showGraph ? 300 : 100,
        transition: 'min-width 0.3s ease'
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h6" style={{ fontFamily: 'monospace', color: 'white' }}>
            {fps} FPS
          </Typography>
          <Typography variant="caption" style={{ fontFamily: 'monospace', color: '#aaa' }}>
            Target: 60 FPS
          </Typography>
        </Box>
        <IconButton 
          size="small" 
          onClick={() => setShowGraph(!showGraph)}
          style={{ color: showGraph ? '#2196f3' : 'white' }}
        >
          <BarChartIcon />
        </IconButton>
      </Box>
      
      <Collapse in={showGraph}>
        {fpsHistory.length > 1 && (
          <Box style={{ height: 150, marginTop: 8 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fpsHistory}>
                <XAxis 
                  dataKey="time" 
                  tick={{fill: 'white', fontSize: 10}}
                  tickFormatter={() => ''}
                />
                <YAxis 
                  domain={[0, 70]} 
                  tick={{fill: 'white', fontSize: 10}}
                />
                <Tooltip 
                  contentStyle={{backgroundColor: '#333', border: 'none', color: 'white'}}
                  itemStyle={{color: 'white'}}
                  labelStyle={{color: 'white'}}
                />
                <ReferenceLine y={60} stroke="#4caf50" strokeDasharray="3 3" label={{ 
                  value: "Target", 
                  position: "insideTopRight",
                  fill: '#4caf50',
                  fontSize: 10
                }} />
                <Line 
                  type="monotone" 
                  dataKey="fps" 
                  stroke="#2196f3" 
                  strokeWidth={2} 
                  dot={false} 
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )}
      </Collapse>
    </Paper>
  );
}