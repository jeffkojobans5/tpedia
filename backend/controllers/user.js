import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import userModel from "../models/user.js"

const secret = "test"

export const signIn = async (req, res) =>{
    const { email , password } = req.body

    try {
        const oldUser = await userModel.findOne({ email })
            if(!oldUser){
                return res.status(404).json({ "message" : "User does not exist"})
            }

            const isPasswordCorrect = await bcrypt.compare(password , oldUser.password)
            
            if(!isPasswordCorrect) {
                return res.status(400).json({message: "Invalid credentials"});
            }

            const token = jwt.sign({email : oldUser.email , id : oldUser._id } , secret , { expiresIn : "1hr"}) 
            res.status(200).json({ result : oldUser , token})

    } catch (error) {
        res.status(500).json({ message : "Something went wrong"})
        console.log(err)        
    }
} 


export const signUp = async (req , res) =>{
    const { email , password , firstName , lastName } = req.body

    try {
        const oldUser = await userModel.findOne({email})

        if(oldUser){
            return res.status(400).json({ message: "User already exists"});
        }

        const hashedpassword = await bcrypt.hash(password , 12);
        const result = await userModel.create({
            email,
            password: hashedpassword,
            name: `${firstName} ${lastName}`
        })

        const token = jwt.sign({ email: result.email , id: result._id} , secret , { expiresIn : "1hr"} )
        res.status(201).json({ result , token})
    }   catch (err) {
        res.status(500).json({ message : "Something went wrong"})
        console.log(err)
    }
}