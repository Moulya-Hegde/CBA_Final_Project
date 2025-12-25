import { useState } from "react"
import { Box, TextField, Button, Typography, Divider } from "@mui/material"
import GoogleIcon from "@mui/icons-material/Google"
import { supabase } from "../lib/supabase"

export default function SignIn({ setMode, showSnack, onClose }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignIn = async (e) => {
    // Prevent page reload on form submit
    if (e) e.preventDefault();
    
    setLoading(true)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      const user = data.user

      // ✅ Requirement: Only allow verified users to enter the app
      if (!user.email_confirmed_at) {
        showSnack("Please verify your email before signing in.", "warning")
        setLoading(false)
        return
      }

      // ✅ Success: Notify and close the dialog
      showSnack("Welcome back!", "success")
      
      // Give the snackbar a moment to be seen before closing, or close immediately
      if (onClose) onClose();

    } catch (err) {
      showSnack(err.message, "error")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err) {
      showSnack(err.message, "error");
    }
  }

  return (
    <form onSubmit={handleSignIn}>
      <Box mb={3}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 600, fontFamily: "raleway" }}
        >
          Welcome
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          mt={1}
          sx={{ fontFamily: "raleway" }}
        >
          Sign in to continue
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
        sx={{
          borderRadius: 3,
          py: 1.3,
          mb: 2.5,
          textTransform: "none",
          fontFamily: "raleway",
          borderColor: "#ddd",
          color: "#555"
        }}
      >
        Continue with Google
      </Button>

      <Divider sx={{ my: 2.5, color: 'text.disabled', fontSize: '0.8rem' }}>OR</Divider>

      <TextField
        fullWidth
        label="Email"
        margin="normal"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={loading || !email || !password}
        sx={{
          mt: 3,
          borderRadius: 3,
          py: 1.5,
          textTransform: "none",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
          fontFamily: "raleway",
          fontSize: '1rem'
        }}
      >
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <Typography align="center" mt={3} sx={{ fontFamily: "raleway", fontSize: '0.9rem' }}>
        New here?{" "}
        <Typography
          component="span"
          color="primary"
          sx={{ 
            cursor: "pointer", 
            fontWeight: 600,
            "&:hover": { textDecoration: 'underline' }
          }}
          onClick={() => setMode("signup")}
        >
          Create an account
        </Typography>
      </Typography>
    </form>
  )
}