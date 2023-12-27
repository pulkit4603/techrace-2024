import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError";

class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message, StatusCodes.BAD_REQUEST);
    }
}

export default BadRequest;
