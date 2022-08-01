import { createSlice  } from "@reduxjs/toolkit"


const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null,
        error: false,
        loading : false
    },
    reducers: {
        set_user : (state , action ) => {
            state.user = action.payload
        },
        logout_success : (state) => {
            state.user = null;
            localStorage.clear()
        },
        signin_begin : (state) => {
            state.loading = true
            state.error = false
        },
        signin_success : (state , action ) => {
            state.loading = false
            state.user = action.payload
            localStorage.setItem("profile" , JSON.stringify(action.payload))
        },
        signin_error : (state) => {
            state.loading = false
            state.error = true
        },
        register_begin : (state) => {
            state.loading = true
            state.error = false
        },
        register_success : (state , action ) => {
            state.loading = false
            state.user = action.payload
            localStorage.setItem("profile" , JSON.stringify(action.payload))
        },
        register_error : (state) => {
            state.loading = false
            state.error = true
        },
        google_begin : (state) => {
            state.loading = true
            state.error = false
        },
        google_success : (state , action ) => {
            state.loading = false
            state.user = action.payload
            localStorage.setItem("profile" , JSON.stringify(action.payload))            
        },
        google_error : (state) => {
            state.loading = false
            state.error = true
        }
    }
})


export default authSlice.reducer
export const { 
    set_user,
    logout_begin,
    logout_success,
    logout_error,
    signin_begin , 
    signin_success , 
    signin_error , 
    register_begin , 
    register_success , 
    register_error ,
    google_begin , 
    google_success , 
    google_error     
} = authSlice.actions