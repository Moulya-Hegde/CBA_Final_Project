import { useState } from "react"
import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
  Slide,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

import SignIn from "./SignIn"
import SignUp from "./SignUp"

// Smooth transition for the dialog appearing from the bottom
const Transition = (props) => <Slide direction="up" {...props} />

export default function AuthDialog({ open, onClose }) {
  const [mode, setMode] = useState("signin")
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "error",
  })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // Helper to trigger notifications from child components (SignIn/SignUp)
  const showSnack = (message, severity = "error") => {
    setSnack({ open: true, message, severity })
  }

  const handleCloseSnack = () => {
    setSnack((prev) => ({ ...prev, open: false }))
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 4,
            width: isMobile ? "95%" : 880,
            maxWidth: "95%",
            boxShadow: "0px 24px 70px rgba(0,0,0,0.35)",
            overflow: "hidden" // Ensures image border radius matches paper
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            height={isMobile ? "auto" : 540}
          >
            {/* Left Side: Decorative Image */}
            <Box
              sx={{
                width: isMobile ? "100%" : "45%",
                height: isMobile ? 200 : "100%",
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1581859814481-bfd944e3122f')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Right Side: Auth Forms */}
            <Box
              sx={{
                width: isMobile ? "100%" : "55%",
                px: isMobile ? 3 : 5,
                py: isMobile ? 3 : 4,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {/* Close Modal Button */}
              <IconButton
                onClick={onClose}
                sx={{ position: "absolute", top: 16, right: 16 }}
              >
                <CloseIcon />
              </IconButton>

              {/* Back to SignIn Button (only visible in SignUp mode) */}
              {mode === "signup" && (
                <IconButton
                  onClick={() => setMode("signin")}
                  sx={{ position: "absolute", top: 16, left: 16 }}
                >
                  <ArrowBackIcon />
                </IconButton>
              )}

              {/* Conditional Rendering of Forms */}
              {mode === "signin" ? (
                <SignIn 
                  setMode={setMode} 
                  showSnack={showSnack} 
                  onClose={onClose} 
                />
              ) : (
                <SignUp 
                  setMode={setMode} 
                  showSnack={showSnack} 
                />
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Global Snackbar for Auth Feedback */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snack.severity}
          onClose={handleCloseSnack}
          sx={{ width: "100%", fontFamily: "Raleway, sans-serif" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  )
}