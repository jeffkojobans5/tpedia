import axios from "axios"
import { toast } from "react-toastify"
import { signin_begin , signin_success , signin_error ,  google_begin , google_success , google_error } from "./features/authSlice"

export const SignIn = async ( data , dispatch , navigate) => {
    dispatch(signin_begin())
    try {
        const send_sign = await axios.post("http://localhost:5000/users/signin" ,  data  )
        let send = send_sign.data.result.name
        dispatch(signin_success(send))
        navigate("/")
        toast.success("User logged in successfully")
    } catch (error) {
        dispatch(signin_error())
        return toast.error(error.response.data.message)
    }
}

export const SignUp = async ( data , dispatch , navigate) => {
    dispatch(signin_begin())
    try {
        const send_sign = await axios.post("http://localhost:5000/users/signup" ,  data  )
        let send = send_sign.data.result.name
        dispatch(signin_success(send))
        navigate("/")
        toast.success("User logged in successfully")
    } catch (error) {
        dispatch(signin_error())
        return toast.error(error.response.data.message)
    }
}

export const GoogleSignIn = async ( resp , dispatch , navigate) => {
    // dispatch(google_begin())
    try {
        const send_sign = await axios.post("http://localhost:5000/users/google" ,  resp  )
        let send = send_sign.data.result.name
        dispatch(google_success(send))
        navigate("/")
        toast.success("User logged in successfully")
    } catch (error) {
        dispatch(google_error())
        // return toast.error(error.response.resp.message)
    }
}

