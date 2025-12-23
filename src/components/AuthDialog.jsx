import { useState } from "react"
import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
  Slide,
  Snackbar,
  Alert,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

import SignIn from "./SignIn"
import SignUp from "./SignUp"

const Transition = (props) => <Slide direction="up" {...props} />

export default function AuthDialog({ open, onClose }) {
  const [mode, setMode] = useState("signin")
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "error",
  })

  const showSnack = (message, severity = "error") => {
    setSnack({ open: true, message, severity })
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: 4,
            width: 880,
            maxWidth: "92%",
            boxShadow: "0px 24px 70px rgba(0,0,0,0.35)",
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <Box display="flex" height="540px">
            <Box
              sx={{
                width: "45%",
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1581859814481-bfd944e3122f')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "16px 0 0 16px",
              }}
            />

            <Box
              sx={{
                width: "55%",
                px: 5,
                py: 4,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <IconButton
                onClick={onClose}
                sx={{ position: "absolute", top: 16, right: 16 }}
              >
                <CloseIcon />
              </IconButton>

              {mode === "signup" && (
                <IconButton
                  onClick={() => setMode("signin")}
                  sx={{ position: "absolute", top: 16, left: 16 }}
                >
                  <ArrowBackIcon />
                </IconButton>
              )}

              {mode === "signin" ? (
                <SignIn setMode={setMode} showSnack={showSnack} />
              ) : (
                <SignUp setMode={setMode} showSnack={showSnack} />
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Snackbar for error/success messages */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snack.severity}
          sx={{ width: "100%", fontFamily: "raleway" }}
          onClose={() => setSnack({ ...snack, open: false })}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  )
}
