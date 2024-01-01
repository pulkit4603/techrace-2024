const { min } = require('moment');
const winston = require('winston');



export const logger = winston.createLogger({
    level: 'http',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'logfile.log' }),
        new winston.transports.File({filename: 'error.log'})
    ],
    exitOnError: false
});



