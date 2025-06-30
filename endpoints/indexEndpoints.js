import express from 'express';

import { productEndpoint } from './productEndPoints.js';
import { saleEndpoint } from './saleEndpoints.js';

const indexEndpoints = express.Router();

indexEndpoints.use('/product', productEndpoint);
indexEndpoints.use('/sales', saleEndpoint)


//export default indexEndpoints;
export { indexEndpoints };