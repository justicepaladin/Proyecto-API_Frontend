import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSession from '../hook/useSession';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usuario, setUsuario] = useState('');
    const [fecha_nacimiento, setFecha_Nacimiento] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ nombre: '', apellido: '', usuario: '', fecha_nacimiento: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { register } = useSession();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;
        let newErrors = { nombre: '', apellido: '', usuario: '', fecha_nacimiento: '', email: '', password: '', confirmPassword: ''};

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

        if (!usuario) {
            newErrors.usuario = 'El usuario no puede estar vacío';
            valid = false;
        }

        if (!fecha_nacimiento) {
            newErrors.fecha_nacimiento = 'La fecha de nacimiento no puede estar vacía';
            valid = false;
        }

        if (!nombre) {
            newErrors.nombre = 'El nombre no puede estar vacío';
            valid = false;
        }

        if (!apellido) {
            newErrors.apellido = 'El apellido no puede estar vacío';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            setLoading(true);
            register(email, password, usuario, fecha_nacimiento, nombre, apellido).then((registerSuccess) => {
                setLoading(false);
                if (registerSuccess) {
                    navigate('/login');
                } else {
                    setErrors({ ...errors, email: 'El correo ya está registrado' });
                }
            });
        }
    };

const toggleShowPassword = () => setShowPassword((prev) => !prev);

return (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{
        background: 'url("https://img.freepik.com/foto-gratis/primer-plano-zapatillas-futuristas_23-2151005732.jpg?t=st=1730597794~exp=1730601394~hmac=ff96431b05cb24fc41497d6931ec96e3d53cf664fb5fbafff16e12fcf9d488d1&w=740")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        padding: 3,
        margin: 0,
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
                label="Nombre"
                fullWidth
                margin="normal"
                variant="outlined"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                error={!!errors.nombre}
                helperText={errors.nombre}
            />
            <TextField
                label="Apellido"
                fullWidth
                margin="normal"
                variant="outlined"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                error={!!errors.apellido}
                helperText={errors.appelido}
            />
            <TextField
                label="Fecha Nacimiento"
                fullWidth
                margin="normal"
                variant="outlined"
                value={fecha_nacimiento}
                onChange={(e) => setFecha_Nacimiento(e.target.value)}
                error={!!errors.fecha_nacimiento}
                helperText={errors.fecha_nacimiento}
            />
            <TextField
                label="Usuario"
                fullWidth
                margin="normal"
                variant="outlined"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                error={!!errors.usuario}
                helperText={errors.usuario}
            />
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
                type={showPassword ? 'text' : 'password'}
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
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
            />
            </Box>
            
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
                    endIcon={loading && <CircularProgress size={24} color="inherit" /*onClick={() => } */ />}
                >
                    {loading ? 'Registrando...' : 'Registrarse'}
                </Button>
            </Box>
        </Box>
            <Box sx={{ mt: 2}}>
                    <Button color="secondary" onClick={() => navigate('/login')}>
                        ¿Ya está registrado? Inicie Sesión
                    </Button>
            </Box>
        </Box>
);
};