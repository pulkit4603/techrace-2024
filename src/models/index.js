import {
    fsAddNewTeam,
    fsGetTeamData,
    fsAddData,
    fsGetClueData,
    fsAddClueData,
    fsUpdateTeamData,
    fsGetVolunteerData,
    fsUpdateVolunteerData,
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
    //volunteer models:
    fsGetVolunteerData,
    fsUpdateVolunteerData,
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
