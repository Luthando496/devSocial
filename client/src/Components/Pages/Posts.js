import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {getAllPosts} from '../../Store/Actions/userActions'
import Spinner from '../Layout/Spinner'
import image from '../Layout/kindpng_214439.png'
import moment from 'moment'


const Posts=()=> {
  
  const loading = useSelector(state => state.post.loading) 
  const dispatch = useDispatch()
  const posts = useSelector(state => state.post.posts) 
  const user = useSelector(state => state.user.user) 
  console.log(posts)
  
  
  
  
  useEffect(()=>{
    dispatch(getAllPosts())
  },[dispatch])
  return (
          loading ? <Spinner/> : posts  ? (<div class="posts">
            <h1 className="large text-primary">hello sir</h1>
        {posts.map(p => (
          <div class="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img
                class="round-img"
                src={image}
                alt="user"
              />
              <h4>{p.name}</h4>
            </a>
          </div>
          <div>
            <p class="my-1">
              {p.text}
            </p>
             <p class="post-date">
                Posted on {moment(p.date).format('YYYY MM DD')}
            </p>
            <button type="button" class="btn btn-light">
              <i class="fas fa-thumbs-up"></i>
              <span>{p.likes.length}</span>
            </button>
            <button type="button" class="btn btn-light">
              <i class="fas fa-thumbs-down"></i>
            </button>
            <Link to="/post" class="btn btn-primary">
              Discussion <span class='comment-count'>{p.comments.length}</span>
            </Link>
            {user && user.user.id === p.user && (
            <button      
            type="button"
            class="btn btn-danger"
          >
            <i class="fas fa-times"></i>
           Delete</button>
              
            )}
          </div>
        </div>
        ))}
        

        {/* <div class="post bg-white p-1 my-1">
          <div>
            <a href="profile.html">
              <img
                class="round-img"
                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                alt=""
              />
              <h4>John Doe</h4>
            </a>
          </div>
          <div>
            <p class="my-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              possimus corporis sunt necessitatibus! Minus nesciunt soluta
              suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
              dolor? Illo perferendis eveniet cum cupiditate aliquam?
            </p>
            <p class="post-date">
                Posted on 04/16/2019
            </p>
            <button type="button" class="btn btn-light">
              <i class="fas fa-thumbs-up"></i>
              <span>4</span>
            </button>
            <button type="button" class="btn btn-light">
              <i class="fas fa-thumbs-down"></i>
            </button>
            <a href="post.html" class="btn btn-primary">
              Discussion <span class='comment-count'>3</span>
            </a>
            <button      
            type="button"
            class="btn btn-danger"
          >
            <i class="fas fa-times"></i>
          </button>
          </div>
        </div> */}
      </div>): <h1 className='posts text-large'>No Posts found</h1>
  )
}

export default Posts