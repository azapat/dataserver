import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import Logger from '#logger';

const app = express();

///////////////////////
// Global middlewares
///////////////////////
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Initializes the Storage Engine (Mongo / MySQL)
//await storage.init();

///////////////////////
// Mount routers
///////////////////////
import mainRouter from './routes/index.route.js'; // This must occur after storage.init()
app.use('/api/v1/', mainRouter);

// import usersRouter from './routes/users.routes.js';
// app.use('/api/v1/users', usersRouter);


// 404 handler: runs when no route matched
app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// Error handler (errors thrown in async handlers end up here automatically)
app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;

    if (status >= 500) {
        Logger.error(err);
    }

    // Don't leak internal error details to clients.
    res.status(status).json({
        error: status < 500 ? err.message : 'Internal server error',
    });
});

export default app;