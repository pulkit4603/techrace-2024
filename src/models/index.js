import {
    fsAddNewTeam,
    fsGetTeamData,
    fsAddData,
    fsGetClueData,
    fsAddClueData,
    fsUpdateTeamData,
} from "./firestoreDBModels";
import {
    rtGetClueData,
    rtGetRoute,
    rtGetTeamData,
    rtUpdateRoute,
    rtUpdateTeamData,
    rtGetStartDateTime,
    rtAddNewTeam,
} from "./realtimeDBModels";

export {
    //team models:
    fsAddNewTeam,
    fsGetTeamData,
    fsUpdateTeamData,
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
    rtGetStartDateTime,
    rtAddNewTeam,
    //also use firestore:
    rtGetClueData,
};
