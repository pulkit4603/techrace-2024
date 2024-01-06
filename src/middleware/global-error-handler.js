import { CustomError } from "../errors/custom.error";
import { logger } from "../utils/logger";
import { StatusCodes } from "http-status-codes";

export const globalErrorHandler = (err, req, res) => {
    logger.error({
        level: "error",
        message: `Error Ocurred on route ${req.path}: ${err.message}`,
    });

    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            status: "Failure",
            message: err.message,
            data: err,
        });
        return;
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "Failure",
        message: err.message ? err.message : "Something went wrong",
        data: err,
    });
};
