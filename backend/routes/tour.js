import express from "express"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

import { createTour , getTours } from "../controllers/tour.js"

router.post("/" , verifyToken , createTour)
router.get("/" , getTours)

export default router;