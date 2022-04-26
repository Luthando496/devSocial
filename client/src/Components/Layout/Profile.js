import React,{useEffect} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux' 
import {getProfileByID} from '../../Store/Actions/userActions'
import image from './kindpng_214439.png'
import moment from 'moment'


const Profile=()=> {
  const dispatch = useDispatch()
  const id = useParams().id
  const profile = useSelector(state => state.profile.singlePro)
  
  useEffect(()=>{
    dispatch(getProfileByID(id))
  },[dispatch,id])
  console.log(id)
  
  return (
    <section class="container">
      <Link to="/profiles" class="btn btn-light">Back To Profiles</Link>

      {profile && (<div class="profile-grid my-1">
         {/* <!-- Top --> */}
        <div class="profile-top bg-primary p-2">
          <img
            class="round-img my-1"
            src={image}
            alt="user-img"
          />
          <h1 class="large">{profile.user.name}</h1>
          <p class="lead">{profile.company && profile.company}</p>
          <p>{profile.location && profile.location}</p>
          
          <div class="icons my-1">
          {profile.website && (
            <a href={profile.website} target="_blank" rel="noopener noreferrer">
              <i class="fas fa-globe fa-2x"></i>
            </a>
            
          )}
          {profile.social && profile.social.twitter &&(
            <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-twitter fa-2x"></i>
            </a>
            
          ) }
          
          {profile.social && profile.social.facebook &&(
            <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-facebook fa-2x"></i>
            </a>
            )}
            
            {profile.social && profile.social.linkedin &&(
            <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-linkedin fa-2x"></i>
            </a>
            )}
            
            {profile.social && profile.social.youtube &&(
             <a href="#" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-youtube fa-2x"></i>
            </a>
            )}
             {profile.social && profile.social.instagram &&(
            <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
              <i class="fab fa-instagram fa-2x"></i>
            </a>)}
            
          </div>
        </div>

        {/* <!-- About --> */}
        <div class="profile-about bg-light p-2">
          <h2 class="text-primary">{profile.user.name}'s Bio</h2>
          <p>
            {profile.bio && profile.bio}
          </p>
          <div class="line"></div>
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
            {profile.skills && profile.skills.map( (sk,index) =>(
              <div class="p-1"><i class="fa fa-check" key={index}></i>{sk}</div>
              
            ))}
            
          </div>
        </div>

        {/* <!-- Experience --> */}
        {profile.experience && profile.experience.map((exp,ind)=>(
          
        <div class="profile-exp bg-white p-2" key={exp._id}>
          <h2 class="text-primary">Experience</h2>
          <div>
            <h3 class="text-dark">{exp.company}</h3>
            <p>{moment(exp.from).format('YYYY MM DD')} - {' '}
            {exp.to === null? ('NOW') :moment(exp.to).format('YYYY MM DD') }</p>
            <p><strong>Position: </strong>{exp.title}</p>
            <p>
              <strong>Description: </strong>Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
              ipsam, sapiente suscipit dicta eius velit amet aspernatur
              asperiores modi quidem expedita fugit.
            </p>
          </div>
        </div>
        ))}

        {/* <!-- Education --> */}
        {profile.education && profile.education.map((exp,ind)=>(
        <div class="profile-edu bg-white p-2">
          <h2 class="text-primary">Education</h2>
          <div>
            <h3>{exp.school}</h3>
            <p>{moment(exp.from).format('YYYY MM DD')} - {' '}
            {exp.to === null? ('NOW') :moment(exp.to).format('YYYY MM DD') }</p>
            <p><strong>Degree: </strong>{exp.degree}</p>
            <p><strong>Field Of Study: </strong>{exp.fieldofstudy}</p>
            <p>
              <strong>Description: </strong>Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
              ipsam, sapiente suscipit dicta eius velit amet aspernatur
              asperiores modi quidem expedita fugit.
            </p>
          </div>
        </div>))}

        {/* <!-- Github --> */}
        <div class="profile-github">
          <h2 class="text-primary my-1">
            <i class="fab fa-github"></i> Github Repos
          </h2>
          <div class="repo bg-white p-1 my-1">
            <div>
              <h4><a href="#" target="_blank"
                  rel="noopener noreferrer">Repo One</a></h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li class="badge badge-primary">Stars: 44</li>
                <li class="badge badge-dark">Watchers: 21</li>
                <li class="badge badge-light">Forks: 25</li>
              </ul>
            </div>
          </div>
          <div class="repo bg-white p-1 my-1">
            <div>
              <h4><a href="#" target="_blank"
                  rel="noopener noreferrer">Repo Two</a></h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li class="badge badge-primary">Stars: 44</li>
                <li class="badge badge-dark">Watchers: 21</li>
                <li class="badge badge-light">Forks: 25</li>
              </ul>
            </div>
          </div>
        </div>
      </div>)}
    </section>
  )
}

export default Profile