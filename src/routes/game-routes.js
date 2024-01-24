import express from "express";
import { auth, validateRequest } from "../middleware";
import {
    powerUpSchema,
    getClueSchema,
    nextClueSchema,
    getHintSchema,
    stateChangeSchema,
} from "../request-schemas";
import {
    powerUp,
    getClue,
    nextClue,
    getHint,
    stateChange,
} from "../controllers";
//import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Hello from Game Routes.");
});

router.post("/powerUp", auth, validateRequest(powerUpSchema), powerUp);
router.post("/nextClue", auth, validateRequest(nextClueSchema), nextClue);
router.post("/getClue", auth, validateRequest(getClueSchema), getClue);
router.post("/getHint", auth, validateRequest(getHintSchema), getHint);
router.post(
    "/stateChange",
    auth,
    validateRequest(stateChangeSchema),
    stateChange,
);
export default router;
