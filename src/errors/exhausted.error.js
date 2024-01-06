import { CustomError } from "./custom.error";
import { StatusCodes } from "http-status-codes";

/**
 * Resource already exhausted
 */
export class Exhausted extends CustomError {
    constructor(message, data) {
        super(message, StatusCodes.CONFLICT, data);
    }
}
