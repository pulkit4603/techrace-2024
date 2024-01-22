import { fsAddData, fsGetData } from "./common-models";
const DBName = "dev-volunteers";

export const fsGetVolunteerData = async (volunteerID) => {
    const result = await fsGetData(volunteerID, DBName);
    return result;
};

export const fsUpdateVolunteerData = async (volunteerID, volunteerdata) => {
    await fsAddData(volunteerID, volunteerdata, DBName);
    console.log("Volunteer Data Updated"); // @pulkit4603 log
    return 1;
};
