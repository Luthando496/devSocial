import React ,{Fragment, useEffect}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {getProfile} from '../../Store/Actions/userActions'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'
import moment from 'moment'
import Spinner from './Spinner'



const Dashboard=()=> {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const profile = useSelector(state => state.profile.profile)
  const loading = useSelector(state => state.user.loading)
  console.log(user && user.user.name)
  
  useEffect(()=>{
    dispatch(getProfile())
  },[dispatch])
  
  return (
    <section className='container '>
      <h1>Dashboard of <i className='fas fa-user px-2'></i>{user && user.user.name}</h1>
      {profile === null? <Link to='/profile/create-profile'><h2 className='mt-4 btn btn-info'>Add Profile</h2></Link>:<Fragment>
        <Link to='/profile/create-exp' className='btn btn-info'>Add Experience</Link>
        <Link to='/profile/create-edu' className='btn btn-info'>Add Education</Link>
        </Fragment>}
      
      
     <h2 className='my-5'>Experience Credintials</h2>
     {loading ? <Spinner />: (
     <div><table className='table mt-5'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
          </tr>
        </thead>
        
        <tbody>
          {profile && profile.experience && profile.experience.map(exp => (
            <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>{moment(exp.from).format('YYYY MM DD')} - {' '}
            {exp.to === null? ('NOW') :moment(exp.to).format('YYYY MM DD') }
            </td>
            
            <td>
              <button className='btn btn-danger'>Delete</button>
            </td>
            </tr>
          ))}
        </tbody>
        
      </table>
      
      
      
      
      <h2 className='my-5'>Education Credintials</h2>
      <table className='table mt-5'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
          </tr>
        </thead>
        
        <tbody>
          {profile && profile.education && profile.education.map(edu => (
            <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>{moment(edu.to).format('YYYY MM DD')} - {' '}
            {edu.to === null? ('NOW') :moment(edu.to).format('YYYY MM DD') }
            </td>
            
            <td>
              <button className='btn btn-danger'>Delete</button>
            </td>
            </tr>
          ))}
        </tbody>
        
      </table>
      </div>)}
      
      
      </section>
      
  )
}

export default Dashboard