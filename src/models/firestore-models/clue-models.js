import { fsGetData, fsAddData } from "./common-models.js";
import { NotFound } from "../../errors/not-found.error.js";
const DBName = "dev-clues"; //@pulkit4603 dev-clues

export const fsGetClueData = async (clueID) => {
    const result = await fsGetData(clueID, DBName);
    if (result === undefined) {
        throw new NotFound("Clue not found.", { clueID: clueID });
    }
    return result;
};

export const fsAddClueData = async (clueID, payload) => {
    const result = await fsAddData(clueID, payload, DBName);
    return result;
};
