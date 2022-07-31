import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import jwt_decode from 'jwt-decode'
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
            res.cookie("access_token" , token , { httpOnly : true } ).status(200).send({ result : oldUser })
                        
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


export const googleSignIn = async ( req , res , next) => {
    const token = req.body.credential
    
    try {
        let decoded = jwt_decode(token)
        const { email , name , sub } = decoded

        // checks if email already exists
        const oldUser = await userModel.findOne({ email })

        // 
        if(oldUser) {
            const result = { _id : oldUser._id.toString() , email , name }
            return res.status(201).json({ result , token })
        }

        // create new user if gmail cant be found
        const result = await userModel.create({
            email,
            name,
            googleId : sub
        })

        res.status(201).json({result , token})

     } catch (error) {
        res.status(500).json({ message : "Something went wrong"})
        console.log(error)
    }
}