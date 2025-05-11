import { Skeleton } from "@mui/material"
import Grid from '@mui/material/Grid2';


export const LoadingPage = () => {
    return (
        <Grid container spacing={4}>
            <Grid size={{
                xs: 12,
                sm: 4
            }}>
                <Skeleton variant="rounded" height={500} />
            </Grid>   
            <Grid size={{
            xs: 12,
            sm: 8
          }}>
            <Skeleton variant="rounded" height={500} />
          </Grid>
        </Grid>
    )
}