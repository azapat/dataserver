import express from 'express';

const router = express.Router();

// Sys routes
router.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

export default router;