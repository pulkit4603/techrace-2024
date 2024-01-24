import express from "express";
import { validateRequest } from "../middleware";
import { volunteerLoginSchema } from "../request-schemas";
import { volunteerLogin } from "../controllers";
const router = express.Router();
router.post("/login", validateRequest(volunteerLoginSchema), volunteerLogin);

router.get("/", (req, res) => {
    res.status(200).send("Hello from the Volunteer Routes.");
});

export default router;
