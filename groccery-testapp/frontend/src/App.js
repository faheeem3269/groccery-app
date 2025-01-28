import logo from './logo.svg';
import './App.css';
import GrocceryShopping from './Components/GrocceryShopping';
import { Link } from 'react-router-dom';



function App() {
 
  return (
    <div className="App">
      <div className='bg-green-100 w-screen h-screen'>
        <header className="bg-white w-full h-16 justify-center  p-2 border border-solid">
          <div className="flex flex-row justify-between ml-40">
            {/* Image and Heading */}
            <div className="flex items-center space-x-2">
              <img src="" alt="" className="w-8 h-8" />
              <h1 className="text-lg font-bold">Grocery Store</h1>
            </div>

            {/* Sign In and Login Buttons */}
            <div className="flex space-x-4 mt-2 mr-40">
              <Link className="px-4 py-2 bg-blue-500 text-white rounded" to={'/signup'}>Sign In</Link>
              <Link className="px-4 py-2 bg-emerald-600 text-white rounded" to={'/login'}>Log In</Link>
            </div>
          </div>
        </header>
        <GrocceryShopping />
      </div>
      
   </div>
  );
}

export default App;
