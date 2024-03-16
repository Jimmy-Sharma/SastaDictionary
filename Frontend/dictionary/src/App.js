import './App.css';
import History from './Components/History';
import Login from './Components/Login';
import NavBar from './Components/Navbar';
import SignUp from './Components/SignUp';
import AllRoutes from './Routes/AllRoutes'
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <div className="App">
      <AllRoutes/>
      <Toaster/>
    </div>
  );
}

export default App;
