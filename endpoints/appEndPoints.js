import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';

const appEndPoints = express.Router();

const __filePath = fileURLToPath(import.meta.url); // get the resolved path to the file
const __folderPath = path.dirname(__filePath); // get the name of the directory


appEndPoints.get('/index', (req, res) => {
    res.sendFile(path.join(__folderPath, '..', 'frontend', 'public', 'index.html'));
});


export { appEndPoints }