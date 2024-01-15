import { rtGetTeamData } from "../models";
import { Exhausted, Unauthenticated, Unauthorized } from "../errors";
import { distanceFinder } from "../utils/distance-util";

const validateTeamNotLoggedIn = (fsTeamData, teamID) => {
    if (fsTeamData.isLoggedIn == true) {
        throw new Exhausted("Team is already logged in.", {
            teamID: teamID,
        });
    }
};

// Banned functionality yet to be implemented
const validateTeamNotBanned = (rtTeamData, teamID) => {
    if (rtTeamData.state == "banned") {
        throw new Exhausted("Team is banned.", {
            teamID: teamID,
        });
    }
};
// Banned functionality yet to be implemented

const validatePassword = (fsTeamData, password, teamID) => {
    if (password != fsTeamData.password) {
        throw new Unauthenticated("Incorrect password.", {
            teamID: teamID,
        });
    }
};

const validateDistance = async (currLat, currLong, teamID) => {
    const rtTeamData = await rtGetTeamData(teamID);
    const distance = distanceFinder(
        rtTeamData.logoutLocationLatitude,
        rtTeamData.logoutLocationLongitude,
        currLat,
        currLong,
    );
    if (distance > 250) {
        throw new Unauthorized("Cheating detected.", {
            teamID: teamID,
        });
    }
};

export default {
    validateTeamNotLoggedIn,
    validateTeamNotBanned,
    validatePassword,
    validateDistance,
};
