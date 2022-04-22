import {React,Fragment} from 'react'
import './App.css';
import Navbar from './Components/Layout/Navbar';
import Landing from './Components/Layout/Landing';
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import Register from './Components/Layout/register';
import Login from './Components/Layout/Login';

const App=()=> {
  return (
    <BrowserRouter>
    <Fragment>
     <Navbar />
     <Routes>
     <Route exact path='/' element={<Landing/>} />
     <Route exact path='/register' element={<Register/>} />
     <Route exact path='/login' element={<Login/>} />
     </Routes>
    </Fragment>
    </BrowserRouter>
  );
}

export default App;
