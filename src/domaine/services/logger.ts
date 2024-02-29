import log4js, { Log4js } from 'log4js';

export const configureLog4js = (log4js: Log4js): Log4js => {

    log4js.addLayout('json', (config) => (logEvent) => {
        const context = logEvent.context || {}; // Ensure context is available
        const {level, who, id, status, method, url } = context;

        const displayTime = (date: Date) => {
            const year = date.getUTCFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, '0');
            const day = String(date.getUTCDate()).padStart(2, '0');
            const hours = String(date.getUTCHours()).padStart(2, '0');
            const minutes = String(date.getUTCMinutes()).padStart(2, '0');
            const seconds = String(date.getUTCSeconds()).padStart(2, '0');
            const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
            const offsetHours = String(Math.floor(date.getTimezoneOffset() / 60)).padStart(2, '0');
            const offsetMinutes = String(Math.abs(date.getTimezoneOffset() % 60)).padStart(2, '0');
            const offsetSign = date.getTimezoneOffset() < 0 ? '+' : '-';

            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
        };

        const logData = {
            timestamp: displayTime(logEvent.startTime),
            level,
            who: who || 'system',
            id,
            status,
            method,
            url,
            msg: logEvent.data[0]
        };

        return JSON.stringify(logData);
    });

    log4js.configure({
        appenders: {
            out: { type: 'stdout', layout: { type: 'json' } },
            outFile: { type: 'dateFile', filename: 'log/events.json', layout: { type: 'json' } },
        },
        categories: {
            default: { appenders: ['out', 'outFile'], level: 'debug' },
        },
    });

    return log4js;
};

// Create a logger instance
export const logger = configureLog4js(log4js).getLogger()
