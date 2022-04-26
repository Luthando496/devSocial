import React,{useState,Fragment} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import {addEducation} from '../../Store/Actions/userActions'
import Spinner from './Spinner'
 
const Education = () => {
  
  const [formData,setForm] = useState({
    
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to:"",
    current:false ,
    description: ""
  })
  const dispatch = useDispatch()
  const loading = useSelector(state => state.profile.loading)
  const navigate = useNavigate()
  
  const {to,current,description,school,degree,fieldofstudy,from,} = formData;
  const [toggleShow,setToggle]= useState(false);
  
  
  
  const change=(e)=>{
    setForm({...formData,[e.target.name]:e.target.value})
    
  }
  
  const Submit =(e) =>{
    e.preventDefault()
    console.log(formData)
    dispatch(addEducation(formData))
    navigate('/dashboard')
    
  }
  
  return (
    <section className="container">
        
      <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any School/Bootcamp
        you attended in the past.
      </p>
      <small>* = required field</small>
      {loading ? <Spinner/> : (
      <form className="form" onSubmit={Submit}>
        <div className="form-group">
          <input type="text" placeholder="* School" name="school" required 
          value={school} onChange={(e)=> change(e)}/>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* degree" name="degree" required value={degree} onChange={(e)=> change(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="fieldofstudy" name="fieldofstudy" value={fieldofstudy} onChange={(e)=> change(e)} />
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


export default Education;