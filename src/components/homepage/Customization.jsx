 {/* Panel de vista previa */}
 <Paper
 elevation={8}
 component={motion.div}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5 }}
 sx={{
   width: { xs: "100%", md: "40%" },
   borderRadius: 3,
   overflow: "hidden",
   bgcolor: "#1E1E1E",
   border: "1px solid rgba(255, 255, 255, 0.1)",
   display: "flex",
   flexDirection: "column",
 }}
>
 <Box
   sx={{
     p: 2,
     bgcolor: "#2D2D2D",
     borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
   }}
 >
   <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
     Vista Previa
   </Typography>
 </Box>

 <Box
   sx={{
     flex: 1,
     display: "flex",
     flexDirection: "column",
     alignItems: "center",
     justifyContent: "center",
     p: 4,
     position: "relative",
     overflow: "hidden",
   }}
 >
   {/* Fondo de campo de fútbol para la vista previa */}
   <Box
     sx={{
       position: "absolute",
       top: 0,
       left: 0,
       width: "100%",
       height: "100%",
       bgcolor: "#2d6a31",
       backgroundImage:
         "repeating-linear-gradient(0deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1) 50px, transparent 50px, transparent 100px)",
       zIndex: 0,
     }}
   />

   {/* Líneas del campo */}
   <Box
     sx={{
       position: "absolute",
       top: "50%",
       left: 0,
       width: "100%",
       height: "2px",
       bgcolor: "rgba(255,255,255,0.5)",
       zIndex: 1,
     }}
   />
   <Box
     sx={{
       position: "absolute",
       top: "50%",
       left: "50%",
       width: "100px",
       height: "100px",
       borderRadius: "50%",
       border: "2px solid rgba(255,255,255,0.5)",
       transform: "translate(-50%, -50%)",
       zIndex: 1,
     }}
   />

   {/* Vista previa del jugador */}
   <Box
     component={motion.div}
     animate={{
       scale: [1, 1.05, 1],
       y: customization.effect === "bounce" ? [0, -10, 0] : 0,
     }}
     transition={{
       duration: 2,
       repeat: Number.POSITIVE_INFINITY,
       repeatType: "loop",
     }}
     sx={{
       zIndex: 2,
       position: "relative",
       ...getPlayerStyles(),
     }}
   >
     {renderCenterContent()}
   </Box>

   {/* Texto informativo */}
   <Typography
     variant="body2"
     sx={{
       color: "white",
       mt: 4,
       textAlign: "center",
       zIndex: 2,
       position: "relative",
     }}
   >
     Así se verá tu jugador en el campo
   </Typography>
 </Box>

 {/* Información de personalización actual */}
 <Box
   sx={{
     p: 2,
     bgcolor: "#2D2D2D",
     borderTop: "1px solid rgba(255, 255, 255, 0.1)",
   }}
 >
   <Typography variant="subtitle2" sx={{ color: "rgba(255,255,255,0.7)", mb: 1 }}>
     Personalización Actual
   </Typography>
   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
     <Chip
       size="small"
       label={`Color: ${customization.mainColor}`}
       sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white" }}
     />
     <Chip
       size="small"
       label={`Borde: ${customization.borderWidth}px`}
       sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white" }}
     />
     <Chip
       size="small"
       label={`Efecto: ${effectOptions.find((opt) => opt.value === customization.effect)?.label || "Ninguno"}`}
       sx={{ bgcolor: "rgba(255,255,255,0.1)", color: "white" }}
     />
   </Box>
 </Box>
</Paper>