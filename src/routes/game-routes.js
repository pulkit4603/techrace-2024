import { powerUp, nextClue, getHint } from "../controllers/game-controllers.js";

import express from "express";
//import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Hello from Game Routes.");
});

router.post("/powerUp", powerUp);
router.post("/nextClue", nextClue);
router.post("/getHint", getHint);

export default router;
