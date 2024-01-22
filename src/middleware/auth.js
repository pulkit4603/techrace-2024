import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Unauthenticated } from "../errors";

dotenv.config();

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (req.body.teamID !== decoded.teamID) {
            throw new Unauthenticated("Invalid Token");
        }

        next();
    } catch (error) {
        throw new Unauthenticated("Invalid Token");
    }
};
