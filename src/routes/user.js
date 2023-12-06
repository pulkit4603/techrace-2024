import express from "express";
const router = express.Router();
import { newUser } from "../controllers/test.js";
router.post("/new_user", newUser); //temp removing auth
export default router;
