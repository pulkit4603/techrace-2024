import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom.error.js";

/**
 * Resource not found
 */
export class NotFound extends CustomError {
    constructor(message, data) {
        super(message, StatusCodes.NOT_FOUND, data);
    }
}
