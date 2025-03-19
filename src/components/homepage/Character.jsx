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
import { User } from "../../components/user/User"
import '../../styles/login.css';
import { motion } from "framer-motion";


export default function Character({name}) {

    return (
        <Grid item size={{
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
                animate={{ y: [0, -20, 0, -20, 0] }} // Hace dos saltos
                transition={{
                  duration: 1.5, // Duración total de los dos saltos
                  times: [0, 0.2, 0.4, 0.6, 1], // Controla el ritmo del movimiento
                  repeat: Infinity, // Repite la animación infinitamente
                  repeatDelay: 3, // Pausa de 3 segundos antes de repetir
                  ease: "easeInOut", // Hace que la animación sea más natural
                }}
              >
                <User width={120} height={120} name={name} move={false} border={"white"} />
              </motion.div>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
                  {name}
                </Typography>
                <Button variant="outlined" startIcon={<CheckroomIcon />} color="secondary">
                  Customize
                </Button>
              </CardContent>
            </Card>
        </Grid>
    )

}