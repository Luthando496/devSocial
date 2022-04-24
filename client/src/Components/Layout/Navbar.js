import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'



const Navbar = () => {
  const user = useSelector(state => state.user.user)
  return (
    <Fragment>
    <nav className="navbar bg-dark">
      <title>Welcome To The Developer Connector</title>
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>

        {!user ?(
          <ul>
          <li><Link to="/profiles">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li></ul>):( 
        <ul><li><Link to="/dashboard"><i className="fas fa-code"></i> Dashboard</Link></li>
        <li><Link to="/">Logout</Link></li></ul>)}
    </nav>
      
    </Fragment>
  )
}

export default Navbar