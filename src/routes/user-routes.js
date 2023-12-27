import express from "express";
import { newUser, getUser, addClue, getClue } from "../controllers/user-controllers.js";

const router = express.Router();

router.post("/new", newUser);
router.get("/:tid", getUser);
router.post("/clues/add", addClue);
router.get("/clues/:cid", getClue)
router.get("/", (req, res) => {
    res.status(200).send("Hello from User Routes.");
});

export default router;
