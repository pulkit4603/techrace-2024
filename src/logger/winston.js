const winston = require('winston');

export const logger = winston.createLogger({
    level: 'http',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => `{TIME:${info.timestamp} -- ${JSON.stringify(info.message)}}`)
    ),
    transports: [
        new winston.transports.File({ filename: './src/logger/logfile.log' }),
        new winston.transports.File({filename: './src/logger/error.log' , level: 'error'})
    ],
    exitOnError: false
});



