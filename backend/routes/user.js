import express from "express"
const router = express.Router()

import { signUp , signIn , googleSignIn } from "../controllers/user.js"

router.post("/signup" , signUp)
router.post("/signin" , signIn)
router.post("/google" , googleSignIn)

export default router;