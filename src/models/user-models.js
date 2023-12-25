import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../database/firestore.js";

export const create_this = async (id, data) => {
    const result = setDoc(doc(firestore, "test", id), data);
    console.log(result);
};

export const get_this = async (id) => {
    try {
        const result = await getDoc(doc(firestore, "test", id));
        return result.data;
    } catch (error) {
        console.error("Error fetching id: ", error);
    }
};

export const addUser = async (tid, tdata) => {
    await create_this(tid, tdata);
    console.log("User Added");
    return 1;
};
