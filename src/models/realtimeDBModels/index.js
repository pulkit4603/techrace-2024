import {
    rtGetClueData,
    rtGetRoute,
    rtGetTeamData,
    rtUpdateRoute,
    rtUpdateTeamData,
} from "./team-models";
import { rtGetStartDateTime } from "./other-models";

export {
    //only use RTDB:
    rtGetRoute,
    rtGetTeamData,
    rtUpdateRoute,
    rtUpdateTeamData,
    rtGetStartDateTime,
    //also use firestore:
    rtGetClueData,
};
