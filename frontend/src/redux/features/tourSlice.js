import { createSlice  } from "@reduxjs/toolkit"


const tourlice = createSlice({
    name : "auth",
    initialState : {
        all_tours : [],
        tours : [],
        userTours : [],
        error: false,
        loading : false
    },
    reducers: {
        create_tour_begin : (state) => {
            state.loading = true
            state.error = false
        },
        create_tour_success : (state , action ) => {
            state.loading = false
            state.tours = [action.payload]; 
        },
        create_tour_error : (state) => {
            state.loading = false
            state.error = true
        },
        all_tour_begin : (state) => {
            state.loading = true
            state.error = false
        },
        all_tour_success : (state , action ) => {
            state.loading = false
            state.all_tours = action.payload; 
        },
        all_tour_error : (state) => {
            state.loading = false
            state.error = true
        },
        user_tour_begin : (state) => {
            state.loading = true
            state.error = false
        },
        user_tour_success : (state , action ) => {
            state.loading = false
            state.userTours = action.payload; 
        },
        user_tour_error : (state) => {
            state.loading = false
            state.error = true
        },
    }
})


export default tourlice.reducer
export const { 
    create_tour_begin , 
    create_tour_success , 
    create_tour_error , 
    all_tour_begin , 
    all_tour_success , 
    all_tour_error , 
    user_tour_begin , 
    user_tour_success , 
    user_tour_error , 
} = tourlice.actions