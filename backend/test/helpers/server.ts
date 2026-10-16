import type http from 'node:http';
import type { AddressInfo } from 'node:net';
import { startServer, stopServer } from '../../server.ts';

export async function startTestServer() {
    const server: http.Server = await startServer('127.0.0.1', 0);
    const { port } = server.address() as AddressInfo;
    return {
        baseUrl: `http://127.0.0.1:${port}/api/v1`,
        stop: () => stopServer(server),
    };
}