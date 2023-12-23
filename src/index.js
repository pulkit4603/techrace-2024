import express from "express";
import userRoute from "./routes/user-routes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;

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
app.get("/", (req, res) => {
    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv === "production") {
        console.log("running in production mode");
    }
    console.log("hi");
    res.send("v3 1254 Hello from Homepage.");
});
