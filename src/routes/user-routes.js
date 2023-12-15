import express from "express";
const router = express.Router();
import { newUser, getUser } from "../controllers/test.js";
router.post("/new_user", newUser); //temp removing auth
router.get("/get_user/:tid", getUser); //temp removing auth
export default router;
