import { fsGetData } from "./firestore-models";
const DBName = "dev-clues";

export const fsGetClueData = async (clueID) => {
    const result = await fsGetData(clueID, DBName);
    return result;
};
