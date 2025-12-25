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

  // Password validation logic
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

  const handleSignUp = async (e) => {
    // Prevent default form submission behavior (page refresh)
    if (e) e.preventDefault();

    if (!isFormValid) {
      showSnack("Please satisfy all password requirements", "warning")
      return
    }

    try {
      setLoading(true)

      // 1. Create the Auth User
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/confirm`,
          data: { username }
        },
      })

      if (authError) throw authError

      // 2. Manually insert the profile into your public.profiles table
      // This happens immediately so you have a record even before they confirm email
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: data.user.id, 
              username: username, 
              email: email,
              is_admin: false 
            }
          ])

        if (profileError) {
          console.error("Profile sync error:", profileError.message)
          // We don't throw here so the user still sees the "Check Email" screen
        }
      }

      setSuccess(true)
      showSnack("Verification email sent! Please check your inbox.", "success")

    } catch (err) {
      showSnack(err.message, "error")
    } finally {
      setLoading(false)
    }
  }

  // Success State View
  if (success) {
    return (
      <Box textAlign="center" py={5}>
        <Typography variant="h5" sx={{ fontFamily: "raleway", mb: 2, fontWeight: 700 }}>
          ✅ Account Created!
        </Typography>
        <Typography variant="body1" sx={{ fontFamily: "raleway", mb: 4, color: 'text.secondary' }}>
          We've sent a link to <strong>{email}</strong>. <br/>
          Please verify your email to activate your account.
        </Typography>
        <Button
          variant="contained"
          onClick={() => setMode("signin")}
          sx={{ 
            fontFamily: "raleway", 
            borderRadius: 3, 
            px: 4, 
            py: 1.5, 
            textTransform: 'none' 
          }}
        >
          Back to Sign In
        </Button>
      </Box>
    )
  }

  // Default Signup Form
  return (
    <form onSubmit={handleSignUp}>
      <Box mb={2}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 600, fontFamily: "raleway" }}>
          Create Account
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" mt={1} sx={{ fontFamily: "raleway" }}>
          Join us in a few simple steps
        </Typography>
      </Box>

      <TextField 
        fullWidth 
        label="Username" 
        margin="dense" 
        value={username} 
        onChange={e => setUsername(e.target.value)} 
        required
      />
      
      <TextField 
        fullWidth 
        label="Email" 
        margin="dense" 
        type="email"
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        required
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        margin="dense"
        value={password}
        onChange={e => setPassword(e.target.value)}
        helperText={password.length > 0 && !isPasswordValid ? "Must include: Uppercase, Lowercase, Number, Symbol" : "Min 8 characters"}
        error={password.length > 0 && !isPasswordValid}
        required
      />

      <TextField
        fullWidth
        label="Confirm Password"
        type="password"
        margin="dense"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        error={confirmPassword.length > 0 && !passwordsMatch}
        helperText={confirmPassword.length > 0 && !passwordsMatch ? "Passwords do not match" : " "}
        required
      />

      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={loading || !isFormValid}
        sx={{
          mt: 2,
          borderRadius: 3,
          py: 1.5,
          textTransform: "none",
          boxShadow: "0px 12px 24px rgba(0,0,0,0.2)",
          fontFamily: "raleway",
          fontSize: '1rem'
        }}
      >
        {loading ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  )
}