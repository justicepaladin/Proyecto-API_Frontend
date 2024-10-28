import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanNotification, showNotification } from "../store/notificationReducer";

const useNotification = () => {
    const dispatch = useDispatch();
    const { show } = useSelector((state) => state.notification)
    const [timer, setTimer] = useState(null)

    const showNotificationHandler = (message, type = 'error') => {
        console.log(message)
        dispatch(showNotification({ message, type }));

        const timer = setTimeout(() => {
            dispatch(cleanNotification());
        }, 6000);

        setTimer(timer)
    }

    useEffect(() => {
        if (!show) {
            clearTimeout(timer)
        }
    }, [show])

    const cleanNotificationHandler = () => {
        dispatch(cleanNotification())
    }

    return { showNotification: showNotificationHandler, cleanNotification: cleanNotificationHandler };
};

export default useNotification