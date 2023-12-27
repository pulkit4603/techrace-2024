import{
    powerUp,
    nextClue,
    gethint
} from "../controllers/game-controller.js";

import express from "express";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Hello from Game Routes.");
});

router.post("/powerUp/:pid",auth, powerUp);
router.post("/nextClue", auth, nextClue);
router.post("/gethint", auth, gethint);


export default router;
