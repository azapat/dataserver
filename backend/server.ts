import http from 'node:http';
import app from './app.ts';

// Starts the HTTP server and resolves once it is listening.
// Rejects if the port is unavailable (e.g. EADDRINUSE).
export function startServer(ip: string | undefined, port: number | undefined) {
    const server = http.createServer(app);

    return new Promise((resolve, reject) => {
        server.once('error', reject);
        server.listen(port, ip, () => {
            server.off('error', reject);
            resolve(server);
        });
    });
}

// Stops accepting new connections and resolves once
// in-flight requests have finished.
export function stopServer(server) {
    return new Promise((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
    });
}