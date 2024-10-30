import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSession from '../hook/useSession';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { register } = useSession();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { email: '', password: '', confirmPassword: '' };

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
    } else if (password.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        valid = false;
    }

    if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
        valid = false;
    }

    setErrors(newErrors);

    if (valid) {
        setLoading(true);
        register(email, password).then((registerSuccess) => {
        setLoading(false);
        if (registerSuccess) {
            navigate('/');
        } else {
            setErrors({ ...errors, email: 'El correo ya está registrado' });
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
        background: 'linear-gradient(135deg, #4E94A8, #6E3B8B)',
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
            Registrarse
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
            Crea una cuenta ingresando tus datos
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
            <TextField
            label="Confirmar Contraseña"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
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
                    {loading ? 'Registrando...' : 'Registrarse'}
                </Button>
            </Box>
        </Box>
        </Box>
    </Box>
);
};