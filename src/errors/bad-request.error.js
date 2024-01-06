import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom.error.js";

/**
 * Bad or invalid request
 */
export class BadRequest extends CustomError {
    constructor(message, data) {
        super(message, StatusCodes.BAD_REQUEST, data);
    }
}
