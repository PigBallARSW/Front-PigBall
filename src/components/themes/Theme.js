import { ThemeProvider, createTheme } from "@mui/material/styles"
// Create a custom theme with blue and yellow colors
export const Theme = createTheme({
  palette: {
    primary: {
      main: "#adfbb9", 
      light: "#66bb6a",
      dark: "#1b5e20",
      more: "#388e3c",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffc107", // yellow
      light: "#fff350",
      dark: "#c79100",
      contrastText: "#000000",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#0A3D0A", // darker blue for navbar
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },
      },
    },
  },
})