import Logger from '#logger';

import { startServer, stopServer } from './server.ts';

const IP = process.env.IP || '127.0.0.1';
const PORT = Number(process.env.PORT) || 8080;
const SHUTDOWN_TIMEOUT_MS = 10_000;

// Connect to databases or other services here, before starting the server.

const server = await startServer(IP,PORT);
Logger.log(`Server listening on http://${IP}:${PORT}`);

let shuttingDown = false;

async function shutdown(signal) {
    if (shuttingDown) return;
    shuttingDown = true;
    Logger.log(`Received ${signal}, shutting down dataserver...`);

    // Force exit if open connections keep the server from closing in time.
    setTimeout(() => {
        Logger.error('Shutdown timed out, forcing exit');
        process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS).unref();

    try {
        await stopServer(server);
        // TODO: Close database connections here.
        Logger.log('Shutdown complete');
        process.exit(0);
    } catch (err) {
        Logger.error('Error during shutdown', err);
        process.exit(1);
    }
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));