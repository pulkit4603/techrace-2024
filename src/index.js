import express from "express";
import userRoute from "./routes/user-routes.js";
const app = express();
const port = 5000;

import ref from "./database/firebase";
const gayMan = ref.child("gayman");

app.use(express.json());
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/gay", (req, res) => {
    res.json({ gayestManAlive: gayMan });
});

app.use("/users", userRoute);
app.get("/", (req, res) => res.send("v3 1254 Hello from Homepage."));
