import { realtimeDB } from "../../database";
const startDateTimeField = "dev-startDateTime";

export const rtGetStartDateTime = async () => {
    try {
        const snapShot = await realtimeDB
            .child(startDateTimeField)
            .once("value");
        const startDateTime = snapShot.val();
        return startDateTime;
    } catch {
        (error) => {
            console.error("Error fetching team startDateTime: ", error);
        };
    }
};
