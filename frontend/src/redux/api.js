import axios from "axios"
import { toast } from "react-toastify"
import { 
    create_tour_begin , 
    create_tour_success , 
    create_tour_error , 
    all_tour_begin , 
    all_tour_success , 
    all_tour_error ,    
    user_tour_begin , 
    user_tour_success , 
    user_tour_error , 
    } from "./features/tourSlice"
import { signin_begin , signin_success , signin_error ,  google_begin , google_success , google_error, logout_success, logout_begin, logout_error } from "./features/authSlice"


export const SignIn = async ( data , dispatch , navigate) => {
    dispatch(signin_begin())
    try {
        const send_sign = await axios.post("http://localhost:5000/users/signin" ,  data , {
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}                 
        } )
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
        const send_sign = await axios.post("http://localhost:5000/users/signup" ,  data  , {
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}                 
        })

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
    dispatch(google_begin())
    try {
        const send_sign = await axios.post("http://localhost:5000/users/google" ,  resp  )
        let send = send_sign.data.result.name
        dispatch(google_success(send))
        navigate("/")
        toast.success("User logged in successfully")
    } catch (error) {
        dispatch(google_error())
        return toast.error(error.response.resp.message)
    }
}

export const createTour = async ( resp , dispatch , navigate) => {
    dispatch(create_tour_begin())
    try {
        const new_tour = await axios.post("http://localhost:5000/tours" ,  resp , {
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}                 
        })
        dispatch(create_tour_success(new_tour))
        // navigate("/")
        toast.success("Tour added in successfully")
    } catch (error) {
        dispatch(create_tour_error())
        console.log(error)
        return toast.error(error.response.resp.message)
    }
}


export const allTours = async (dispatch) => {
    dispatch(all_tour_begin())
    try {
        const all_tour = await axios.get("http://localhost:5000/tours")
        dispatch(all_tour_success(all_tour.data))
    } catch (error) {
        dispatch(all_tour_error())
        console.log(error)
        return toast.error(error.response.resp.message)
    }
}


export const getToursByUser = async (dispatch) => {
    dispatch(user_tour_begin())
    try {
        const user_tour = await axios.get("http://localhost:5000/tours/usertour" , {
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}              
        })
        dispatch(user_tour_success(user_tour.data))
        console.log(user_tour.data)
    } catch (error) {
        dispatch(user_tour_error())
        console.log(error)
        return toast.error(error.response.resp.message)
    }
}


export const logout = async (dispatch) => {
        // dispatch(logout_begin())
    try {
        localStorage.clear()
        dispatch(logout_success())
        await axios.get("http://localhost:5000/users/logout" , {
            withCredentials: true,
            headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}              
        })
    } catch (error) {
        console.log(error)
        // dispatch(logout_error())
    }
}




