import {React,Fragment,useEffect} from 'react'
import './App.css';
import Navbar from './Components/Layout/Navbar';
import Landing from './Components/Layout/Landing';
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import Register from './Components/Layout/register';
import Login from './Components/Layout/Login';
import {useDispatch} from 'react-redux'
import {loadUser} from './Store/Actions/userActions'
import Dashboard from './Components/Layout/Dashboard';
import CreateProfile from './Components/Layout/CreateProfile';
import Experience from './Components/Layout/Experience';
import Footer from './Components/Layout/Footer';



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
     <Route exact path='/dashboard' element={<Dashboard/>} />
     <Route exact path='/profile/create-profile' element={<CreateProfile/>} />
     <Route exact path='/profile/create-exp' element={<Experience/>} />
     </Routes>
     <Footer />
    </Fragment>
    </BrowserRouter>
  );
}

export default App;
