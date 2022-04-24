import {createSlice,configureStore} from '@reduxjs/toolkit'


const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null


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
            state.user = user
            state.err = action.payload
            state.loading = false
            state.isAuth = state.user ? true : false
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

const profileSlice = createSlice({
    name:'profile',
    initialState:{profile:null,loading:false,err:null,repos:null,profiles:[]},
    reducers:{
        
        // ss
        loadingPage(state,action){
            state.loading = true
        },
        profileGet(state,action){
            state.profile = action.payload
            state.loading = false
            state.err = null
        },
        profileFail(state,action){
            state.profile = null
            state.err = action.payload
            state.loading = false
        },
        addExperience(state,action){
            state.image = action.payload
        },
        postLoad(state,action){
            state.posts = action.payload
        },

    }
})


export const profileActions = profileSlice.actions

export const userActions = userSlice.actions


const store = configureStore({
    reducer:{user:userSlice.reducer,
            profile:profileSlice.reducer}
})


export default store;