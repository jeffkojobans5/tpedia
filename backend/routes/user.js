import express from "express"
const router = express.Router()

import { signUp , signIn , googleSignIn , logout } from "../controllers/user.js"

router.post("/signup" , signUp)
router.post("/signin" , signIn)
router.post("/google" , googleSignIn)
router.get("/logout" , logout)

export default router;