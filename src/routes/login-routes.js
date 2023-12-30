import express from "express";
import { loginSchema } from "../schemas";
import { validateRequest } from "../middleware";
import { login } from "../controllers/login-controllers.js";

const router = express.Router();

router.post("/", validateRequest(loginSchema), login);

router.get("/", (req, res) => {
    res.status(200).send("Hello from Login Routes.");
});

export default router;
