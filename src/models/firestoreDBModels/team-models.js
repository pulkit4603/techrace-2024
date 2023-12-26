import { firestoreDB } from "../../database";
import { fsAddData } from "./common-models";
const teamDB = firestoreDB.collection("dev-teams");

export const fsGetTeamData = async (teamID) => {
    try {
        const docRef = teamDB.doc(teamID);
        const result = await docRef.get();
        return result.data;
    } catch (error) {
        console.error("Error fetching team: ", error);
    }
};

export const fsAddNewTeam = async (teamID, teamdata) => {
    try {
        await fsAddData(teamID, teamdata);
        console.log("User Added");
        return 1;
    } catch (error) {
        console.error("Error adding team: ", error);
        return 0;
    }
};
