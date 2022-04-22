import React,{useEffect, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import {loginUser} from '../../Store/Actions/userActions'


const Login = () => {
  const [email,setEmail] =useState('')
  const [password,setPassword]=useState('')
  const dispatch = useDispatch()
  const auth = useSelector(state => state.user.isAuth)
  let navigate = useNavigate()

  const Submit =(e)=>{
    e.preventDefault()
    
  alert(` is ${email} and password ${password}`)
  const user = {email,password}
  dispatch(loginUser(user))
}

useEffect(()=>{
  
  if(auth){
    navigate('/dashboard')
  }
  
},[auth])



  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={Submit}>
       
        <div className="form-group">
          <input type="email" placeholder="Email Address" value={email} name="email" onChange={e => setEmail(e.target.value)}  />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            minLength="6"
            onChange={e => setPassword(e.target.value)} 
            />
        </div>
        
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  )
}

export default Login