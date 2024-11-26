import { useDispatch, useSelector } from "react-redux";
import { showError } from "../store/errorReducer";

const useErrorHandler = () => {
    const dispatch = useDispatch();

    const showErrorHandler = (message) => {
        dispatch(showError({ message }));
    }

    return {showErrorHandler: showErrorHandler}

}

export default useErrorHandler