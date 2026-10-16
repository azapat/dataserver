// Base class that defines the logging interface for the whole app.
// Every logger implementation extends this class and implements write().
// Calling code only uses the public methods below, so implementations
// are interchangeable.
class Logger {
    constructor() {
        if (new.target === Logger) {
            throw new TypeError('Logger is abstract: extend it and implement write()');
        }
    }

    // Arrow functions keep `this` bound, so methods can be passed around
    // as callbacks, e.g. promise.catch(Logger.error).
    debug = (message, context) => this.write('debug', message, context);
    log = (message, context) => this.write('info', message, context); // log is an alias for info
    info = (message, context) => this.write('info', message, context);
    warn = (message, context) => this.write('warn', message, context);
    error = (message, context) => this.write('error', message, context);

    /**
     * Writes one log entry. Every implementation must override this.
     * @param {'debug' | 'info' | 'warn' | 'error'} level
     * @param {string} message
     * @param {object | Error} [context] extra data, or an Error
     */
     
    write(_level, _message, _context) {
        throw new Error(`${this.constructor.name} must implement write()`);
    }
}

export default Logger;