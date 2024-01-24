import express from "express";
import { validateRequest } from "../middleware";
import {
    volunteerLoginSchema,
    volunteerValidateRequestSchema,
} from "../request-schemas";
import { volunteerLogin, volunteerValidateRequest } from "../controllers";
const router = express.Router();
router.post("/login", validateRequest(volunteerLoginSchema), volunteerLogin);

router.get("/", (req, res) => {
    res.status(200).send("Hello from the Volunteer Routes.");
});

router.post(
    "/validate",
    validateRequest(volunteerValidateRequestSchema),
    volunteerValidateRequest,
);

export default router;
