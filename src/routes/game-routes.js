import express from "express";
import { validateRequest } from "../middleware";
import { powerUpSchema, nextClueSchema, getHintSchema } from "../schemas";
import { powerUp, nextClue, getHint } from "../controllers";
//import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Hello from Game Routes.");
});

router.post("/powerUp", validateRequest(powerUpSchema), powerUp);
router.post("/nextClue", validateRequest(nextClueSchema), nextClue);
router.post("/getHint", validateRequest(getHintSchema), getHint);

export default router;
