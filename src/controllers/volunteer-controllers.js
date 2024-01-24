import { fsGetVolunteerData, fsUpdateVolunteerData } from "../models";
import utils from "../utils/login-utils";
// import { allTeams } from "../config"; @pulkit4603 @Jsh-Agarwal needed?
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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
