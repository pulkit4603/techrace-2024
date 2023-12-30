import {
    fsGetTeamData,
    fsUpdateTeamData,
    rtGetStartDateTime,
    rtGetTeamData,
} from "../models";
import { distanceFinder } from "../utils/distance-util";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/* PSEUDOCODE
if:     teamID is not in teamDB: Not Found error.
elseif: team is already logged in: already exists error.
elseif: password is incorrect: incorrect credentials error.
elseif: team is banned: unauthorized error.
elseif: [(|askLocn-lastlogoutLocn|) > (legal hvrsn distance)]: cheating detected error.
else:   login successful. */

export const login = async (req, res) => {
    try {
        const data = req.body;
        const teamID = data.teamID;
        const fsTeamData = await fsGetTeamData(teamID);
        if (fsTeamData == 0) {
            res.json({
                status: "0",
                message: "Team not found.",
            });
            return;
        } else if (fsTeamData == 2) {
            res.json({
                status: "2",
                message: "Already logged in.",
            });
            return;
        } else if (data.password != fsTeamData.password) {
            res.json({
                status: "-1",
                message: "Incorrect credentials.",
            });
            return;
        } else {
            const currentLocationLatitude = data.currLat;
            const currentLocationLongitude = data.currLong;
            const rtTeamData = await rtGetTeamData(teamID);
            const logoutLocationLatitude = rtTeamData.logoutLocationLatitude;
            const logoutLocationLongitude = rtTeamData.logoutLocationLongitude;
            //@pulkit4603 states not implemented yet
            //when implemented, check if rtTeamData.state = "banned"
            //if already registered onsite:
            const distance = distanceFinder(
                logoutLocationLatitude,
                logoutLocationLongitude,
                currentLocationLatitude,
                currentLocationLongitude,
            );
            console.log(distance); //@pulkit4603 log distance for debugging
            if (distance > 250) {
                res.json({
                    status: "5",
                    message: "Cheating detected.",
                });
                return;
            }
            fsTeamData.isLoggedIn = true;
            const updationResult = await fsUpdateTeamData(teamID, fsTeamData);
            console.log(updationResult); //@pulkit4603 log updationResult for debugging

            const accessToken = jwt.sign(
                { teamID: teamID },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" },
            );
            const refreshToken = jwt.sign(
                { teamID: teamID },
                process.env.REFRESH_TOKEN_SECRET,
            );
            // await fsUpdateTeamData(teamID, { refreshToken: refreshToken }); //@pulkit4603 pending

            const startDateTime = await rtGetStartDateTime();

            res.json({
                status: "1",
                message: "Login successful.",
                accessToken: accessToken, //@pulkit4603 accessToken instead of token
                refreshToken: refreshToken, //@pulkit4603 EXTRA FIELD: refreshToken
                player1: fsTeamData.player1, //@pulkit4603 player1 instead of p1
                player2: fsTeamData.player2, //@pulkit4603 player2 instead of p2
                startDateTime: startDateTime,
                currentClueIndex: rtTeamData.currentClueIndex, //@pulkit4603 currentClueIndex instead of currendClueNumber or ID
            });
            return;
        }
    } catch (error) {
        res.json({
            status: "0",
            message: "Error occurred.",
            error: `${error}`,
        });
    }
};

export const refresh = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken)
        return res.json({ status: "4", message: "Unauthorized" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.json({ status: "4", message: "Forbidden" });

        // Check if the refresh token is in the database // @pulkit4603 pending

        const newAccessToken = jwt.sign(
            { userId: user.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" },
        );
        res.json({ status: "1", accessToken: newAccessToken });
    });
};
