import express from "express";
const app = express();
const port = 5000;

import ref from "./database/firebase";
const gayMan = ref.child.gayman;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
    res.send({ gayestManAlive: gayMan });
});
