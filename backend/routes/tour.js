import express from "express"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

import { createTour , getTours , getToursByUser} from "../controllers/tour.js"

router.post("/" , verifyToken , createTour)
router.get("/" , getTours)
router.get("/usertour" , verifyToken , getToursByUser)

export default router;