import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Hello from the Volunteer Routes.");
});

export default router;
