import { fsAddData, fsGetData } from "./common-models";
const DBName = "dev-teams";

export const fsGetTeamData = async (teamID) => {
    const result = await fsGetData(teamID, DBName);
    if (result === 0) {
        console.log("Team not found");
        return 0; //doesn't exist
    } else if (result.isLoggedIn == true) {
        console.log("Already logged in");
        return 2; //already logged in
    }
    return result;
};

export const fsAddNewTeam = async (teamID, teamdata) => {
    try {
        teamdata.isLoggedIn = false;
        await fsAddData(teamID, teamdata, DBName);
        console.log("User Added");
        return 1;
    } catch (error) {
        console.error("Error adding team: ", error);
        return -1;
    }
};

export const fsUpdateTeamData = async (teamID, teamdata) => {
    try {
        await fsAddData(teamID, teamdata, DBName);
        console.log("Data Updated");
        return 1;
    } catch (error) {
        console.error("Error adding team: ", error);
        return -1;
    }
};
