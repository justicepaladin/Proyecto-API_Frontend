import { RouterProvider } from 'react-router-dom'
import './App.css'
import Notification from './components/Notification'
import Router from './router/index.jsx'


function App() {
    const router = Router();
    return(
        <>
            <Notification />
            <RouterProvider router={router} />

        </>
    )
}

export default App
