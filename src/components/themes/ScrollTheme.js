export const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "10px",
      height: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgb(109, 110, 109)",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "rgba(90, 90, 90, 0.8)",
      borderRadius: "5px",
      border: "2px solid rgba(30, 30, 30, 0.8)",
      "&:hover": {
        background: "rgba(120, 120, 120, 0.8)",
      },
    },
    // Estilos para Firefox
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(90, 90, 90, 0.8) rgba(30, 30, 30, 0.8)",
  }