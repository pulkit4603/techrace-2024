import express from "express";
import { validateRequest } from "../middleware";
import { loginSchema, refreshSchema } from "../request-schemas";
import { login, refresh } from "../controllers";

const router = express.Router();

router.post("/", validateRequest(loginSchema), login);

router.post("/refresh", validateRequest(refreshSchema), refresh);

router.get("/", (req, res) => {
    res.status(200).send("Hello from Login Routes.");
});

export default router;
