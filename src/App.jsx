import { RouterProvider } from 'react-router-dom'
import './App.css'
import Notification from './components/Notification'
import router from './router/index.jsx'

function App() {

  return (
    <>
      <Notification />
      <RouterProvider router={router} />
    </>
  )
}

export default App
