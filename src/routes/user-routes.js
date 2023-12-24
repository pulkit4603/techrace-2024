import express from "express";
import { newUser, getUser } from "../controllers/user-controllers.js";

const router = express.Router();

router.post("/new", newUser);
router.get("/:tid", getUser);

router.get("/", (req, res) => {
    res.status(200).send("Hello from User Routes.");
});

export default router;
