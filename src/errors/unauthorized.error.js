import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError";

/**
 * User doesn't have the authority to access this resource
 */
export class Unauthorized extends CustomAPIError {
    constructor(message, data) {
        super(message, StatusCodes.FORBIDDEN, data);
    }
}
