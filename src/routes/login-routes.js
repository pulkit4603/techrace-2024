import express from "express";
import { login } from "../controllers/login-controllers.js";
import { loginSchema } from "../schemas";
import { validateRequest } from "../middleware";

const router = express.Router();

router.post("/", validateRequest(loginSchema), login);

router.get("/", (req, res) => {
    res.status(200).send("Hello from Login Routes.");
});

export default router;
