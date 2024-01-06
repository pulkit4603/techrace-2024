import {
    fsGetTeamData,
    fsUpdateTeamData,
    rtGetStartDateTime,
    rtGetTeamData,
} from "../models";
import { distanceFinder } from "../utils/distance-util";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Exhausted, Unauthenticated, Unauthorized } from "../errors";
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

    if (fsTeamData == 0) {
        throw new Unauthenticated("Team doesn't exist.", {
            teamID: payload.teamID,
        });
    }
    if (fsTeamData.isLoggedIn == true) {
        throw new Exhausted("Team is already logged in.", {
            teamID: payload.teamID,
        });
    }
    if (payload.password != fsTeamData.password) {
        throw new Unauthenticated("Incorrect password.", {
            teamID: payload.teamID,
        });
    }

    const rtTeamData = await rtGetTeamData(payload.teamID);
    //@pulkit4603 states not implemented yet
    //when implemented, check if rtTeamData.state = "banned"
    //if already registered onsite:
    const distance = distanceFinder(
        rtTeamData.logoutLocationLatitude,
        rtTeamData.logoutLocationLongitude,
        payload.currLat,
        payload.currLong,
    );
    if (distance > 250) {
        throw new Unauthorized("Cheating detected.", {
            teamID: payload.teamID,
        });
    }

    // generate access token
    const accessToken = jwt.sign(
        { teamID: payload.teamID },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "9999h" },
    );

    fsTeamData.isLoggedIn = true;
    await fsUpdateTeamData(payload.teamID, fsTeamData);

    const startDateTime = await rtGetStartDateTime();

    res.json({
        status: "1",
        message: "Login successful.",
        accessToken: accessToken, //@pulkit4603 accessToken instead of token
        player1: fsTeamData.player1, //@pulkit4603 player1 instead of p1
        player2: fsTeamData.player2, //@pulkit4603 player2 instead of p2
        startDateTime: startDateTime,
        currentClueIndex: rtTeamData.currentClueIndex, //@pulkit4603 currentClueIndex instead of currendClueNumber or ID
    });
    return;
};
