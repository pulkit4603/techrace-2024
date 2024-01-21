import { fsGetData, fsAddData } from "./common-models.js";
import { NotFound } from "../../errors/not-found.error.js";
const DBName = "dev-clues"; //@pulkit4603 dev-clues

export const fsGetClueData = async (clueID) => {
    try {
        const result = await fsGetData(clueID, DBName);
        return result;
    } catch (err) {
        throw new NotFound("Clue not found", { clueID: clueID });
    }
};

export const fsAddClueData = async (clueID, payload) => {
    const result = await fsAddData(clueID, payload, DBName);
    return result;
};
