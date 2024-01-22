// Pseudo Code:
// Take in volunteerID, password, currLat, currLong
// validate not logged in
// validate password
// validate distance from site
// returns accessToken, list of teamIDs

// Data flow:
// 1. fetch volunteer data from firestore
// 2. once done logging in, update isLoggedIn to true in firestore
// 3. give accessToken to client
import { fsGetVolunteerData, fsUpdateVolunteerData } from "../models";
import utils from "../utils/login-utils";
import { allTeams } from "../config";
// import jwt from "jsonwebtoken"; @pulkit4603 accessToken needed?
// import dotenv from "dotenv";
// dotenv.config();

export const volnteerLogin = async (req, res) => {
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

    // validate distance from site
    // await utils.volunteerValidateDistance(
    //     payload.currLat,
    //     payload.currLong,
    //     payload.volunteerID,
    // );

    // generate access token @pulkit4603 accessToken needed?
    // const accessToken = jwt.sign(
    //     { volunteerID: payload.volunteerID },
    //     process.env.ACCESS_TOKEN_SECRET,
    //     { expiresIn: "9999h" },
    // );

    // update isLoggedIn to true in firestore
    fsVolunteerData.isLoggedIn = true;
    // fsVolunteerData.accessToken = accessToken; //@pulkit4603 part of accessToken functionality
    await fsUpdateVolunteerData(payload.volunteerID, fsVolunteerData);

    res.status(200).json({
        status: "1",
        message: "Login successful.",
        // accessToken: accessToken, //@pulkit4603 part of accessToken functionality
        teamIDs: allTeams,
    });
};
