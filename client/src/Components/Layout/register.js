import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import {register} from '../../Store/Actions/userActions'


const Register=()=>{
  const [email,setEmail] =useState('')
  const [name,setName] =useState('')
  const [password,setPassword]=useState('')
  const [passConfirm,setConfirm]=useState('')
  const dispatch = useDispatch()

  const Submit =(e)=>{
    e.preventDefault()
    
    if(password !== passConfirm){
    return alert(`password ${password} is not equal to ${passConfirm}`)
  }
  alert(`${name} is ${email} and password ${password}`)
  const user = {name,email,password}
  dispatch(register(user))
}


const auth = useSelector(state => state.user.isAuth)
let navigate = useNavigate()

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
          <input type="text" placeholder="Name" name="name" value={name} required onChange={e => setName(e.target.value)}  />
        </div>
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
        <div className="form-group">
          <input
          value={passConfirm}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            onChange={e => setConfirm(e.target.value)} 
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
);
}

export default Register
    