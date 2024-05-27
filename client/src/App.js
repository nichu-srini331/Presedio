import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Dash from './Dash';
import Login from './Login';
import Register from './Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Sell from './Sell';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Dash/></ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/Reg' element={<Register/>}/>
          <Route path='/sell' element={<Sell/>}/>
        </Routes>
      </Router>
      </AuthProvider>
      
    </div>
  );
}

export default App;
