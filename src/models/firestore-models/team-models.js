import { fsAddData, fsGetData } from "./common-models";
import { NotFound } from "../../errors";
const DBName = "dev-teams";

export const fsGetTeamData = async (teamID) => {
    const result = await fsGetData(teamID, DBName);
    if (result === undefined) {
        throw new NotFound("Team not found.", { teamID: teamID });
    }
    return result;
};

export const fsAddNewTeam = async (teamID, teamdata) => {
    teamdata.isLoggedIn = false;
    await fsAddData(teamID, teamdata, DBName);
    console.log("User Added");
    return 1;
};

export const fsUpdateTeamData = async (teamID, teamdata) => {
    await fsAddData(teamID, teamdata, DBName);
    console.log("Data Updated");
    return 1;
};
