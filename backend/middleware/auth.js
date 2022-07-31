import jwt from "jsonwebtoken"
import user from "../models/user.js";

export const verifyToken = (req, res, next) => {

    const token = req.cookies.access_token;
    if (!token) {
        return res.status(400).json({ message: "You are not authenticated"});
    }
  
    jwt.verify( token, 'test', (err, user) => {
      if (err) return res.status(400).json({ message: "Token is invalid"});
      next();
    });
};

// export const verifyUser = (req , res , next) => {
//     verifyToken(req , res  , ()=>{
//         if(req.user.id === req.params.id || req.user.isAdmin === true){
//             next();
//         }   else    {
//             return next(createError(403 , "You are not authorized"))
//         }
//     });
// }

// export const verifyAdmin = (req , res , next) => {
//     verifyToken(req , res  , next , ()=>{
//         if(req.user.isAdmin){
//             next();
//         }   else    {
//             return next(createError(403 , "You are not authorized"))
//         }
//     });
// }