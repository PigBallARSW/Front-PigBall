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
                  <User width={120} height={120} name={name} move={false} border={"white"}/>
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