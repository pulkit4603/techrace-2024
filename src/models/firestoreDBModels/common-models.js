import { firestoreDB } from "../../database";
const teamDB = firestoreDB.collection("dev-teams");

/**
 * Add a new document to the database or update an existing document's data
 * @param {string} docID unique ID of the document
 * @param {object} docData data of the document
 * @throws {Error} if there is an error adding the doc data
 * @returns {Promise} Promise object that resolves with
 *  the result of the operation
 */
export const fsAddData = async (docID, docData) => {
    try {
        const docRef = teamDB.doc(docID);
        const result = await docRef.set(docData);
        console.log(result);
    } catch (error) {
        console.error("Error adding team data: ", error);
    }
};
