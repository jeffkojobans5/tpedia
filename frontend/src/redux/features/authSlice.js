import { createSlice  } from "@reduxjs/toolkit"


const authSlice = createSlice({
    name : "auth",
    initialState : {
        user : null,
        error: "",
        loading : false
    },
    reducers: {
        signin_begin : (state , action ) => {
            state.loading = true
        },
        signin_success : (state , action ) => {
            state.loading = false
            state.user = action.payload
            localStorage.setItem("profile" , JSON.stringify(action.payload))
        },
        signin_error : (state , action ) => {
            state.loading = false
            state.error = true
        }
    }
})


export default authSlice.reducer
export const { signin_begin , signin_success , signin_error } = authSlice.actions