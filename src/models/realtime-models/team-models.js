import { realtimeTeamDB } from "../../services/firebase.js";
import { fsGetClueData } from "../firestore-models";
import { Exhausted, NotFound } from "../../errors";

/**
 * Takes in a clueIndex (like c1)
 * and a teamID (like 001)
 * and returns the clue data for that index
 * @returns {Promise} promise that resolves with the clue data
 */
export const rtGetClueData = async (clueIndex, teamID) => {
    try {
        const snapShot = await realtimeTeamDB.child(teamID).once("value");
        const teamData = snapShot.val();
        if (!teamData) {
            throw new NotFound("Team does not exist.", { teamID: teamID });
        }
        // console.log("teamData: ", teamData); @pulkit4603 dumb debug log
        const route = teamData.route;
        const clueID = route[clueIndex];
        const clueData = fsGetClueData(clueID);
        if (clueData == 0) {
            throw new NotFound("Clue not found.", { clueID: clueID });
        }
        return clueData;
    } catch (err) {
        throw new NotFound("Clue not found.", {
            teamID: teamID,
            clueIndex: clueIndex,
        });
    }
};

/**
 * Takes in a teamID (like 001) and returns the team data {object}
 * @returns {Promise} promise that resolves with the team data {object}
 */
export const rtGetTeamData = async (teamID) => {
    const snapShot = await realtimeTeamDB.child(teamID).once("value");
    if (!snapShot.exists()) {
        throw new NotFound("Team does not exist.", { teamID: teamID });
    }
    const teamData = snapShot.val();
    return teamData;
};

/**
 * Takes in a teamID (like 001) and a payload
 * and adds the team (with the payload) to the rtdb
 * (Only Creates. Cannot Update Existing)
 * @returns {Promise} promise that resolves when adding is complete
 */
export const rtAddNewTeam = async (teamID, payload) => {
    const snapShot = await realtimeTeamDB.child(teamID).once("value");
    if (snapShot.exists()) {
        throw new Exhausted("Team already exists.", { teamID: teamID });
    }
    await realtimeTeamDB.child(teamID).update(payload);
};

/**
 * Takes in a teamID (like 001) and a payload
 * and updates the team data with the payload
 * (Only updates existing. Cannot Create)
 * @returns {Promise} promise that resolves when the update is complete
 */
export const rtUpdateTeamData = async (teamID, payload) => {
    const snapShot = await realtimeTeamDB.child(teamID).once("value");
    if (!snapShot.exists()) {
        throw new NotFound("Team does not exist.", { teamID: teamID });
    }
    await realtimeTeamDB.child(teamID).update(payload);
};

/**
 * Takes in a teamID (like 001) and returns the route {object}
 * @returns {Promise} promise that resolves with the route {object}
 */
export const rtGetRoute = async (teamID) => {
    const snapShot = await realtimeTeamDB.child(teamID).once("value");
    if (!snapShot.exists()) {
        throw new NotFound("Team does not exist.", { teamID: teamID });
    }
    const teamData = snapShot.val();
    return teamData ? teamData.route : null;
};

/**
 * Takes in a teamID (like 001) and a route payload (like {route: ["c1", "c2", "c3"]})
 * and updates the team data with the route payload
 * @returns {Promise} promise that resolves when the update is complete
 */
export const rtUpdateRoute = async (teamID, routePayload) => {
    return new Promise((resolve, reject) => {
        realtimeTeamDB
            .child(teamID)
            .child("route")
            .update(routePayload, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
    });
};
