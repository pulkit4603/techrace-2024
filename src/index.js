import express from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

const nodeEnv = process.env.NODE_ENV;
if (nodeEnv === "production") {
    console.log("Running in Production Mode");
} else console.log("Running in Development Mode");

app.use(express.json());
app.use("/", routes);
app.get("/", (req, res) => {
    res.status(200).send("Hello from the TECHRACE Homepage.");
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
