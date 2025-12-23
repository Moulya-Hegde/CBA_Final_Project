import { useState } from "react"
import { Box, TextField, Button, Typography } from "@mui/material"
import { supabase } from "../lib/supabase"

export default function SignUp({ setMode, showSnack }) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const passwordChecks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  }

  const isPasswordValid = Object.values(passwordChecks).every(Boolean)
  const passwordsMatch = password === confirmPassword
  const isFormValid =
    username.trim() && email.includes("@") && isPasswordValid && passwordsMatch

  const handleSignUp = async () => {
    if (!isFormValid) {
      showSnack("Please fix the errors before continuing", "warning")
      return
    }

    try {
      setLoading(true)

      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/confirm`,
          data: { username }
        },
      })

      if (authError) throw authError

      // ✅ Success: show verification notice
      setSuccess(true)
      showSnack("Verification email sent! Please check your inbox.", "success")

    } catch (err) {
      showSnack(err.message, "error")
    } finally {
      setLoading(false)
    }
  }

  // ✅ Success page after signup
  if (success) {
    return (
      <Box textAlign="center" py={5}>
        <Typography variant="h5" sx={{ fontFamily: "raleway", mb: 2 }}>
          ✅ Account Created!
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: "raleway", mb: 4 }}>
          Please check your email and click the verification link to activate your account.
        </Typography>
        <Button
          variant="contained"
          onClick={() => setMode("signin")}
          sx={{ fontFamily: "raleway", borderRadius: 3, px: 4, py: 1.5 }}
        >
          Back to Sign In
        </Button>
      </Box>
    )
  }

  // ✅ Default signup form
  return (
    <>
      <Box mb={3}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 600, fontFamily: "raleway" }}>
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" mt={1} sx={{ fontFamily: "raleway" }}>
          Join us in a few simple steps
        </Typography>
      </Box>

      <TextField fullWidth label="Username" margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
      <TextField fullWidth label="Email" margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="normal"
        value={password}
        onChange={e => setPassword(e.target.value)}
        helperText="Min 8 chars • Uppercase • Lowercase • Number • Symbol"
        error={password.length > 0 && !isPasswordValid}
      />
      <TextField
        fullWidth
        label="Confirm Password"
        type="password"
        margin="normal"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        error={confirmPassword.length > 0 && !passwordsMatch}
        helperText={confirmPassword.length > 0 && !passwordsMatch ? "Passwords do not match" : " "}
      />

      <Button
        fullWidth
        variant="contained"
        disabled={loading || !isFormValid}
        onClick={handleSignUp}
        sx={{
          mt: 1,
          borderRadius: 3,
          py: 1.3,
          textTransform: "none",
          boxShadow: "0px 12px 24px rgba(0,0,0,0.2)",
          fontFamily: "raleway",
          opacity: loading || !isFormValid ? 0.6 : 1,
        }}
      >
        {loading ? "Creating account..." : "Sign Up"}
      </Button>
    </>
  )
}
