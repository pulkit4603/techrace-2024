import { addUser } from "../models/user_models";

export const newUser = async (req, res) => {
    const data = req.json;
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
