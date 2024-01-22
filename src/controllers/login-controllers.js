import {
    fsGetTeamData,
    fsUpdateTeamData,
    rtGetStartDateTime,
    rtGetTeamData,
} from "../models";
import { StatusCodes } from "http-status-codes";
import utils from "../utils/login-utils";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * Logs a team in.
 * @param {Object} req.body - {teamID, password, currLat, currLong}
 * @param {Object} res - {status, message, accessToken, player1, player2, startDateTime, currentClueIndex}
 * @returns {Object}
 * @returns {Promise<Object>} - A promise that resolves when the response is sent.
 * @throws {Error} - If an error occurs while logging in.
 */
export const login = async (req, res) => {
    const payload = req.body;
    const fsTeamData = await fsGetTeamData(payload.teamID);

    utils.validateTeamNotLoggedIn(fsTeamData, payload.teamID);
    utils.validatePassword(fsTeamData, payload.password, payload.teamID);

    const rtTeamData = await rtGetTeamData(payload.teamID);
    //@pulkit4603 states not implemented yet
    //when implemented, utils.validateTeamNotBanned(rtTeamData, payload.teamID);
    //if already registered onsite:
    // await utils.validateDistance(
    //     payload.currLat,
    //     payload.currLong,
    //     payload.teamID,
    // );

    // generate access token
    const accessToken = jwt.sign(
        { teamID: payload.teamID },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "9999h" },
    );

    fsTeamData.isLoggedIn = true;
    fsTeamData.accessToken = accessToken; //@pulkit4603 accessToken in firestore for debugging (dumb i know)
    await fsUpdateTeamData(payload.teamID, fsTeamData);

    const startDateTime = await rtGetStartDateTime();

    res.status(StatusCodes.OK).json({
        status: "1",
        message: "Login successful.",
        accessToken: accessToken, //@pulkit4603 accessToken instead of token
        player1: fsTeamData.player1, //@pulkit4603 player1 instead of p1
        player2: fsTeamData.player2, //@pulkit4603 player2 instead of p2
        startDateTime: startDateTime,
        currentClueIndex: rtTeamData.currentClueIndex, //@pulkit4603 currentClueIndex instead of currendClueNumber or ID
    });
};
