import {
    fsAddNewTeam,
    fsGetTeamData,
    fsAddData,
    fsGetClueData,
    fsAddClueData,
} from "./firestoreDBModels";
import {
    rtGetClueData,
    rtGetRoute,
    rtGetTeamData,
    rtUpdateRoute,
    rtUpdateTeamData,
} from "./realtimeDBModels";

export {
    //team models:
    fsAddNewTeam,
    fsGetTeamData,
    //common models:
    fsAddData,
    //clue models:
    fsGetClueData,
    fsAddClueData,
};
export {
    //only use RTDB:
    rtGetRoute,
    rtGetTeamData,
    rtUpdateRoute,
    rtUpdateTeamData,
    //also use firestore:
    rtGetClueData,
};
