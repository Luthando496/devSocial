import React,{useEffect,Fragment} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getProfiles} from '../../Store/Actions/userActions'
import {Link} from 'react-router-dom'
import Spinner from './Spinner'
import image from './kindpng_214439.png'


const Profiles = () => {
  
  const profiles = useSelector(state => state.profile.profiles)
  const loading = useSelector(state => state.profile.loading)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getProfiles())
  },[dispatch])
  
  return (
    <section className="container">
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
      </p>
      {loading ? <Spinner /> :(
      <div className="profiles">
        {profiles && profiles.length > 0 ? (
          profiles.map(prof => (
              <Fragment>
              
          <div className="profile bg-light" key={prof._id}>
            <img
              className="round-img"
              src={image}
              alt={'user'}
            />
            <div>
              <h2>{prof.name}</h2>
              <p>{prof.status} at {prof.company &&<span>{prof.company}</span> }</p>
              <p>{prof.location}</p>
              <Link to={`/user/profile/${prof.user.id}`} className="btn btn-primary">View Profile</Link>
            </div>
  
            <ul >
              {prof.skills.slice(0,4).map((sk,index) =>(
              <li className="text-primary" key={index}>
                <i className="fas fa-check" key={index}></i> {sk}
              </li>
            ))}
            </ul>
                
          </div>
  

          </Fragment>
          
          )
            )):<h4>No Profiles Found</h4>}
          </div>)}
    </section>
  )
}



export default Profiles