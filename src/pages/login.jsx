import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSession from '../hook/useSession'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })

  const navigate = useNavigate()
  const { login } = useSession()

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let valid = true
    let newErrors = { email: '', password: '' }

    if (!email) {
      newErrors.email = 'El email no puede estar vacío'
      valid = false
    } else if (!validateEmail(email)) {
      newErrors.email = 'El email no tiene un formato válido'
      valid = false
    }

    if (!password) {
      newErrors.password = 'La contraseña no puede estar vacía'
      valid = false
    }

    setErrors(newErrors)

    if (valid) {
      login(email, password).then((loginSuccessFull) => {
        console.log(loginSuccessFull)
        if (loginSuccessFull) {
          navigate('/')
        }
      })
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '300px' }}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Iniciar sesión
        </Button>
      </Box>
    </Box>
  )
}
