import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../api/session';
import { cleanSession, loginSuccess } from '../store/sessionReducer';
import useNotification from './useNotification';

const useSession = () => {
    let success = false

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showNotification } = useNotification()

    const register = async (email, password) => {
        try {
            // TODO
            // TENGO QUE ARREGLAR ESTO - MATI
            const response = await fetch('http://localhost:5173/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                showNotification('Registro exitoso', 'success'); // Notificación de éxito
                return true;
            } else if (response.status === 409) {
                showNotification('El correo ya está registrado', 'error'); // Notificación de error
                // Manejo si ya existe el usuario
                return false;
            } else {
                showNotification('Error en el registro', 'error'); // Notificación de error genérico
                return false;
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            showNotification('Error al registrar usuario', 'error'); // Notificación de error en caso de fallo de red
            return false;
        }
    };


    const login = async (email, password) => {
        try {
            const response = await apiLogin(email, password)
            if (!response.ok) {
                throw new Error('Login failed');
            }

            const { data } = response
            dispatch(loginSuccess({ jwtToken: data.jwtToken }));
            localStorage.setItem("JWT", data.jwtToken)
            success = true
        } catch (error) {
            console.log(error)
            const { message } = error.response.data
            dispatch(cleanSession());
            showNotification(message)
        }

        return success
    }

    return { login, register };
};

export default useSession;