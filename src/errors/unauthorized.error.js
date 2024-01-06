import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom.error.js";

/**
 * User doesn't have the authority to access this resource
 */
export class Unauthorized extends CustomError {
    constructor(message, data) {
        super(message, StatusCodes.FORBIDDEN, data);
    }
}
