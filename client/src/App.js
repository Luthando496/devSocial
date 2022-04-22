import {React,Fragment,useEffect} from 'react'
import './App.css';
import Navbar from './Components/Layout/Navbar';
import Landing from './Components/Layout/Landing';
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import Register from './Components/Layout/register';
import Login from './Components/Layout/Login';
import {useDispatch} from 'react-redux'
import {loadUser} from './Store/Actions/userActions'



const App=()=> {
  
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(loadUser())
    
  },[dispatch])
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
