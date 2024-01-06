import {
    fsAddNewTeam,
    fsGetTeamData,
    fsAddData,
    fsGetClueData,
    fsAddClueData,
    fsUpdateTeamData,
} from "./firestore-models";
import {
    rtGetClueData,
    rtGetRoute,
    rtGetTeamData,
    rtUpdateRoute,
    rtUpdateTeamData,
    rtGetStartDateTime,
    rtAddNewTeam,
} from "./realtime-models";

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
