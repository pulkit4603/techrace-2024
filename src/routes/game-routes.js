import express from "express";
import { auth, validateRequest } from "../middleware";
import { powerUpSchema, nextClueSchema, getHintSchema } from "../schemas";
import { powerUp, nextClue, getHint } from "../controllers";
//import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Hello from Game Routes.");
});

router.post("/powerUp", auth, validateRequest(powerUpSchema), powerUp);
router.post("/nextClue", auth, validateRequest(nextClueSchema), nextClue);
router.post("/getHint", auth, validateRequest(getHintSchema), getHint);

export default router;
