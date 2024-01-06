import { CustomError } from "../errors/custom.error";
import { logger } from "../services/winston.js";
import { StatusCodes } from "http-status-codes";

export const globalErrorHandler = (err, req, res, _next) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).json({
            status: "Failure",
            message: err.message,
        });

        logger.error({
            message: `Error Ocurred on route ${req.path}: ${err.message}`,
            meta: err.data,
        });
        return;
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "Failure",
        message: err.message ? err.message : "Something went wrong",
        data: err,
    });
    logger.error({
        level: "error",
        message: `Internal server error on ${req.path}: ${err.message}`,
    });
};
