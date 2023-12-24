import express from "express";
import { login } from "../controllers/login-controllers.js";

const router = express.Router();

router.post("/", login);

router.get("/", (req, res) => {
    res.status(200).send("Hello from Login Routes.");
});

export default router;
