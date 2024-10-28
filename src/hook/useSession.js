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

    const login = async (email, password) => {
        try {
            const response = await apiLogin(email, password)
            console.log(response)
            if (!response.ok) {
                throw new Error('Login failed');
            }

            const { data } = response
            dispatch(loginSuccess({ jwtToken: data.jwtToken }));
            success = true
        } catch (error) {
            console.log(error)
            const { message } = error.response.data
            dispatch(cleanSession());
            showNotification(message)
        }

        return success
    }

    return { login };
};

export default useSession;