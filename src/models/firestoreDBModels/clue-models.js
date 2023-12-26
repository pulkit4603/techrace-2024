import { fsGetData } from "./common-models.js";
const DBName = "dev-clues";

export const fsGetClueData = async (clueID) => {
    const result = await fsGetData(clueID, DBName);
    return result;
};
