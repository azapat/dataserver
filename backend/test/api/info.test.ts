import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startTestServer } from '../helpers/server.ts';

describe('GET /info/health', () => {
    let ctx: Awaited<ReturnType<typeof startTestServer>>;

    before(async () => { ctx = await startTestServer(); });
    after(() => ctx.stop());

    it('returns ok', async () => {
        const res = await fetch(`${ctx.baseUrl}/info/health`);
        assert.equal(res.status, 200);
        assert.deepEqual(await res.json(), { status: 'ok' });
    });
});