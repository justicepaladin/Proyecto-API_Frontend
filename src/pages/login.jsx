import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSession from '../hook/useSession';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useSession();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'El email no puede estar vacío';
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'El email no tiene un formato válido';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'La contraseña no puede estar vacía';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setLoading(true);  // Muestra el indicador de carga
      login(email, password).then((loginSuccessFull) => {
        setLoading(false);  // Oculta el indicador de carga
        if (loginSuccessFull) {
          navigate('/');
        } else {
          setErrors({ ...errors, password: 'Credenciales incorrectas' });
        }
      });
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        background: 'linear-gradient(135deg, #6E3B8B, #3B8B6E)',
        padding: 3,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          bgcolor: 'white',
          borderRadius: 3,
          p: 4,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
          Bienvenido de nuevo, por favor ingresa tus credenciales
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
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
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                fontSize: '1rem',
                textTransform: 'none',
                borderRadius: 2,
              }}
              disabled={loading}
              endIcon={loading && <CircularProgress size={24} color="inherit" />}
            >
              {loading ? 'Cargando...' : 'Iniciar sesión'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
