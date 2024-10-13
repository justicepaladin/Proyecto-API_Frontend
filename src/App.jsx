import './App.css';
import Navigation from './Navigation/Nav';
import Products from './Products/Products';
import Recommended from './Recommended/Recommended';

function App() {
  return (
    <>
      {/* <h1 className="text-center mt-4">API - 2024</h1> */}
      <Navigation />
      <Products />
      <Recommended />
    </>
  );
}

export default App;
