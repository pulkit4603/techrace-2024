import {
    fsAddNewTeam,
    fsGetTeamData,
    fsAddClueData,
    fsGetClueData,
    rtGetTeamData,
    rtAddNewTeam,
    // rtUpdateTeamData,
} from "../models";

export const fsNewUser = async (req, res) => {
    const data = req.body;
    console.log("Request Body:", data);
    if (!data) {
        res.json({ status: "0", message: "EMPTY!" });
        return;
    }
    const teamID = data["teamID"];
    delete data["teamID"];
    const status = await fsAddNewTeam(teamID, data);
    if (status == -999) {
        res.json({ status: "0", message: "Error occurred while adding" });
        return;
    }
    res.json({ status: "1", message: "Added Successfully", t_id: data.tid });
};

export const fsGetUser = async (req, res) => {
    try {
        const tid = req.params.tid;
        const data = await fsGetTeamData(tid);
        if (data == 0) {
            res.json({ status: "0", message: "Team not found" });
            return;
        }
        res.json({
            status: "1",
            message: "content fetched",
            tid: tid,
            data: data,
        });
    } catch (err) {
        console.log(err);
        res.json({ status: "-1", message: "Error occurred while fetching" });
    }
};

export const fsAddClue = async (req, res) => {
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

export const fsGetClue = async (req, res) => {
    try {
        const clueID = req.params.cid;
        const data = await fsGetClueData(clueID);
        if (data == 0) {
            res.json({ status: "0", message: "Clue not found" });
            return;
        }
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

export const rtGetUser = async (req, res) => {
    try {
        const tid = req.params.tid;
        const data = await rtGetTeamData(tid);
        if (data == 0) {
            res.json({ status: "0", message: "Team not found" });
            return;
        }
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

export const rtNewUser = async (req, res) => {
    try {
        const data = req.body;
        console.log("Request Body:", data);
        if (!data) {
            res.json({ status: "0", message: "EMPTY!" });
            return;
        }
        const teamID = data["teamID"];
        delete data["teamID"];
        const status = await rtAddNewTeam(teamID, data);
        if (status == 2) {
            res.json({ status: "2", message: "Team already exists" });
            return;
        }
        res.json({
            status: "1",
            message: "Added Successfully",
            teamID: data.tid,
        });
    } catch (err) {
        console.log(err);
        res.json({ status: "-1", message: "Error occurred while adding" });
    }
};
