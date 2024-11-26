import { RouterProvider } from 'react-router-dom'
import './App.css'
import Notification from './components/Notification'
import Router from './router/index.jsx'
import { ErrorModal } from './components/ErrorModal.jsx';


function App() {
    const router = Router();
    return(
        <>
            <ErrorModal/>
            <Notification />
            <RouterProvider router={router} />

        </>
    )
}

export default App
