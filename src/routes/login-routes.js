import express from "express";
import { validateRequest } from "../middleware";
import { loginSchema } from "../request-schemas";
import { login } from "../controllers";

const router = express.Router();

router.post("/", validateRequest(loginSchema), login);

router.get("/", (req, res) => {
    res.status(200).send("Hello from Login Routes.");
});

export default router;
