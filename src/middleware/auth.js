import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.teamID = decoded ? decoded.teamID : null;

        next();
    } catch (error) {
        res.json({
            status: "4",
            message: "Unauthorized",
        });
    }
};
