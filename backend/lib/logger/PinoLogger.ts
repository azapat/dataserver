import pino from 'pino';
import Logger from './Logger.ts';

// Logger implementation backed by pino.
export default class PinoLogger extends Logger {
    #pino;

    /**
     * @param {object} [options]
     * @param {string} [options.level] minimum level to output (default: info)
     * @param {boolean} [options.pretty] human-readable output via pino-pretty
     */
    constructor({ level = 'info', pretty = false } = {}) {
        super();
        this.#pino = pino({
            level,
            ...(pretty && {
                transport: {
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                        translateTime: 'SYS:HH:MM:ss.l',
                        ignore: 'pid,hostname',
                    },
                },
            }),
        });
    }

    // Converts our (message, context) signature to pino's (object, message).
    // Errors go under the `err` key, which pino serializes with message and stack.
    write(level, message, context) {
        if (context === undefined) {
            this.#pino[level](message);
        } else if (context instanceof Error) {
            this.#pino[level]({ err: context }, message);
        } else if (typeof context === 'object' && context !== null) {
            this.#pino[level](context, message);
        } else {
            this.#pino[level]({ context }, message);
        }
    }
}