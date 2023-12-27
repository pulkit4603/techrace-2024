import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError";

class NotFound extends CustomAPIError {
    constructor(message) {
        super(message, StatusCodes.NOT_FOUND);
    }
}

export default NotFound;
