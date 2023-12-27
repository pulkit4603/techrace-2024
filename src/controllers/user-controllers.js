import { fsAddNewTeam, fsGetTeamData, fsAddClueData, fsGetClueData } from "../models";

export const newUser = async (req, res) => {
    const data = req.body;
    console.log("Request Body:", data);
    if (!data) {
        res.json({ status: "0", message: "EMPTY!" });
        return;
    }
    const teamid = data["tid"];
    const status = await fsAddNewTeam(teamid, data);
    if (status == -999) {
        res.json({ status: "0", message: "Error occurred while adding" });
        return;
    }
    res.json({ status: "1", message: "Added Successfully", t_id: data.tid });
};

export const getUser = async (req, res) => {
    try {
        const tid = req.params.tid;
        const data = await fsGetTeamData(tid);
        res.json({
            status: "1",
            message: "content fetched",
            tid: tid,
            data: data,
        });
    } catch (err) {
        console.log(err);
        res.json({ status: "0", message: "Error occurred while fetching" });
    }
};

export const addClue = async (req, res) => {
    const data = req.body;
    console.log("Request Body:", data);
    if (!data) {
        res.json({ status: "0", message: "EMPTY!" });
        return;
    }
    const clueID = data["clueID"];
    const status = await fsAddClueData(clueID, data);
    if (status == -999) {
        res.json({ status: "0", message: "Error occurred while adding" });
        return;
    }
    res.json({
        status: "1",
        message: "Added Successfully",
        clueID: data.clueID,
    });
};

export const getClue = async (req, res) => {
    try {
        const clueID = req.params.cid;
        const data = await fsGetClueData(clueID);
        res.json({
            status: "1",
            message: "content fetched",
            clueID: clueID,
            data: data,
        });
    } catch (err) {
        console.log(err);
        res.json({ status: "0", message: "Error occurred while fetching" });
    }
};