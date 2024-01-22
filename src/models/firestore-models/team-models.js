import { fsAddData, fsGetData } from "./common-models";
const DBName = "dev-teams";

export const fsGetTeamData = async (teamID) => {
    const result = await fsGetData(teamID, DBName);
    return result;
};

export const fsAddNewTeam = async (teamID, teamdata) => {
    teamdata.isLoggedIn = false;
    await fsAddData(teamID, teamdata, DBName);
    console.log("Team Added"); // @pulkit4603 log
    return 1;
};

export const fsUpdateTeamData = async (teamID, teamdata) => {
    await fsAddData(teamID, teamdata, DBName);
    console.log("Team Data Updated"); //@pulkit4603 log
    return 1;
};
