import React,{useState,Fragment} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {addExperience} from '../../Store/Actions/userActions'
import Spinner from './Spinner' 
export const Experience = () => {
  
  const [formData,setForm] = useState({
    
    title: "",
    company: "",
    location: "",
    from: "",
    to:"",
    current:false ,
    description: ""
  })
  const dispatch = useDispatch()
  const loading = useSelector(state => state.profile.loading)
  
  const {to,current,description,title,company,location,from,} = formData;
  const [toggleShow,setToggle]= useState(false);
  
  
  
  const change=(e)=>{
    setForm({...formData,[e.target.name]:e.target.value})
    
  }
  
  const Submit =(e) =>{
    e.preventDefault()
    console.log(formData)
    dispatch(addExperience(formData))
    
  }
  
  return (
    <section className="container">
        
      <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      {loading ? <Spinner/> : (
      <form className="form" onSubmit={Submit}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" required 
          value={title} onChange={(e)=> change(e)}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" required value={company} onChange={(e)=> change(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={(e)=> change(e)} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from"  value={from} onChange={(e)=> change(e)}/>
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" checked={current} value={current} onChange={(e)=> {setForm({...setForm,current:!current})
          setToggle(!toggleShow) }}/> Current Job</p>
        </div>
        {!toggleShow && (
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={(e)=> change(e)} />
        </div>
          
        )}
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            value={description} onChange={(e)=> change(e)}
            placeholder="Job Description"
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
      )}
    </section>
  )
}


export default Experience;