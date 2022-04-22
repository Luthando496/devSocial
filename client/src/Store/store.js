import {createSlice,configureStore} from '@reduxjs/toolkit'


const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : ''

const userSlice = createSlice({
    name:'user',
    initialState:{user:user,loading:false,err:null,isAuth:false},
    reducers:{
        
        loadingPage(state,action){
            state.loading = true
        },
        loginUser(state,action){
            state.user = action.payload
            state.loading = false
            state.err = null
            state.isAuth = true
        },
        loginFail(state,action){
            state.user = null
            state.err = action.payload
            state.loading = false
            state.isAuth = false
        },
        loadUser(state,action){
            state.user = action.payload
            state.loading = false
            state.err = null
            state.isAuth = true
        },
        loadFail(state,action){
            state.user = null
            state.err = action.payload
            state.loading = false
            state.isAuth = false
        },
        register(state,action){
            state.user = action.payload
            state.loading = false
            state.err = null
            state.isAuth = true
        },
        registerFail(state,action){
            state.user = null
            state.err = action.payload
            state.loading = false
            state.isAuth = false
        }

    }
})

// const postSlice = createSlice({
//     name:'post',
//     initialState:{post:'',loading:true,err:null,image:null,posts:''},
//     reducers:{
        
//         loadingPage(state,action){
//             state.loading = true
//             state.err = null
//             state.post = null
            
//         },
//         newPost(state,action){
//             state.post = action.payload
//             state.loading = false
//             state.err = null
//         },
//         postFail(state,action){
//             state.post = null
//             state.err = action.payload
//             state.loading = false
//         },
//         imageLoad(state,action){
//             state.image = action.payload
//         },
//         postLoad(state,action){
//             state.posts = action.payload
//         },

//     }
// })


// export const postActions = postSlice.actions


export const userActions = userSlice.actions


const store = configureStore({
    reducer:{user:userSlice.reducer}
})


export default store;