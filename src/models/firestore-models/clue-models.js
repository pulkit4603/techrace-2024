import { fsGetData, fsAddData } from "./common-models.js";
const DBName = "dev-clues"; //@pulkit4603 dev-clues

export const fsGetClueData = async (clueID) => {
    const result = await fsGetData(clueID, DBName);
    return result;
};

export const fsAddClueData = async (clueID, payload) => {
    try {
        const result = await fsAddData(clueID, payload, DBName);
        return result;
    } catch (error) {
        console.error("Error adding clue data: ", error);
    }
};
