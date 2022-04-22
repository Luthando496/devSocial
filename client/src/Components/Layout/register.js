import React,{useState} from 'react'
import { Link } from 'react-router-dom';



const Register=()=>{
  const [email,setEmail] =useState('')
  const [name,setName] =useState('')
  const [password,setPassword]=useState('')
  

  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" >
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" required onChange={e => setName(e.target.value)}  />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" onChange={e => setEmail(e.target.value)}  />
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
            minLength="6"
            onChange={e => setPassword(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
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
    