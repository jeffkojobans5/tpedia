import jwt_decode from 'jwt-decode'
import { mongoose } from 'mongoose'
import TourModel from "../models/tour.js"

export const createTour = async ( req , res) => {
    const token = req.cookies.access_token
    let decoded = jwt_decode(token)
    const { id  } = decoded


    const tour = req.body
    const newTour = new TourModel({
        ...tour,
        creator : id,
        createdAt : new Date().toISOString()
    }) 

    try {
        await newTour.save()
        res.status(201).json(newTour)
    } catch (error) {
        console.log(error)
        res.status(404).json({ message : "Something went wrong"})
    }
}

export const getTours = async ( req , res) => {
    try {
        const tours = await TourModel.find();
        res.status(200).json(tours)
    } catch (error) {
        res.status(400).json({ message : "Something went wrong"})
    }
}


export const getToursByUser = async ( req , res) => {
    const token = req.cookies.access_token

    let decoded = jwt_decode(token)
    const { id  } = decoded
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Something went wrong"})
    }

    try {
        const user_tours = await TourModel.find({ creator : id})
        return res.status(200).json(user_tours) 
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message : "Something went wrong"})
    }
}
