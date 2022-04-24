import { userActions,profileActions} from '../store'
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







// export const findPeople = ()=>{
//     return async (dispatch,useState) =>{
//         try{
            
//             const token = useState().user.user.token
            
//             const config = {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
            
            
//            const {data} = await axios.get(`/users/posts/p/find-people`,config)
//            dispatch(userActions.peopleFind(data))
            
            
            
//         }catch(err){
//             dispatch(userActions.peopleFail(err.response && err.response.data.message
//                 ? err.response.data.message
//                 : err.message))
            
//         }
//     }
// }













// export const unfollowUser = (id)=>{
//     return async (dispatch,useState) =>{
//         try{
            
//             const token = useState().user.user.token
            
//             const config = {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
            
            
//             const {data} = await axios.put(`/users/posts/unfollow-user`,{_id:id},config)
            
//               dispatch(userActions.followP(data))
//               localStorage.removeItem('user')
//             localStorage.setItem('user',JSON.stringify(data))
              
              
            
            
            
//         }catch(err){
//             dispatch(userActions.peopleFail(err.response && err.response.data.message
//                 ? err.response.data.message
//                 : err.message))
            
//         }
//     }
// }











// export const follow = (id)=>{
//     return async (dispatch,useState) =>{
//         try{
            
//             const token = useState().user.user.token
            
//             const config = {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
            
            
//             const {data} = await axios.put(`/users/posts/follow-user`,{_id:id},config)
            
//               dispatch(userActions.followP(data))
//               localStorage.removeItem('user')
//             localStorage.setItem('user',JSON.stringify(data))
              
              
            
            
            
//         }catch(err){
//             dispatch(userActions.peopleFail(err.response && err.response.data.message
//                 ? err.response.data.message
//                 : err.message))
            
//         }
//     }
// }
