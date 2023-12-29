import express from "express";
import {
    fsNewUser,
    fsGetUser,
    fsAddClue,
    fsGetClue,
    rtGetUser,
    rtNewUser,
} from "../controllers/user-controllers.js";

const router = express.Router();

router.post("/new", fsNewUser);
router.get("/:tid", fsGetUser);
router.post("/clues/add", fsAddClue);
router.get("/clues/:cid", fsGetClue);
router.get("/rt/:tid", rtGetUser);
router.post("/rt/add", rtNewUser);

router.get("/", (req, res) => {
    res.status(200).send("Hello from User Routes.");
});

export default router;
