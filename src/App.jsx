import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './router/index.jsx';

function App() {
  return (
    <>
      {/* <h1 className="text-center mt-4">API - 2024</h1> */}
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
