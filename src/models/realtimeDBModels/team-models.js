import { realtimeDB } from "../../database";
import { fsGetClueData } from "../firestoreDBModels";
const teamDB = realtimeDB.ref("dev-teams");

export const rtGetClueID = async (clueIndex, teamID) => {
    try {
        const snapShot = await teamDB.child(teamID).once("value");
        const teamData = snapShot.val();
        const route = teamData ? teamData.route : null;
        const clueID = route ? route[clueIndex] : null;
        const clueData = fsGetClueData(clueID);
        return clueData;
    } catch (error) {
        console.error("Error fetching clueData: ", error);
    }
};

export const rtGetTeamData = async (teamID) => {
    try {
        const snapShot = await teamDB.child(teamID).once("value");
        const teamData = snapShot.val();
        return teamData;
    } catch {
        (error) => {
            console.error("Error fetching team data: ", error);
        };
    }
};

export const rtUpdateTeamData = async (teamID, payload) => {
    return new Promise((resolve, reject) => {
        teamDB.child(teamID).update(payload, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

export const rtGetRoute = async (teamID) => {
    try {
        const snapShot = await teamDB.child(teamID).once("value");
        const teamData = snapShot.val();
        return teamData ? teamData.route : null;
    } catch {
        (error) => {
            console.error("Error fetching team data: ", error);
        };
    }
};

export const rtUpdateRoute = async (teamID, payload) => {
    return new Promise((resolve, reject) => {
        teamDB.child(teamID).update(payload, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};
