import { fsAddData, fsGetData } from "./common-models";
const DBName = "dev-teams";

export const fsGetTeamData = async (teamID) => {
    const result = await fsGetData(teamID, DBName);
    return result;
};

export const fsAddNewTeam = async (teamID, teamdata) => {
    try {
        await fsAddData(teamID, teamdata, DBName);
        console.log("User Added");
        return 1;
    } catch (error) {
        console.error("Error adding team: ", error);
        return 0;
    }
};
