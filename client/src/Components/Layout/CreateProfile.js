import React,{useState,Fragment,useEffect} from 'react'
import {createProfile} from '../../Store/Actions/userActions'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const CreateProfile=() =>{
  const [formData,setForm] = useState({
    handle:'' ,
    company: '',
    website: '',
    location: '',
    status: '',
    skills: [],
    bio: '',
    githubusername: '',
    instagram:'',
    twitter: '',
    youtube: '',
    linkedin: '',
    facebook: ''
  })
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile.profile)
  const navigate = useNavigate()
  
  
  const {handle,instagram,facebook,twitter,location,youtube,githubusername ,bio,company,website,status,skills,linkedin}= formData;
  
  const change=(e)=>{
    setForm({...formData,[e.target.name]:e.target.value})
    
  }
  
  const [toggleShow,setToggle]= useState(false);
  
  const Submit =(e) =>{
    e.preventDefault()
    console.log(formData)
    dispatch(createProfile(formData))
    navigate('/dashboard')
    
  }
  
  
  if(profile){
    navigate('/dashboard')
  }
  return (
    <div>
      <section className="container">
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={Submit}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e)=> change(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={(e)=> change(e)}/>
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" onChange={(e)=> change(e)}  value={website}/>
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" onChange={(e)=> change(e)} value={location} />
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" onChange={(e)=> change(e)} value={skills}/>
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            onChange={(e)=> change(e)}
            value={githubusername}
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" onChange={(e)=> change(e)} value={bio}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" className="btn btn-light" onClick={()=> setToggle(!toggleShow)}>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
              {toggleShow && (
                <Fragment>
        <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input type="text" placeholder="Twitter URL" name="twitter" onChange={(e)=> change(e)} value={twitter} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input type="text" placeholder="Facebook URL" name="facebook" onChange={(e)=> change(e)} value={facebook} />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input type="text" placeholder="YouTube URL" name="youtube" onChange={(e)=> change(e)} value={youtube}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input type="text" placeholder="Linkedin URL" name="linkedin" onChange={(e)=> change(e)} value={linkedin}/>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input type="text" placeholder="Instagram URL" name="instagram" onChange={(e)=> change(e)} value={instagram} />
        </div>
                  
                </Fragment>
              )}
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
    </section>
    </div>
  )
}

export default CreateProfile