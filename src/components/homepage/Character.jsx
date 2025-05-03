"use client"
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Box,
} from "@mui/material"
import Grid from '@mui/material/Grid2';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { motion } from "framer-motion";
import { CustomizerUser } from "../user/CustomizerUser";


export default function Character({player, customPlayer}) {
    return (
        <Grid size={{
            xs: 12,
            sm: 4
          }}>
            <Card sx={{ bgcolor: "primary.dark", color: "white", height: "100%", border:"1px solid white" }}>
              <CardHeader
                title="Your character"
                slotProps={{ align: "center", variant: "h5" }}
                sx={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
              />
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 3 }}>
                <Box sx={{ position: "relative", mb: 3 }}>
                <motion.div
                animate={{ y: [0, -20, 0, -20, 0] }} 
                transition={{
                  duration: 1.5, 
                  times: [0, 0.2, 0.4, 0.6, 1], 
                  repeat: Infinity, 
                  repeatDelay: 3, 
                  ease: "easeInOut", 
                }}
              >
                <CustomizerUser width={120} height={120} playerName={player.username} playerColor={player.centerColor} borderColor={player.borderColor} iconType={player.iconType} iconColor={player.iconColor} icon={player.image}/>
                
              </motion.div>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
                  {player.username}
                </Typography>
                <Button variant="outlined" startIcon={<CheckroomIcon />} color="secondary" onClick={customPlayer}>
                  Customize
                </Button>
              </CardContent>
            </Card>
        </Grid>
    )

}