import { userActions,profileActions,postsActions} from '../store'
import axios from 'axios'




export const register = (userdata)=>{
    return async dispatch =>{
        try{
            
            
            const {data} = await axios.post('/auth',userdata)
            
            localStorage.setItem('user',JSON.stringify(data))
            
            
            dispatch(userActions.register(data))
            
            
        }catch(err){
            dispatch(userActions.registerFail(err.response && err.response.data.message
                ? err.response.data.message
                : err.message))
            
        }
    }
}






export const loginUser = (userdata)=>{
    return async dispatch =>{
        try{
            
            
            const {data} = await axios.post('/login',userdata)
            
            localStorage.setItem('user',JSON.stringify(data))
            
            
            dispatch(userActions.loginUser(data))
            
            
        }catch(err){
            dispatch(userActions.loginFail(err.response && err.response.data.message
                ? err.response.data.message
                : err.message))
            
        }
    }
}






export const loadUser = ()=>{
    return async (dispatch,useState) =>{
        try{
            // const token = useState().user.user.token
            
            dispatch(userActions.loadingPage())
            
            const token = JSON.parse(localStorage.getItem('user'))
            console.log(token)
            const config = {
                headers: {
                //   'Content-Type': 'application/json',
                  Authorization: `Bearer ${token.token}`,
                },
              }
            
            const {data} = await axios.get('/user',config)
            
            localStorage.setItem('user',JSON.stringify(data))
            
            
            
            
            dispatch(userActions.loadUser(data))
            
            
        }catch(err){
            dispatch(userActions.loadFail(err.response && err.response.data.message
                ? err.response.data.message
                : err.message))
            console.log(err.response && err.response.data.message
                ? err.response.data.message
                : err.message)
            
        }
    }
}













export const getProfile = ()=>{
    return async (dispatch,useState) =>{
        try{
            
            dispatch(profileActions.loadingPage())
            
            const token = useState().user.user.token
            
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            
            const {data}= await axios.get('/profile/me',config)
            console.log(data)
            
            
            
            
            dispatch(profileActions.profileGet(data))
            
            
        }catch(err){
            dispatch(profileActions.profileFail(err.response && err.response.data.message
                ? err.response.data.message
                : err.message))
            console.log(err.response && err.response.data.message
                ? err.response.data.message
                : err.message)
            
        }
    }
}




export const createProfile = (datar)=>{
    return async (dispatch,useState) =>{
        try{
            
            // const token = useState().user.user.token
            // dispatch(profileActions.loadingPage())
            
            const token = JSON.parse(localStorage.getItem('user'))
            console.log(token)
            
            const config = {
                headers: {
                //   'Content-Type': 'application/json',
                  Authorization: `Bearer ${token.token}`,
                },
              }
            
            
            const {data} = await axios.patch('/profile/me/create',datar,config)
            
            
            
            dispatch(profileActions.profileGet(data))
            
            
        }catch(err){
            dispatch(profileActions.profileFail(err.response && err.response.data.message
                ? err.response.data.message
                : err.message))
            
        }
    }
}



export const addExperience = (datar)=>{
    return async (dispatch,useState) =>{
        try{
            
            dispatch(profileActions.loadingPage())
            
            const token = useState().user.user.token
            
            const config = {
                headers: {
                //   'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              }
            
            
          const {data} = await axios.patch(`/profile/experience`,datar,config)
            
        dispatch(profileActions.profileGet(data))
            
            
            
        }catch(err){
            dispatch(profileActions.profileFail(err.response && err.response.data.message
                ? err.response.data.message
                : err.message))
            
        }
    }
}







export const addEducation = (datar)=>{

return async (dispatch,useState) =>{
    try{
        
        dispatch(profileActions.loadingPage())
        
        const token = useState().user.user.token
        
        const config = {
            headers: {
            //   'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        
        
      const {data} = await axios.patch(`/profile/education`,datar,config)
        
    dispatch(profileActions.profileGet(data))
        
        
        
    }catch(err){
        dispatch(profileActions.profileFail(err.response && err.response.data.message
            ? err.response.data.message
            : err.message))
        
    }
}
}








export const getProfileByID = (id)=>{

return async (dispatch,useState) =>{
    try{
        
        dispatch(profileActions.loadingPage())
        
        const token = useState().user.user.token
        
        const config = {
            headers: {
            //   'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        
        
      const {data} = await axios.get(`/profile/user/${id}`,config)
        
    dispatch(profileActions.profileId(data))
        
        
        
    }catch(err){
        dispatch(profileActions.profileIdFail(err.response && err.response.data.message
            ? err.response.data.message
            : err.message))
        
    }
}
}






export const getProfiles = ()=>{

    return async (dispatch,useState) =>{
        try{
            
            dispatch(profileActions.loadingPage())
            
            const token = useState().user.user.token
            
            const config = {
                headers: {
                //   'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              }
            
            
          const {data} = await axios.get(`/profiles/all`,config)
            
        dispatch(profileActions.profilesGet(data))
            
            
            
        }catch(err){
            dispatch(profileActions.profilesFail(err.response && err.response.data.message
                ? err.response.data.message
                : err.message))
            
        }
    }
    }






export const getRepos = (username)=>{

        return async (dispatch,useState) =>{
            try{
                
                dispatch(profileActions.loadingPage())
                
                const token = useState().user.user.token
                
                const config = {
                    headers: {
                    //   'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                  }
                
                
              const {data} = await axios.patch(`/profile/github/${username}`,config)
                
            dispatch(profileActions.getRepos(data))
                
                
                
            }catch(err){
                dispatch(profileActions.getReposFail(err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message))
                
            }
        }
        }











export const getAllPosts = ()=>{

        return async (dispatch,useState) =>{
            try{
                
                dispatch(postsActions.loadingPage())
                
                const token = useState().user.user.token
                
                const config = {
                    headers: {
                    //   'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                  }
                
                
              const {data} = await axios.get(`/posts`,config)
                
            dispatch(postsActions.postsAllGet(data))
                
                
                
            }catch(err){
                dispatch(postsActions.postsFail(err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message))
                
            }
        }
        }
