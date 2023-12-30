import express from "express";
import {
    fsNewUserSchema,
    fsAddClueSchema,
    rtNewUserSchema,
    rtUpdateUserSchema,
} from "../schemas";
import { validateRequest } from "../middleware";
import {
    fsNewUser,
    fsGetUser,
    fsAddClue,
    fsGetClue,
    rtGetUser,
    rtNewUser,
    rtUpdateUser,
} from "../controllers";

const router = express.Router();

router.post("/new", validateRequest(fsNewUserSchema), fsNewUser);
router.get("/:tid", fsGetUser);
router.post("/clues/add", validateRequest(fsAddClueSchema), fsAddClue);
router.get("/clues/:cid", fsGetClue);
router.get("/rt/:tid", rtGetUser);
router.post("/rt/add", validateRequest(rtNewUserSchema), rtNewUser);
router.post("/rt/update", validateRequest(rtUpdateUserSchema), rtUpdateUser);

router.get("/", (req, res) => {
    res.status(200).send("Hello from User Routes.");
});

export default router;
