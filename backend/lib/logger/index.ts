import PinoLogger from './PinoLogger.ts';

// Active logger implementation
const activeLogger = new PinoLogger({
  level: process.env.LOG_LEVEL || 'info',
  pretty: process.env.NODE_ENV !== 'production',
});

const Logger = Object.freeze(activeLogger);

export default Logger;