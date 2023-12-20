import { addUser, get_this } from "../models/user-models";

export const newUser = async (req, res) => {
    const data = req.body;
    console.log("Request Body:", data);
    if (!data) {
        res.json({ status: "0", message: "EMPTY!" });
        return;
    }
    const tid = data["tid"];
    const status = await addUser(tid, data);
    if (status == -999) {
        res.json({ status: "0", message: "Error occurred while adding" });
        return;
    }
    res.json({ status: "1", message: "Added Successfully", t_id: data.tid });
};

export const getUser = async (req, res) => {
    const tid = req.params.tid;
    const data = await get_this(tid);
    res.json({ status: "1", message: "content fetched", tid: tid, data: data });
};
