import { Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function ConfirmPage() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        px: 3,
      }}
    >
      <Typography variant="h3" sx={{ fontFamily: "raleway", mb: 2 }}>
        ✅ Email Confirmed!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, fontFamily: "raleway" }}>
        Thank you for confirming your email. You can now sign in to your account.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/")} // redirect to home/login page
        sx={{ borderRadius: 3, px: 4, py: 1.5 }}
      >
        Go to Login
      </Button>
    </Box>
  )
}
