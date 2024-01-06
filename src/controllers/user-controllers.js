import {
    fsAddNewTeam,
    fsGetTeamData,
    fsAddClueData,
    fsGetClueData,
    rtGetTeamData,
    rtAddNewTeam,
    rtUpdateTeamData,
} from "../models";
import { logger } from "../services/winston.js";

export const fsNewUser = async (req, res) => {
    const data = req.body;
    const teamID = data["teamID"];
    delete data["teamID"];
    await fsAddNewTeam(teamID, data);
    res.json({ status: "1", message: "Added Successfully", t_id: data.tid });
    logger.log({ level: "info", message: `Team ${teamID} added successfully` });
};

export const fsGetUser = async (req, res) => {
    const teamID = req.params.tid;
    const data = await fsGetTeamData(teamID);
    res.json({
        status: "1",
        message: "content fetched",
        tid: teamID,
        data: data,
    });
    logger.log({
        level: "info",
        message: `User data fetched successfully for team ${teamID}`,
    });
};

export const fsAddClue = async (req, res) => {
    const data = req.body;
    const clueID = data["clueID"];
    await fsAddClueData(clueID, data);
    res.json({
        status: "1",
        message: "Added Successfully",
        clueID: data.clueID,
    });
    logger.log({ level: "info", message: `Clue ${clueID} added successfully` });
};

export const fsGetClue = async (req, res) => {
    const clueID = req.params.cid;
    const data = await fsGetClueData(clueID);
    res.json({
        status: "1",
        message: "content fetched",
        clueID: clueID,
        data: data,
    });
    logger.log({
        level: "info",
        message: `Clue ${clueID} fetched successfully`,
    });
};

export const rtGetUser = async (req, res) => {
    const tid = req.params.tid;
    const data = await rtGetTeamData(tid);
    res.json({
        status: "1",
        message: "content fetched",
        tid: tid,
        data: data,
    });
    logger.log({
        level: "info",
        message: `User data fetched successfully for team ${tid}`,
    });
};

export const rtNewUser = async (req, res) => {
    const data = req.body;
    console.log("Request Body:", data);
    const teamID = data["teamID"];
    delete data["teamID"];
    await rtAddNewTeam(teamID, data);
    res.json({
        status: "1",
        message: "Added Successfully",
        teamID: data.tid,
    });
    logger.log({
        level: "info",
        message: `Team ${teamID} added successfully`,
    });
};

export const rtUpdateUser = async (req, res) => {
    const data = req.body;
    console.log("Request Body:", data);
    const teamID = data["teamID"];
    delete data["teamID"];
    await rtUpdateTeamData(teamID, data);
    res.json({
        status: "1",
        message: "Added Successfully",
        teamID: data.tid,
    });
    logger.log({
        level: "info",
        message: `Team ${teamID} updated successfully`,
    });
};
