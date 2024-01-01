const winston = require('winston');

export const logger = winston.createLogger({
    level: 'http',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${JSON.stringify(info.message)}`)
    ),
    transports: [
        new winston.transports.File({ filename: 'logfile.log' }),
        new winston.transports.File({filename: 'error.log' , level: 'error'})
    ],
    exitOnError: false
});



