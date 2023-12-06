import { doc, setDoc } from "firebase/firestore";
import { firestore_db } from "../database/firestore.js";

export const create_this = async (id, data) => {
    const result = setDoc(doc(firestore_db, "test", id), data);
    console.log(result);
};

export const addUser = async (tid, tdata) => {
    await create_this(tid, tdata);
    console.log("User Added");
    return 1;
};
