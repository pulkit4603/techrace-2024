import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError";

class Unauthorized extends CustomAPIError {
    constructor(message) {
        super(message, StatusCodes.UNAUTHORIZED);
    }
}

export default Unauthorized;
