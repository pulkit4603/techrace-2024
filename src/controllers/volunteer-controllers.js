import { fsGetVolunteerData, fsUpdateVolunteerData } from "../models";
import utils from "../utils/login-utils";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import config from "../config.js";
dotenv.config();
import { Unauthorized } from "../errors/unauthorized.error.js";
import { rtGetTeamData, rtUpdateTeamData } from "../models";

import { logger } from "../services/winston.js";
import moment from "moment";

export const volunteerLogin = async (req, res) => {
    const payload = req.body;
    const fsVolunteerData = await fsGetVolunteerData(payload.volunteerID);

    // validate not logged in
    utils.validateTeamNotLoggedIn(fsVolunteerData, payload.volunteerID);

    // validate password
    utils.validatePassword(
        fsVolunteerData,
        payload.password,
        payload.volunteerID,
    );

    const accessToken = jwt.sign(
        { volunteerID: payload.volunteerID },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "9999h" },
    );

    // update isLoggedIn to true in firestore
    fsVolunteerData.isLoggedIn = true;
    fsVolunteerData.accessToken = accessToken;
    await fsUpdateVolunteerData(payload.volunteerID, fsVolunteerData);

    res.status(200).json({
        status: "Success",
        message: "Login successful.",
        accessToken: accessToken,
        // teamIDs: allTeams, // @pulkit4603 @Jsh-Agarwal needed?
    });
};

const isDM = true;

export const volunteerValidateRequest = async (req, res) => {
    let teamID = req.body.teamID;
    let teamData = await rtGetTeamData(teamID);
    const cond =
        req.body.validatorClueID !=
        teamData.route[`c${teamData.currentClueIndex}`];
    if (isDM) {
        console.log("cond", cond);
        console.log("req.body.validatorClueID", req.body.validatorClueID);
        console.log(
            "teamData.route[`c${teamData.currentClueIndex}`]",
            teamData.route[`c${teamData.currentClueIndex}`],
        );
    }
    if (cond) {
        throw new Unauthorized("You are not the correct location.");
    } else {
        if (teamData.isFrozen) {
            logger.log({
                level: "info",
                message: `Team ${teamID} is frozen timeout is set`,
            });

            let validateTime =
                config.freezeTime * 1000 -
                moment(req.body.askTimestamp).diff(
                    moment(teamData.madeFrozenAtTime),
                );
            console.log(validateTime);

            setTimeout(() => {
                rtUpdateTeamData(teamID, {
                    validatorClueID: req.body.validatorClueID,
                });
            }, validateTime);
            if (isDM) {
                console.log(
                    "req.body.validatorClueID tring to validate after timeout",
                    req.body.validatorClueID,
                );
            }
            res.json({
                status: 1,
                message: "Correct location after timeout",
                mm: "F",
            });
            logger.log({
                level: "info",
                message: `Team ${teamID} validatorclueIndex updated after timeout`,
            });
        } else {
            rtUpdateTeamData(teamID, {
                validatorClueID:
                    // req.body.validatorClueID + new Date().toISOString(),
                    req.body.validatorClueID,
            });
            if (isDM) {
                console.log(
                    "req.body.validatorClueID tring to validate",
                    req.body.validatorClueID,
                );
            }
            res.json({
                status: 1,
                message: "Correct location",
                mm: "U",
            });
            logger.log({
                level: "info",
                message: `Team ${teamID} validatorclueIndex updated`,
            });
        }
    }
};
