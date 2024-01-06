import {
    fsAddNewTeam,
    fsGetTeamData,
    fsAddClueData,
    fsGetClueData,
    rtGetTeamData,
    rtAddNewTeam,
    rtUpdateTeamData,
} from "../models";

import { logger } from "../winston";

export const fsNewUser = async (req, res) => {
    const data = req.body;
    console.log("Request Body:", data);
    if (!data) {
        res.json({ status: "0", message: "EMPTY!" });
        logger.log({ level: "error", message: "Empty request body" });
        return;
    }
    const teamID = data["teamID"];
    delete data["teamID"];
    const status = await fsAddNewTeam(teamID, data);
    if (status == -999) {
        res.json({ status: "0", message: "Error occurred while adding" });
        logger.log({
            level: "error",
            message: `Error occurred while adding team ${teamID}`,
        });
        return;
    }
    res.json({ status: "1", message: "Added Successfully", t_id: data.tid });
    logger.log({ level: "info", message: `Team ${teamID} added successfully` });
};

export const fsGetUser = async (req, res) => {
    try {
        const tid = req.params.tid;
        const data = await fsGetTeamData(tid);
        if (data == 0) {
            res.json({ status: "0", message: "Team not found" });
            logger.log({ level: "error", message: `Team ${tid} not found` });
            return;
        }
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
    } catch (err) {
        const tid = req.params.tid;
        res.json({ status: "-1", message: "Error occurred while fetching" });
        logger.log({
            level: "error",
            message: `Error occurred while fetching team ${tid}`,
        });
    }
};

export const fsAddClue = async (req, res) => {
    const data = req.body;
    console.log("Request Body:", data);
    if (!data) {
        res.json({ status: "0", message: "EMPTY!" });
        logger.log({ level: "error", message: "Empty request body" });
        return;
    }
    const clueID = data["clueID"];
    const status = await fsAddClueData(clueID, data);
    if (status == -999) {
        res.json({ status: "0", message: "Error occurred while adding" });
        logger.log({
            level: "error",
            message: `Error occurred while adding clue ${clueID}`,
        });
        return;
    }
    res.json({
        status: "1",
        message: "Added Successfully",
        clueID: data.clueID,
    });
    logger.log({ level: "info", message: `Clue ${clueID} added successfully` });
    return;
};

export const fsGetClue = async (req, res) => {
    try {
        const clueID = req.params.cid;
        const data = await fsGetClueData(clueID);
        if (data == 0) {
            res.json({ status: "0", message: "Clue not found" });
            logger.log({ level: "error", message: `Clue ${clueID} not found` });
            return;
        }
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
    } catch (err) {
        const clueID = req.params.cid;
        logger.log({
            level: "error",
            message: `Error occurred while fetching clue ${clueID}`,
        });
        res.json({ status: "0", message: "Error occurred while fetching" });
    }
};

export const rtGetUser = async (req, res) => {
    try {
        const tid = req.params.tid;
        const data = await rtGetTeamData(tid);
        if (data == 0) {
            res.json({ status: "0", message: "Team not found" });
            logger.log({ level: "error", message: `Team ${tid} not found` });
            return;
        }
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
    } catch (err) {
        const tid = req.params.tid;
        logger.log({
            level: "error",
            message: `Error occurred while fetching team ${tid}`,
        });
        res.json({ status: "0", message: "Error occurred while fetching" });
    }
};

export const rtNewUser = async (req, res) => {
    try {
        const data = req.body;
        console.log("Request Body:", data);
        if (!data) {
            res.json({ status: "0", message: "EMPTY!" });
            logger.log({ level: "error", message: "Empty request body" });
            return;
        }
        const teamID = data["teamID"];
        delete data["teamID"];
        const status = await rtAddNewTeam(teamID, data);
        if (status == 2) {
            res.json({ status: "2", message: "Team already exists" });
            logger.log({
                level: "error",
                message: `Team ${teamID} already exists`,
            });
            return;
        }
        res.json({
            status: "1",
            message: "Added Successfully",
            teamID: data.tid,
        });
        logger.log({
            level: "info",
            message: `Team ${teamID} added successfully`,
        });
        return;
    } catch (err) {
        const teamID = req.body.teamID;
        logger.log({
            level: "error",
            message: `Error occurred while adding team ${teamID}`,
        });
        res.json({ status: "-1", message: "Error occurred while adding" });
    }
};

export const rtUpdateUser = async (req, res) => {
    try {
        const data = req.body;
        console.log("Request Body:", data);
        if (!data) {
            res.json({ status: "0", message: "EMPTY!" });
            logger.log({ level: "error", message: "Empty request body" });
            return;
        }
        const teamID = data["teamID"];
        delete data["teamID"];
        const status = await rtUpdateTeamData(teamID, data);
        if (status == 0) {
            res.json({ status: "0", message: "Team doesn't exist" });
            logger.log({
                level: "error",
                message: `Team ${teamID} doesn't exist`,
            });
            return;
        }
        res.json({
            status: "1",
            message: "Added Successfully",
            teamID: data.tid,
        });
        logger.log({
            level: "info",
            message: `Team ${teamID} updated successfully`,
        });
    } catch (err) {
        const teamID = req.body.teamID;
        logger.log({
            level: "error",
            message: `Error occurred while adding team ${teamID}`,
        });
        res.json({ status: "-1", message: "Error occurred while adding" });
    }
};
