import { firestoreDB } from "../../database";
const validDBNames = [
    "dev-teams",
    "dev-clues",
    "dev-routes",
    "teams",
    "clues",
    "routes",
];
/**
 * Add a new document to the database or update an existing document's data
 * @param {string} docID unique ID of the document
 * @param {object} docData data of the document
 * @param {string} DBName name of the database (teamDB or clueDB?)
 * @throws {Error} if there is an error adding the doc data
 * @returns {Promise} Promise object that resolves with
 *  the result of the operation
 */
export const fsAddData = async (docID, docData, DBName) => {
    try {
        if (!validDBNames.includes(DBName)) {
            throw new Error("Invalid DB Name");
        }
        const DB = firestoreDB.collection(DBName);
        const docRef = DB.doc(docID);
        const result = await docRef.set(docData);
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error adding document data: ", error);
        throw error;
    }
};

/**
 * Get the data of a document from the database
 * @param {string} docID unique ID of the document
 * @param {string} DBName name of the database (teamDB or clueDB?)
 * @throws {Error} if there is an error fetching the doc data
 * @returns {Promise} Promise object that resolves with
 * the result of the operation
 */
export const fsGetData = async (docID, DBName) => {
    try {
        const DB = firestoreDB.collection(DBName);
        const docRef = DB.doc(docID);
        const result = await docRef.get();
        return result.data();
    } catch (error) {
        console.error("Error fetching document data: ", error);
    }
};
