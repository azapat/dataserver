# Notes for Developers

## Logger

Console prints are not allowed. Standard way to log messages:

    import Logger from '#logger';

    Logger.info('This is an info message');
    Logger.warn('This is a warning message');
    Logger.error('This is an error message');
    Logger.debug('This is a debug message');

