import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { globalErrorHandler } from "./middleware/global-error-handler.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

const nodeEnv = process.env.NODE_ENV || "development";
if (nodeEnv === "production") {
    console.log("Running in Production Mode");
} else console.log("Running in Development Mode");

app.use(express.json());
app.use("/", routes);
app.use(globalErrorHandler);

app.get("/", (req, res) => {
    res.status(200).send("Hello from the TECHRACE Homepage\n- By Pupta & DVD.");
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
