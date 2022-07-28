import axios from "axios"
import { toast } from "react-toastify"
import { signin_begin , signin_success , signin_error } from "./features/authSlice"

export const SignIn = async ( data , dispatch , navigate) => {
    dispatch(signin_begin)
    try {
        const send_sign = await axios.post("http://localhost:5000/users/signin" ,  data  )
        let send = send_sign.data.result.name
        dispatch(signin_success(send))
        navigate("/")
        toast.success("User logged in successfully")
    } catch (error) {
        dispatch(signin_error)
        console.log(error)
    }
}