import { useState } from "react"
import { Box, TextField, Button, Typography, Divider } from "@mui/material"
import GoogleIcon from "@mui/icons-material/Google"
import { supabase } from "../lib/supabase"

export default function SignIn({ setMode, showSnack }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      const user = data.user

      // Only allow verified users
      if (!user.email_confirmed_at) {
        showSnack("Please verify your email before signing in.", "warning")
        setLoading(false)
        return
      }

      // Successful login → reload or redirect
      window.location.reload()

    } catch (err) {
      showSnack(err.message, "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Box mb={3}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 600, fontFamily: "raleway" }}
        >
          Welcome Back
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
        sx={{
          borderRadius: 3,
          py: 1.3,
          mb: 2.5,
          textTransform: "none",
          fontFamily: "raleway",
        }}
        onClick={async () => {
            try {
              const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                
              });
              if (error) throw error;
              // Supabase will redirect user to /confirm after Google login
            } catch (err) {
              setError(err.message);
            }
          }}
      >
        Continue with Google
      </Button>

      <Divider sx={{ my: 2.5 }}>or</Divider>

      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        fullWidth
        variant="contained"
        disabled={loading || !email || !password}
        onClick={handleSignIn}
        sx={{
          mt: 3,
          borderRadius: 3,
          py: 1.3,
          textTransform: "none",
          boxShadow: "0px 12px 24px rgba(0,0,0,0.2)",
          fontFamily: "raleway",
          opacity: loading || !email || !password ? 0.6 : 1,
        }}
      >
        {loading ? "Signing in..." : "Sign In"}
      </Button>

      <Typography align="center" mt={3} sx={{ fontFamily: "raleway" }}>
        New here?{" "}
        <Typography
          component="span"
          color="primary"
          sx={{ cursor: "pointer", fontWeight: 500 }}
          onClick={() => setMode("signup")}
        >
          Create an account
        </Typography>
      </Typography>
    </>
  )
}
