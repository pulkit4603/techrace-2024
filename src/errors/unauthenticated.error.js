import { CustomError } from "./custom.error.js";
import { StatusCodes } from "http-status-codes";

/**
 * User is not authenticated (or his session has expired)
 */
export class Unauthenticated extends CustomError {
    constructor(message, data) {
        super(message, StatusCodes.UNAUTHORIZED, data);
    }
}
