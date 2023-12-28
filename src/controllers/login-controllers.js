import {
    fsGetTeamData,
    fsUpdateTeamData,
    rtGetStartDateTime,
    rtGetTeamData,
} from "../models";
import { distanceFinder } from "../util";

/* PSEUDOCODE
if:     teamID is not in teamDB: not found error.
elseif: team is already logged in: already exists error.
elseif: password is incorrect: incorrect credentials error.
elseif: team is banned: unauthorized error.
elseif: |askLocn-lastlogoutLocn|>legal hvrsn distance: cheating detected error.
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
            const updationResult = await fsUpdateTeamData(teamID, {
                isLoggedin: true,
            });
            console.log(updationResult); //@pulkit4603 log updationResult for debugging

            //@pulkit4603 token setup:
            //   const token2 = jwt.sign({ tid: tid }, process.env.password, {
            //       expiresIn: "1111h",
            //   });

            const startDateTime = await rtGetStartDateTime();

            res.json({
                status: "1",
                message: "Login successful.",
                //token: token, //@pulkit4603 token functionality not implemented yet
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
