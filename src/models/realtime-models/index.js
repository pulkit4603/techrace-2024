import {
    rtGetClueData,
    rtGetRoute,
    rtGetTeamData,
    rtUpdateRoute,
    rtUpdateTeamData,
    rtAddNewTeam,
} from "./team-models";
import { rtGetStartDateTime } from "./other-models";

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
