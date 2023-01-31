import express from "express";
import { getUser, getUserEvents, addRemoveEvent } from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

//READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/events", verifyToken, getUserEvents);

//UPDATE
router.patch("/:id/:eventId", verifyToken, addRemoveEvent)

export default router