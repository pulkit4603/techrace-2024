import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../../database";

export const addData = async (dataID, data) => {
    const result = setDoc(doc(firestore, "test", dataID), data);
    console.log(result);
};

export const getData = async (ID) => {
    try {
        const result = await getDoc(doc(firestore, "test", ID));
        return result.data;
    } catch (error) {
        console.error("Error fetching id: ", error);
    }
};

export const addNewUser = async (teamID, teamdata) => {
    await addData(teamID, teamdata);
    console.log("User Added");
    return 1;
};
