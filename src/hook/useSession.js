import { useDispatch } from 'react-redux';
import { login as apiLogin, register as apiRegister } from '../api/session';
import { cleanSession, loginSuccess } from '../store/sessionReducer';
import useNotification from './useNotification';

const useSession = () => {
    let success = false

    const dispatch = useDispatch();
    const { showNotification } = useNotification()

    const register = async (email, password, usuario, fecha_nacimiento, nombre, apellido) => {
        try {
            const response = await apiRegister(email, password, usuario, fecha_nacimiento, nombre, apellido)
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
            console.log(data)
            dispatch(loginSuccess({ jwtToken: data.jwtToken, admin: data.admin ?? false }));
            success = true
        } catch (error) {
            const { message } = error.response.data
            dispatch(cleanSession());
            showNotification(message)
        }

        return success
    }

    const getToken = () => {
        const { jwt } = useSelector((state) => state.session)
        return jwt
    }

    return { login, register, getToken };
};

export default useSession;