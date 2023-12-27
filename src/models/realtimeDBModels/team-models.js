import { realtimeTeamDB } from "../../database";
import { fsGetClueData } from "../firestoreDBModels";

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
        const route = teamData ? teamData.route : null;
        const clueID = route ? route[clueIndex] : null;
        const clueData = fsGetClueData(clueID);
        return clueData;
    } catch (error) {
        console.error("Error fetching clueData: ", error);
    }
};

/**
 * Takes in a teamID (like 001) and returns the team data {object}
 * @returns {Promise} promise that resolves with the team data {object}
 */
export const rtGetTeamData = async (teamID) => {
    try {
        const snapShot = await realtimeTeamDB.child(teamID).once("value");
        const teamData = snapShot.val();
        return teamData;
    } catch {
        (error) => {
            console.error("Error fetching team data: ", error);
        };
    }
};

/**
 * Takes in a teamID (like 001) and a payload
 * and updates the team data with the payload
 * @returns {Promise} promise that resolves when the update is complete
 */
export const rtUpdateTeamData = async (teamID, payload) => {
    return new Promise((resolve, reject) => {
        realtimeTeamDB.child(teamID).update(payload, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

/**
 * Takes in a teamID (like 001) and returns the route {object}
 * @returns {Promise} promise that resolves with the route {object}
 */
export const rtGetRoute = async (teamID) => {
    try {
        const snapShot = await realtimeTeamDB.child(teamID).once("value");
        const teamData = snapShot.val();
        return teamData ? teamData.route : null;
    } catch {
        (error) => {
            console.error("Error fetching team data: ", error);
        };
    }
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
