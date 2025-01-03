import { createRoutes } from 'axiosflow-api';
import { registerUserRoutes, controllerInstances } from '../routes/userRoutes';

import { Router } from 'express';

const router   = Router();

// Register user routes
registerUserRoutes();

// Dynamically create routes based on registered metadata
createRoutes(router, controllerInstances);


export default router;
