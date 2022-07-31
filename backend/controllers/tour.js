import jwt_decode from 'jwt-decode'
import TourModel from "../models/tour.js"

export const createTour = async ( req , res) => {
    const token = req.cookies.access_token
    let decoded = jwt_decode(token)
    const { email , id  } = decoded
    console.log(email , id)

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
        const tours = await TourModal.find();
        res.status(200).json(tours)
    } catch (error) {
        res.status(400).json({ message : "Something went wrong"})
    }
}