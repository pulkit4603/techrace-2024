import express from "express";
import { validateRequest } from "../middleware";
import { loginSchema } from "../schemas";
import { login, refresh } from "../controllers";

const router = express.Router();

router.post("/", validateRequest(loginSchema), login);

router.post("/refresh", refresh);

router.get("/", (req, res) => {
    res.status(200).send("Hello from Login Routes.");
});

export default router;
