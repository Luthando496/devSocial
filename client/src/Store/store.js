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
    initialState:{profile:null,loading:false,err:null,repos:null,profiles:[],singlePro:null,repos:null},
    reducers:{
        
        // ss
        loadingPage(state){
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
            state.loading = false
        },
        postLoad(state,action){
            state.posts = action.payload
            state.loading = false
        },
        profilesGet(state,action){
            state.loading = false
            state.profiles = action.payload
        },
        profilesFail(state,action){
            state.profiles = null
            state.err = action.payload
            state.loading = false
        },
        profileId(state,action){
            state.singlePro = action.payload
            state.loading = false
        },
        profileIdFail(state,action){
            state.err = action.payload
            state.loading = false
            state.singlePro = null
        },
        getRepos(state,action){
            state.repos = action.payload
            state.loading = false
        },
        profileIdFail(state,action){
            state.err = action.payload
            state.loading = false
            state.repos = null
        },
        
        

    }
})


const postsSlice = createSlice({
    name:'posts',
    initialState:{post:null,loading:false,err:null,posts:[],},
    reducers:{
        
        // ss
        loadingPage(state){
            state.loading = true
        },
        postsAllGet(state,action){
            state.posts = action.payload
            state.loading = false
            state.err = null
        },
        postsFail(state,action){
            state.posts = null
            state.err = action.payload
            state.loading = false
        },
        singlePost(state,action){
            state.post = action.payload
            state.loading = false
        },
        singleFail(state,action){
            state.post = action.payload
            state.loading = false
        },
        // profilesGet(state,action){
        //     state.loading = false
        //     state.profiles = action.payload
        // },
        // profilesFail(state,action){
        //     state.profiles = null
        //     state.err = action.payload
        //     state.loading = false
        // },
        // profileId(state,action){
        //     state.singlePro = action.payload
        //     state.loading = false
        // },
        // profileIdFail(state,action){
        //     state.err = action.payload
        //     state.loading = false
        //     state.singlePro = null
        // },
        // getRepos(state,action){
        //     state.repos = action.payload
        //     state.loading = false
        // },
        // profileIdFail(state,action){
        //     state.err = action.payload
        //     state.loading = false
        //     state.repos = null
        // },
        
        

    }
})



export const profileActions = profileSlice.actions
export const postsActions = postsSlice.actions

export const userActions = userSlice.actions


const store = configureStore({
    reducer:{user:userSlice.reducer,
            profile:profileSlice.reducer,
            post:postsSlice.reducer}
})


export default store;