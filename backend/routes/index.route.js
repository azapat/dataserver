import express from 'express';

// import infoRouter
import infoRouter from './info.route.js';

//import infoRouter from 'info.route';
// Routes
//const models = require('../models');

//const extractionRouter = require('./Extraction.route');
//const RouteFactory = require('./Factory.route');

//const migrationRouter = require('./Migration.route');
const router = express.Router();

// const storage = require("../storage");

// function init(){
//     const routeFactory = new RouteFactory();
//     const enabledRegisters = models.getEnabledRegisters();

//     for (let i = 0; i < enabledRegisters.length; i++) {
//         const registerClass = enabledRegisters[i];
//         const registerName = registerClass.tableName;
//         const storageInstance = storage.build({register:registerClass});
//         const thisRouter = routeFactory.build({
//             register : registerClass,
//             storageInstance
//         });
//         router.use(`/${registerName}/`, thisRouter);
//     }
// }

//init();

// function initRemote(){
//     const remoteFactory = new RemoteRouteFactory();
    
//     for (const info of configuration.getDataservers()) {
//         const { host , registers } = info;
//         for (const registerName of registers) {
//             const remoteRouter = remoteFactory.build({remoteHost:host});
//             router.use(`/${registerName}/`, remoteRouter);
//         }
//     }
// }

// initRemote();

//router.use('/extraction/', extractionRouter);
//router.use('/migration/', migrationRouter);
//router.use('/admin/', adminRouter);
//router.use('/auth/', authRouter);

router.use('/info/', infoRouter);

const mainRouter = router;

export default mainRouter;