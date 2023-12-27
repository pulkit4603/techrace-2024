import{
    powerUp,
    nextClue,
    gethint
} from "../controllers/game-controller.js";

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Hello from Game Routes.");
});

router.post("/powerUp/:pid", powerUp);
router.post("/nextClue", nextClue);
router.post("/gethint", gethint);


export default router;
