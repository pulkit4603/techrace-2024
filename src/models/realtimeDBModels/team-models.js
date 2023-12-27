import { realtimeTeamDB } from "../../database";
import { fsGetClueData } from "../firestoreDBModels";

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

export const rtUpdateRoute = async (teamID, payload) => {
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
